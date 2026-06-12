import { render, screen } from '@testing-library/react';
import PostList from './post-list';

test('postlist will display post title, author, and number of comments', async () => {
    // Provide controlled data:
    const mockPosts = [
        {
            id: '1',
            title: 'First Test Post',
            content: 'Testing, testing, 1, 2, 3',
            topic: { slug: 'rehearsal' },
            user: { name: 'Pluto' },
            _count: { comments: 10 },
        },
        {
            id: '2',
            title: 'Second Test Post',
            content: 'Is this thing even on?',
            topic: { slug: 'rehearsal' },
            user: { name: 'Fern' },
            _count: { comments: 6 },
        },
    ];

    // Isolate PostList's awaited output and render directly since PostList is an async Server Component.
    const Component = await PostList({ fetchData: async () => mockPosts as any});

    render(Component);

    expect(screen.getByText('First Test Post')).toBeInTheDocument();
    expect(screen.getByText('Second Test Post')).toBeInTheDocument();
    expect(screen.getByText(/by pluto/i)).toBeInTheDocument();
    expect(screen.getByText(/by fern/i)).toBeInTheDocument();
    expect(screen.getByText(/10 comments/i)).toBeInTheDocument();


});