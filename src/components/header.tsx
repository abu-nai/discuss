import Link from 'next/link';
import { Suspense } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from '@nextui-org/react';
import HeaderAuth from '@/components/header-auth';
import SearchInput from './search-input';

export default function Header() {

    return (
        <Navbar className="shadow mb-6 py-6">
            <NavbarBrand>
                <div>
                    <Link href="/" className="font-bold">From Me, To You <span className="text-pink-300/70">જ⁀➴</span></Link>
                    <p className="text-sm">a place to foster community and conversation</p>
                </div>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Suspense>
                        <SearchInput />
                    </Suspense>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                    <span className="text-gray-800">⤷ ˗ˏˋ</span><HeaderAuth /><span className="text-gray-800">ˎˊ˗</span>
            </NavbarContent>
        </Navbar>
    )
}