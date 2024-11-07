import React, { MouseEvent, KeyboardEvent } from 'react';

export interface IProps {
    href?: string;
    onClick?: (href: string) => void;
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
    hrefPrefix?: string;
}

export const Link = ({
    href = '#',
    onClick,
    children,
    className = '',
    ariaLabel = 'Link',
    hrefPrefix
}: IProps) => {
    const handleClick = (event: MouseEvent | KeyboardEvent) => {
        event.preventDefault();
        if (onClick) {
            onClick(hrefPrefix ? `${hrefPrefix}${href}` : href);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleClick(event);
        }
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className={className}
            tabIndex={0}
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}
            rel='noopener noreferrer'
        >
            {children}
        </a>
    );
};