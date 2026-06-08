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

jest.mock('@nextui-org/react', () => ({
    ...jest.requireActual('@nextui-org/react'),
    Popover: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    PopoverTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    PopoverContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Navbar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    NavbarItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

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

describe('when session status is loading', () => {
    test('nothing should be displayed', () => {
        (useSession as jest.Mock).mockReturnValue(
            { 
                status: 'loading',
                data: null 
            });

        const { container } = render(<HeaderAuth />);

        expect(container).toBeEmptyDOMElement();
    });
});

describe('when session is not authenticated', () => {

    test('sign in and sign up buttons are visible', () => {
        (useSession as jest.Mock).mockReturnValue(
            { 
                status: 'unauthenticated',
                data: null 
            });

        render(<HeaderAuth />);

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
        render(<HeaderAuth />);

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
        authenticatedData();
        render(<HeaderAuth />);

        const avatar = screen.getByRole('img', { name: /avatar/i });
        
        expect(avatar).toBeInTheDocument();
    });

    test('sign out button is rendered', async () => {
        authenticatedData();
        render(<HeaderAuth />);

        const signOutButton = screen.getByRole('button', {
            name: /sign out/i
        });

        expect(signOutButton).toBeInTheDocument();
    });
});