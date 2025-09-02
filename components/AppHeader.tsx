
import React from 'react';

interface AppHeaderProps {
    onGoHome: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onGoHome }) => {
    return (
        <header className="text-center mb-8">
            <h1 onClick={onGoHome} className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-500 cursor-pointer">
                Omnisoft Blogs
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">insights, updates, and stories from the world of software & tech.</p>
        </header>
    );
};

export default AppHeader;