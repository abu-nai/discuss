import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentCreateForm from './comment-create-form';

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

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(() => [{ errors: {} }, jest.fn(), false]),
}));

test('clicking reply button will toggle comment form open and closed', async () => {
    const user = userEvent.setup();
    render(<CommentCreateForm postId="post-1" />);

    // assertion that the form starts closed 
    expect(screen.queryByPlaceholderText(/enter your comment/i))
        .not
        .toBeInTheDocument();

    // simulate user clicking the reply button
    const replyButton = screen.getByRole('button', {
        name: /reply/i
    });

    await user.click(replyButton);

    // assertion that form opens once user has clicked on the button
    expect(screen.queryByPlaceholderText(/enter your comment/i))
        .toBeInTheDocument();

    await user.click(replyButton);

    // assertion that form closes once user clicks on button again
    expect(screen.queryByPlaceholderText(/enter your comment/i))
        .not
        .toBeInTheDocument();

});