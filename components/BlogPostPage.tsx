import React, { useEffect, useMemo } from 'react';
import { BlogPost } from '../types';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import BlogCard from './BlogCard';

// This is required to make Prism available globally in the window object
declare const Prism: any;

interface BlogPostPageProps {
    post: BlogPost;
    allPosts: BlogPost[];
    onSelectPost: (id: number) => void;
    onGoHome: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, allPosts, onSelectPost, onGoHome }) => {
    useEffect(() => {
        // Run Prism syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }

        const articleElement = document.getElementById('article-content');
        const controllers: AbortController[] = [];

        if (articleElement) {
            // Select the div containers that have a button and a pre element
            const codeContainers = articleElement.querySelectorAll('div.relative');

            codeContainers.forEach(container => {
                const button = container.querySelector('button');
                const code = container.querySelector('code');

                if (button && code) {
                    const controller = new AbortController();
                    controllers.push(controller);
                    
                    const clickHandler = () => {
                        navigator.clipboard.writeText(code.innerText).then(() => {
                            button.textContent = 'Copied!';
                            setTimeout(() => {
                                button.textContent = 'Copy';
                            }, 2000);
                        }).catch(err => {
                            console.error('Failed to copy text: ', err);
                            button.textContent = 'Error';
                        });
                    };

                    button.addEventListener('click', clickHandler, { signal: controller.signal });
                }
            });
        }
        
        // Cleanup function to remove event listeners
        return () => {
            controllers.forEach(c => c.abort());
        };

    }, [post]); // Rerun this effect when the post changes

    const moreFromAuthor = useMemo(() => {
        return allPosts.filter(p => p.author === post.author && p.id !== post.id).slice(0, 3);
    }, [allPosts, post]);
    
    const suggestedPosts = useMemo(() => {
        return allPosts.filter(p => p.id !== post.id && p.author !== post.author)
                       .sort(() => 0.5 - Math.random()) // shuffle
                       .slice(0, 3);
    }, [allPosts, post]);

    return (
        <div id="blog-post-page">
            <img src={post.imageUrl} alt="Hero Image" className="w-full h-80 object-cover" />
            
            <div className="flex items-center -mt-12 w-full">
                <div className="flex-grow h-1 bg-violet-600"></div>
                <img src={post.avatar} alt="Author" className="w-24 h-24 rounded-full border-4 border-violet-500 flex-shrink-0" />
                <div className="flex-grow h-1 bg-violet-600"></div>
            </div>
            
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="px-12 md:px-4 lg:px-0">
                    <header className="text-center my-8">
                        <h1 className="text-5xl font-extrabold tracking-tight">{post.title}</h1>
                        <p className="mt-4 text-lg text-gray-400">{post.subtitle}</p>
                        <p className="mt-4 text-sm text-gray-500"><span className="font-semibold text-violet-400">By {post.author}</span> on <span>{post.date}</span></p>
                        <div className="mt-4 flex justify-center gap-3">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-[#312952] border border-[#403768] text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </header>

                    <article 
                        id="article-content"
                        className="article-content text-lg max-w-none text-gray-300"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></article>
                </div>


                <div className="my-24">
                    {moreFromAuthor.length > 0 && (
                        <section className="px-12 md:px-4 lg:px-0">
                            <h2 className="text-3xl font-bold mb-8 pb-4">{`More from ${post.author}`}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
                                {moreFromAuthor.map(p => <BlogCard key={p.id} post={p} onSelect={onSelectPost} />)}
                            </div>
                        </section>
                    )}
                    {suggestedPosts.length > 0 && (
                        <section className="mt-16 px-12 md:px-4 lg:px-0">
                            <h2 className="text-3xl font-bold mb-8 pb-4">Suggested for you</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
                                {suggestedPosts.map(p => <BlogCard key={p.id} post={p} onSelect={onSelectPost} />)}
                            </div>
                        </section>
                    )}
                </div>
                
                <AppFooter />
            </div>
        </div>
    );
};

export default BlogPostPage;