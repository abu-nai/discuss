'use client'

import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

export default function SearchInput() {
    const searchParams = useSearchParams();

    // defaultValue expects to receive either a string or UNDEFINED. searchParams.get('term') will return either a string or NULL. we add || '' to our defaultValue to satisfy its expected values.
    return (
        <form action={actions.search}>
            <Input placeholder="Looking for something?" defaultValue={searchParams.get('term') || '' } name="term" />
        </form>
        )
}