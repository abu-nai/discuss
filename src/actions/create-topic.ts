'use server';

import { z } from 'zod';

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, { message: "Must be lowercase letters or dashes without spaces"}),
    description: z.string().min(10),
});

interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
    }
}

// the type of the formState argument must match the type that we set in useActionState (in TopicCreateForm) and the return value of the component function
// in order to returns a value that satisfies the CreateTopicFormState interface, we can set a declared type return annotation.
// we wrap that return annotation in a Promise because this is an async function.
export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
    ): Promise<CreateTopicFormState> {
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    });

    if (!result.success) {
        return {
            errors: result.error?.flatten().fieldErrors,
        };
    }

    return {
        errors: {}
    };
}