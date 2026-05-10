'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

// when we call useFormStatus, it will look at the closest parent element and determine form status, which includes form method, whether the form is pending or not, and data inside of form. it will return a formStatus object to the child component that we call useFormStatus in.

interface DeleteButtonProps {
    children: React.ReactNode;
}

export default function DeleteButton({children}: DeleteButtonProps) {
    // call useFormStatus and pull off "pending" prop. "pending" is false by default. When it becomes true, we want to display our loading spinner.

    const { pending } = useFormStatus();

    return (
        <Button className="bg-indigo-200/30 outline-dashed outline-indigo-300/70" type="submit" isLoading={pending}>
            {children}
        </Button>
    );
}

