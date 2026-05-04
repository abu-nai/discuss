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
        <Button className="bg-indigo-200/30 outline-dashed outline-indigo-300/70" type="submit" isLoading={isLoading}>
            {children}
        </Button>
    )
}

