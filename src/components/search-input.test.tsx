import { render, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import SearchInput from './search-input';

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}));

jest.mock('@/actions', () => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
    createComment: jest.fn(),
    deleteComment: jest.fn(),
    createTopic: jest.fn(),
    deleteTopic: jest.fn(),
    createPost: jest.fn(),
    deletePost: jest.fn(),
    search: jest.fn(),
}));

test('when present, "term" query param is pre-populated within input', () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: (key: string) => key === 'term' ? 'hearts' : null });

    render(<SearchInput />);

    const input = screen.getByPlaceholderText(/looking for something/i);
    expect(input).toHaveValue('hearts');

});

test('nothing should be rendered within input when there is no term being searched', () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => null });

    render(<SearchInput />);

    const input = screen.getByPlaceholderText(/looking for something/i);
    expect(input).toHaveValue('');
});