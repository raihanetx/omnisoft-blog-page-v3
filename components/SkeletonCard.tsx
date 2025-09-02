
import React from 'react';

const SkeletonCard: React.FC = () => {
    return (
        <div className="bg-[#312952] rounded-3xl border border-[#403768] p-5 flex flex-col h-full animate-pulse">
            <div className="bg-[#403768] rounded-2xl mb-4 aspect-[16/9]"></div>
            <div className="h-6 bg-[#403768] rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-[#403768] rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-[#403768] rounded w-1/2 mb-4"></div>
            <div className="flex items-center gap-x-2 flex-wrap">
                <div className="h-5 bg-[#403768] rounded w-16"></div>
                <div className="h-5 bg-[#403768] rounded w-20"></div>
            </div>
            <div className="flex-grow"></div>
            <div className="h-10 bg-[#403768] rounded-md w-32 self-center mt-6"></div>
        </div>
    );
};

export default SkeletonCard;