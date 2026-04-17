'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import type { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';


const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, { message: "Must be lowercase letters or dashes without spaces"}),
    description: z.string().min(10),
});

interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    }
}

// the type of the formState argument must match the type that we set in useActionState (in TopicCreateForm) and the return value of the component function
// in order to returns a value that satisfies the CreateTopicFormState interface, we can set a declared type return annotation.
// we wrap that return annotation in a Promise because this is an async function.
export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
    ): Promise<CreateTopicFormState> {
        await new Promise(resolve => setTimeout(resolve, 2500));

        const result = createTopicSchema.safeParse({
            name: formData.get('name'),
            description: formData.get('description')
        });

        if (!result.success) {
            return {
                errors: result.error?.flatten().fieldErrors,
            };
        }

        const session = await auth();
        if (!session || !session.user) {
            return {
                errors: {
                    _form: ['You must be signed in to do this.']
                }
            };
        }

        let topic: Topic;
        try {
            topic = await db.topic.create({
                data: {
                    slug: result.data.name,
                    description: result.data.description
                }
            })
        } catch (err:unknown) {
            if (err instanceof Error) {
                return {
                    errors: {
                        _form: [err.message]
                    }
                }
            } else {
                return {
                    errors: {
                        _form: ['Something went wrong']
                    }
                }
            }
        }

        // revalidatePath must be placed before redirect because redirect will throw an error by default and if revalidatePath were placed afterward, the error would prevent revalidation
        revalidatePath('/')
        redirect(paths.topicShow(topic.slug));
}