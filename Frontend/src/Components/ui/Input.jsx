import React, { forwardRef } from 'react';
import { cn } from '@/utils/utils';

/**
 * Input component with error states and icon support
 */
const Input = forwardRef(({
    type = 'text',
    label,
    error,
    className = '',
    containerClassName = '',
    prefix,
    suffix,
    ...props
}, ref) => {
    const baseStyles = 'w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed';

    const errorStyles = error
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300';

    return (
        <div className={cn('w-full', containerClassName)}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <div className="relative">
                {prefix && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {prefix}
                    </div>
                )}

                <input
                    ref={ref}
                    type={type}
                    className={cn(
                        baseStyles,
                        errorStyles,
                        prefix && 'pl-10',
                        suffix && 'pr-10',
                        className
                    )}
                    {...props}
                />

                {suffix && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {suffix}
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
