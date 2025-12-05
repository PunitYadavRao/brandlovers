import React from 'react';
import { cn } from '@/utils/utils';

/**
 * ViewToggle component for switching between grid and list views
 */
const ViewToggle = ({ view, onViewChange, className = '' }) => {
    return (
        <div className={cn('flex items-center gap-2 bg-gray-100 rounded-lg p-1', className)}>
            <button
                onClick={() => onViewChange('grid')}
                className={cn(
                    'px-3 py-2 rounded-md transition-all duration-200',
                    view === 'grid'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                )}
                aria-label="Grid view"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            </button>
            <button
                onClick={() => onViewChange('list')}
                className={cn(
                    'px-3 py-2 rounded-md transition-all duration-200',
                    view === 'list'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                )}
                aria-label="List view"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    );
};

export default ViewToggle;
