import React, { ChangeEvent, KeyboardEvent } from 'react';

export interface IProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    ariaLabel?: string;
    onEnterPress?: () => void;
}

export const Input = ({
    value,
    onChange,
    placeholder = '',
    className = '',
    ariaLabel = 'Input field',
    onEnterPress,
}: IProps) => {
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onEnterPress) {
            onEnterPress();
        }
    };

    const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleOnchange}
            placeholder={placeholder}
            className={className}
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}
        />
    );
};