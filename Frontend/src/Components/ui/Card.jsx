import React from 'react';
import { cn } from '@/utils/utils';

/**
 * Card component with variants
 */
const Card = ({
    children,
    className = '',
    variant = 'default',
    padding = true,
    hover = false,
    ...props
}) => {
    const variants = {
        default: 'bg-white border border-gray-200',
        elevated: 'bg-white shadow-md',
        outlined: 'bg-white border-2 border-gray-900',
    };

    const hoverStyles = hover ? 'transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer' : '';

    return (
        <div
            className={cn(
                'rounded-lg',
                variants[variant],
                padding && 'p-4',
                hoverStyles,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Card Header
 */
Card.Header = ({ children, className = '' }) => {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    );
};

/**
 * Card Body
 */
Card.Body = ({ children, className = '' }) => {
    return (
        <div className={cn('', className)}>
            {children}
        </div>
    );
};

/**
 * Card Footer
 */
Card.Footer = ({ children, className = '' }) => {
    return (
        <div className={cn('mt-4 pt-4 border-t border-gray-200', className)}>
            {children}
        </div>
    );
};

export default Card;
