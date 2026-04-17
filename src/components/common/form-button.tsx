'use client';

import { Button } from '@nextui-org/react';

interface FormButtonProps {
    children: React.ReactNode;
    isLoading: boolean;
}

export default function FormButton({children, isLoading}: FormButtonProps) {
    // call useFormStatus and pull off "pending" prop. "pending" is false by default. When it becomes true, we want to display our loading spinner.
    // const { pending } = useFormStatus();

    return (
        <Button type="submit" isLoading={isLoading}>
            {children}
        </Button>
    )
}

