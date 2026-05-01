'use server';

import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import paths from '@/paths';
import { auth } from '@/auth';

interface DeleteCommentProps {
    commentId: string,
    postId: string,
    slug: string
}

export async function deleteComment({ commentId, postId, slug }: DeleteCommentProps) {

// Validate that user is signed in before allowing deletion of comment
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error('You must be signed in to delete a comment')
    };

// Validate that user is the one that created the comment before allowing deletion of comment
    const comment = await db.comment.findFirst({
        where: {
            id: commentId,
            userId: session.user.id
        }
    });

    if (!comment) {
        notFound();
    }

// Try to delete or catch/throw error
    try {
        await db.comment.delete({
            where: {
                id: commentId
            }
        });
    } catch {
        throw new Error('Something went wrong!')
    }

// Retrieve topic.slug for revalidation and redirection
    const topic = await db.topic.findFirst({
        where: { slug }
    })

    if (!topic) {
        notFound();
    }

// Revalidate path
    revalidatePath(paths.postShow(topic.slug, postId));

// Redirect to updated page
    redirect(paths.postShow(topic.slug, postId));
}