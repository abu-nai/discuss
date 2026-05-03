import { db } from '@/db';
import { notFound } from 'next/navigation';
import DeletePostForm from '@/components/posts/post-delete-form';

interface PostShowProps {
  postId: string;
  slug: string
}

export default async function PostShow({ postId, slug }: PostShowProps) {
  // manually implement loading pause for testing
  await new Promise(resolve => setTimeout(resolve, 1500));

  const post = await db.post.findFirst({
    where: { id: postId }
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title} ⋆˚✿˖°</h1>
      <p className="p-4 border rounded flex justify-between">{post.content} <DeletePostForm postId={postId} slug={slug} /></p>
    </div>
  );
}