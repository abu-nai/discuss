import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('Missing github OAuth credentials...!');
}

// big set-up call to NextAuth object

// when we call next auth, we put in a configuration object
// NextAuth returns an object from which we can destructure properties to export and use across our entire application

export const { handlers: { GET, POST }, auth, signOut, signIn } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        // session function is called whenever we are verifying a user in an application
        // in a normal NextAuth project, this is not needed. this version had a bug we needed to address!
        async session({ session, user }: any) {
            if (session && user) {
                session.user.id = user.id;
            }

            return session;
        }
    }
})