'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        document.body.style.cursor = 'none';

        function handleMouseMove(e: MouseEvent) {
            setPosition({ x: e.clientX, y: e.clientY });
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <Image
            src="/cursor.gif"
            alt="cursor"
            width={50}
            height={50}
            style={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
}