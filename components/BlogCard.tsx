
import React from 'react';
import { BlogPost } from '../types';
import UserIcon from './icons/UserIcon';
import ClockIcon from './icons/ClockIcon';

interface BlogCardProps {
    post: BlogPost;
    onSelect: (id: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onSelect }) => {
    return (
        <div 
            onClick={() => onSelect(post.id)}
            className="bg-[#312952] rounded-3xl border border-[#403768] p-5 flex flex-col h-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03]"
        >
           <img src={post.imageUrl} alt={post.title} className="rounded-2xl mb-4 aspect-[16/9] object-cover" loading="lazy" />
           <h3 className="text-xl font-bold text-white break-words">{post.title}</h3>
           <div className="mt-3 text-xs text-gray-400 flex flex-col items-start gap-y-1.5">
               <span className="flex items-center gap-1.5"><UserIcon />Published by: {post.author}</span>
               <span className="flex items-center gap-1.5"><ClockIcon />Date: {post.date}</span>
           </div>
           <div className="mt-4 text-xs font-medium flex items-center gap-x-2 flex-wrap">
               {post.tags.map(tag => <span key={tag} className="bg-[#403768] text-gray-300 py-1 px-2.5 rounded-md">{tag}</span>)}
           </div>
           <div className="flex-grow"></div>
           <button 
                onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling to the parent div
                    onSelect(post.id);
                }}
                className="read-more-btn mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-900 bg-white hover:bg-gray-200 px-5 py-2.5 rounded-md self-center transition-colors"
            >
                Read More &raquo;
            </button>
        </div>
    );
};

export default BlogCard;