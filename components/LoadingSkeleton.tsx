import React from 'react';
import SkeletonCard from './SkeletonCard';

interface LoadingSkeletonProps {
    postCount: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ postCount }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="container px-4 max-w-6xl flex flex-col w-full py-16 md:py-24">
                {/* Header Spacer to prevent layout shift */}
                <div className="h-[104px] mb-8"></div>

                {/* Search/Filter Skeleton */}
                <div className="mb-12 flex flex-col items-center gap-6">
                    <div className="h-14 bg-[#403768] rounded-lg w-full max-w-xl animate-pulse"></div>
                    <div className="flex flex-wrap justify-center gap-3">
                        <div className="h-9 bg-[#403768] rounded-full w-20 animate-pulse"></div>
                        <div className="h-9 bg-[#403768] rounded-full w-24 animate-pulse"></div>
                        <div className="h-9 bg-[#403768] rounded-full w-24 animate-pulse"></div>
                    </div>
                </div>

                {/* Blog Sections Skeleton */}
                <main>
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {[...Array(postCount)].map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    </section>
                </main>
                
                {/* Footer Spacer to prevent layout shift */}
                <div className="h-[92px] mt-24"></div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;