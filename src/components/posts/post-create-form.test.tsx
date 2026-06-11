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

test('clicking on "create post" button toggles creation form open and closed', () => {
    const user = userEvent.setup();
    render(<PostCreateForm slug={} />);

    // assertion that the form is NOT present at the start

    // user click

    // assertion that the form IS present

    // user click 

    // assertion that the form is NOT present

});