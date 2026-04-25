import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = (
    Post & {
        topic: { slug: string };
        user: { name: string | null };
        _count: { comments: number }
    }
)

// Automating the generation of our type: This type looks at what gets returned by the type of fetchPostsByTopicSlug. It then unwraps that (what the promise gets resolved with). Because our promise is resolved with an array of post objects, [number] means "take the type of a single element in that array."
// This approach does not scale well if we begin to add additional queries to the function.
// export type PostWithData = Awaited<
//     ReturnType<typeof fetchPostsByTopicSlug>
// >[number];

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
    return db.post.findMany({
        where: {topic: { slug }},
        include: {
            topic: { select: { slug: true }},
            user: { select: { name: true }},
            _count: { select: { comments: true}}
        }
    })
}