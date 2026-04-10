'use server';

import * as auth from '@/auth';

export async function signIn() {
    // whenever we call, we pass in a string indicating what provider we want to sign in with
    return auth.signIn('github');
}

export async function signOut() {
    return auth.signOut();
}