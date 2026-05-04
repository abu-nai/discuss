'use client';

import {
    NavbarItem,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import PersonalButton from '@/components/common/button';
import { useSession } from 'next-auth/react';
import * as actions from '@/actions';

export default function HeaderAuth() {
    const session = useSession();

    let authContent: React.ReactNode;
    if (session.status === "loading") {
        // while we are loading up content, do not display anything
        authContent = null;
    } else if (session.data?.user) {
        authContent = 
        <Popover placement="left">
            <PopoverTrigger>
                <Avatar src={session.data.user.image || ''} />
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-4">
                    <form action={actions.signOut}>
                        <PersonalButton className="bg-slate-500/60">Sign Out</PersonalButton>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    } else {
        authContent = ( 
            <>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <PersonalButton>Sign In</PersonalButton>   
                    </form>
                </NavbarItem>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <PersonalButton className="bg-white text-rose-500/60 outline-dotted">Sign Up</PersonalButton>
                    </form>
                </NavbarItem>
            </>
        )
    }

    return authContent;
}