import { render, screen } from '@testing-library/react';
import PostList from './post-list';

test('postlist will display post title, author, and number of comments', () => {
    render(<PostList fetchData={() => {
        return (Promise<[
            {
                topic: { slug: "test-slug" },
                user: { name: "pluto" },
                _count: { comments: 4 }
            }]
        >)
    }
    }/>);

    


});