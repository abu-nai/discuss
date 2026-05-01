'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface DeleteTopicProps {
    slug: string
}

export async function deleteTopic({ slug }: DeleteTopicProps) {
    // Validate that a user is signed in
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error('You must be signed in to delete a topic')
    };

    const topic = await db.topic.findFirst({
        where: { slug }
    })

    if (!topic) {
        notFound();
    }

    // Try to delete or throw error
    try {
        await db.topic.delete({
            where: { slug }
        })
    } catch {
        notFound();
    }

    // Revalidate topicShow path
    revalidatePath(paths.topicShow(topic.slug));

    // Redirect to homepage
    redirect('/');

}

