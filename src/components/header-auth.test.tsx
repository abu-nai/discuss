import { render, screen } from '@testing-library/react';
import HeaderAuth from './header-auth';
import { useSession } from 'next-auth/react';
import { Navbar } from '@nextui-org/react';

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

function renderComponent() {
    render(
    <Navbar>
        <HeaderAuth />
    </Navbar>
    );
}

function authenticatedData() {
    return (
        (useSession as jest.Mock).mockReturnValue(
            {
                status: 'authenticated',
                data: {
                    user: 
                        {
                            name: 'Fern', 
                            image: 'https://imgexample.com/avatar.png'
                        }
                },
            }
        )
    )
}

describe('when session is not authenticated', () => {

    test('sign in and sign up buttons are visible', () => {
        (useSession as jest.Mock).mockReturnValue(
            { 
                status: 'unauthenticated',
                data: null 
            });

        renderComponent();

        const signInButton = screen.getByRole('button', {
            name: /sign in/i
        });
        const signUpButton = screen.getByRole('button', {
            name: /sign up/i
        });

        expect(signInButton).toBeInTheDocument();
        expect(signUpButton).toBeInTheDocument();
    });
});

describe('when session is authenticated', () => {
    test('sign in and sign up buttons are not visible', () => {
        authenticatedData();
        renderComponent();

        const signInButton = screen.queryByRole('button', {
            name: /sign in/i
        });
        const signUpButton = screen.queryByRole('button', {
            name: /sign up/i
        });

        expect(signInButton).not.toBeInTheDocument();
        expect(signUpButton).not.toBeInTheDocument();
    });

    test('user avatar is rendered', () => {

    });

    test('sign out button is rendered', () => {
        authenticatedData();

        const signOutButton = screen.getByRole('button', {
            name: /sign out/i
        });

        expect(signOutButton).toBeInTheDocument();
    });
});