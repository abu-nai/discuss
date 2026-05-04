'use client';

import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function PersonalButton({ children, className }: ButtonProps) {
    const classes = twMerge(
        'bg-indigo-300/60 rounded-full px-3 py-2 text-white text-sm',
        className
    )

    return (
        <button className={classes} type="submit">{children}</button>
    )
}

