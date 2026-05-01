'use server';

// Imports
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface DeletePostProps {
    postId: string,
    slug: string
}

export async function deletePost({ postId, slug }: DeletePostProps) {
    // Validate if user is signed in
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error('You must be signed in to delete a post')
    };

    // Validate that user is one that created post
    const post = await db.post.findFirst({
        where: {
            id: postId,
            userId: session.user.id
        }
    })

    if (!post) {
        notFound();
    }

    // Try to delete or throw error
    try {
        await db.post.delete({
            where: {
                id: postId
            }
        });
    } catch {
        throw new Error('Something went wrong!');
    }

    // Retrieve topic.slug for revalidation and redirection
    const topic = await db.topic.findFirst({
        where: { slug }
    })

    if (!topic) {
        notFound();
    }

    // Revalidate topicShow path (need slug)
    revalidatePath(paths.topicShow(topic.slug));

    // Redirect to topicShow path
    redirect(paths.topicShow(topic.slug));
}