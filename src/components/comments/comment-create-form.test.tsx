import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentCreateForm from './comment-create-form';

test('clicking reply button will toggle comment form open and closed', async () => {
    const user = userEvent.setup();
    render(<CommentCreateForm postId="post-1" />);

    const commentForm = screen.queryByPlaceholderText(/enter your comment/i);

    // assertion that the form starts closed 
    expect(commentForm).not.toBeInTheDocument();

    // simulate user clicking the reply button
    const replyButton = screen.getByRole('button', {
        name: /reply/i
    });

    await user.click(replyButton);

    // assertion that form opens once user has clicked on the button
    expect(commentForm).toBeInTheDocument();

    await user.click(replyButton);

    // assertion that form closes once user clicks on button again
    expect(commentForm).not.toBeInTheDocument();

});