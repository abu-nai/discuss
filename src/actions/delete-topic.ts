// ERROR: schema.prisma has Post relation set to RESTRICT so if there are posts under the topic, the topic can not be deleted...

'use server';

import { auth } from '@/auth';
import { db } from '@/db';
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

    // Try to delete or throw error
    await db.topic.delete({
        where: { slug }
    });

    // Revalidate topicShow path
    revalidatePath('/');

    // Redirect to homepage
    redirect('/');
}

