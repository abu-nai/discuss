import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopicCreateForm from './topic-create-form';

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

describe('when the form is closed', () => {
    test('form error banner is not present upon initial rendering', () => {

    });

    test('the form is initially not being rendered', async () => {
        render(<TopicCreateForm />);

        expect(screen.queryByPlaceholderText(/describe your topic/i))
            .not
            .toBeInTheDocument();
    });

    test('clicking "create post" button toggles form open', async () => {
        const user = userEvent.setup();
        render(<TopicCreateForm />);

        const newTopicButton = screen.getByRole('button', {
            name: /create a topic/i
        });

        await user.click(newTopicButton);

        expect(screen.queryByPlaceholderText(/describe your topic/i))
            .toBeInTheDocument()
    });
});

