'use client'

import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

export default function SearchInput() {
    const searchParams = useSearchParams();

    // defaultValue expects to receive either a string or UNDEFINED. searchParams.get('term') will return either a string or NULL. we add || '' to our defaultValue to satisfy its expected values.
    return <Input defaultValue={searchParams.get('term') || '' } />;
}