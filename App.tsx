
import React, { useState, useMemo, useEffect } from 'react';
import BlogListing from './components/BlogListing';
import BlogPostPage from './components/BlogPostPage';
import { BLOG_POSTS } from './constants';
import { BlogPost } from './types';
import LoadingSkeleton from './components/LoadingSkeleton';

const App: React.FC = () => {
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate content loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleSelectPost = (id: number) => {
        setSelectedPostId(id);
        window.scrollTo(0, 0);
    };

    const handleGoHome = () => {
        setSelectedPostId(null);
        window.scrollTo(0, 0);
    };
    
    const selectedPost = useMemo(() => {
        return BLOG_POSTS.find(p => p.id === selectedPostId) || null;
    }, [selectedPostId]);

    if (loading) {
        return <LoadingSkeleton postCount={BLOG_POSTS.length} />;
    }

    return (
        <div className="fade-in">
            {selectedPost ? (
                <BlogPostPage 
                    post={selectedPost} 
                    allPosts={BLOG_POSTS}
                    onSelectPost={handleSelectPost}
                    onGoHome={handleGoHome}
                />
            ) : (
                <BlogListing 
                    posts={BLOG_POSTS} 
                    onSelectPost={handleSelectPost} 
                    onGoHome={handleGoHome}
                />
            )}
        </div>
    );
};

export default App;