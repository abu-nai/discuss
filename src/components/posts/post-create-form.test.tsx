import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostCreateForm from './post-create-form';

// Textarea is mocked in jest.setup.ts. should I mock Input, Popover, PopoverTrigger, or PopoverContent? unsure if they rely on animations like Button does.

// mock all actions since PostCreateForm imports actions
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

// mock useActionState
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(() => [{ errors: {} }, jest.fn(), false]),
}));

test('clicking on "create post" button toggles creation form open and closed', async () => {
    const user = userEvent.setup();
    render(<PostCreateForm slug="test-topic" />);

    // assertion that the form is NOT present at the start
    // because PostCreateForm uses a Popover, we check for a field INSIDE the form, not the form itself
    expect(screen.queryByPlaceholderText(/title/i))
        .not
        .toBeInTheDocument();

    // user click
    const formButton = screen.getByRole('button', {
        name: /create post/i
    });
    await user.click(formButton);

    // assertion that the form IS present
    expect(screen.queryByPlaceholderText(/title/i)).toBeInTheDocument();

    // user click 
    await user.click(formButton);

    // assertion that the form is NOT present
    expect(screen.queryByPlaceholderText(/title/i))
        .not
        .toBeInTheDocument();

});