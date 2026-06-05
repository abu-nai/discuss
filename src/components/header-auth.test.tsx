// jest.mock('@/actions', () => ({}));

// test('placeholder', () => {
//   expect(true).toBe(true);
// });

import { render, screen } from '@testing-library/react';
import HeaderAuth from './header-auth';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
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

describe('when session is not authenticated', () => {

    test('sign in and sign up buttons are visible', async () => {
        (useSession as jest.Mock).mockReturnValue(
            { 
                status: 'unauthenticated',
                data: null 
            });

        await render(<HeaderAuth />);

        const signInButton = screen.getByRole('button', {
            name: /sign in/i
        });

        expect(signInButton).toBeInTheDocument();
    });
});