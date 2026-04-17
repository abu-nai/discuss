import Link from 'next/link';
// Chip is styled liked a button
import { Chip } from '@nextui-org/react';
import { db } from '@/db';
import paths from '@/paths';

// We know this will be asynchronous because we are making requests to our database
export default async function TopicList() {
    const topics = await db.topic.findMany();

    const renderedTopics = topics.map((topic) => {
        return (
            <div key={topic.id}>
                <Link href={paths.topicShow(topic.slug)}>
                    <Chip color="warning" variant="shadow">
                        {topic.slug}
                    </Chip>
                </Link>
            </div>
        )
    });
    
    return (
        <div className="flex flex-row gap-2">
            {renderedTopics}
        </div>
    )
}