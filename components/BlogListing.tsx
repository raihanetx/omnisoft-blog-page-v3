import React, { useState, useMemo } from 'react';
import { BlogPost } from '../types';
import BlogCard from './BlogCard';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

interface BlogListingProps {
    posts: BlogPost[];
    onSelectPost: (id: number) => void;
    onGoHome: () => void;
}

type FilterType = 'all' | 'frontend' | 'backend';

const BlogListing: React.FC<BlogListingProps> = ({ posts, onSelectPost, onGoHome }) => {
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesFilter = filter === 'all' || post.category === filter;
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  post.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesFilter && matchesSearch;
        });
    }, [posts, filter, searchTerm]);

    const frontendPosts = filteredPosts.filter(p => p.category === 'frontend');
    const backendPosts = filteredPosts.filter(p => p.category === 'backend');

    return (
        <div id="blog-listing-page" className="min-h-screen flex flex-col justify-center items-center">
            <div className="container mx-auto px-4 max-w-6xl flex flex-col w-full py-16 md:py-24">
                <AppHeader onGoHome={onGoHome} />

                {/* Search and Filter Section */}
                <div className="mb-12 flex flex-col items-center gap-6">
                    <div className="relative w-full max-w-xl">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" /></svg></div>
                        <input 
                            type="text" 
                            placeholder="Search blogs...." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#312952] text-white placeholder-gray-400 rounded-lg py-4 pr-12 pl-5 text-base border-2 border-[#403768] focus:outline-none focus:border-violet-500 focus:ring-0"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        <button onClick={() => setFilter('all')} className={`filter-button text-sm font-semibold py-2 px-5 rounded-full border transition-colors ${filter === 'all' ? 'bg-violet-500 text-white border-violet-500 hover:bg-violet-600' : 'bg-[#312952] border-[#403768] hover:bg-[#403768] hover:border-violet-500'}`}>All</button>
                        <button onClick={() => setFilter('frontend')} className={`filter-button text-sm font-semibold py-2 px-5 rounded-full border transition-colors ${filter === 'frontend' ? 'bg-violet-500 text-white border-violet-500 hover:bg-violet-600' : 'bg-[#312952] border-[#403768] hover:bg-[#403768] hover:border-violet-500'}`}>Frontend</button>
                        <button onClick={() => setFilter('backend')} className={`filter-button text-sm font-semibold py-2 px-5 rounded-full border transition-colors ${filter === 'backend' ? 'bg-violet-500 text-white border-violet-500 hover:bg-violet-600' : 'bg-[#312952] border-[#403768] hover:bg-[#403768] hover:border-violet-500'}`}>Backend</button>
                    </div>
                </div>

                {/* Blog Sections */}
                <main>
                    {frontendPosts.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold mb-8 pb-4">Frontend</h2>
                            <div className="px-12 md:px-4 lg:px-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
                                    {frontendPosts.map(post => <BlogCard key={post.id} post={post} onSelect={onSelectPost} />)}
                                </div>
                            </div>
                        </section>
                    )}
                    {backendPosts.length > 0 && (
                        <section className="mt-16">
                            <h2 className="text-3xl font-bold mb-8 pb-4">Backend</h2>
                             <div className="px-12 md:px-4 lg:px-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
                                    {backendPosts.map(post => <BlogCard key={post.id} post={post} onSelect={onSelectPost} />)}
                                </div>
                            </div>
                        </section>
                    )}
                     {filteredPosts.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-semibold text-gray-400">No posts found.</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your search or filter.</p>
                        </div>
                    )}
                </main>
                <AppFooter />
            </div>
        </div>
    );
};

export default BlogListing;