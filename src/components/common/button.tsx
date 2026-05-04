'use client';

import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const PersonalButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, ...props }, ref) => {
        const classes = twMerge(
            'bg-indigo-300/60 rounded-full px-3 py-2 text-white text-sm',
            className
        );

        return (
            <button ref={ref} className={classes} {...props}>
                {children}
            </button>
        );
    }
);

PersonalButton.displayName = 'PersonalButton';
export default PersonalButton;
