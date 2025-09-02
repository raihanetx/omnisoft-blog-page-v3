
export interface BlogPost {
    id: number;
    category: 'frontend' | 'backend';
    title: string;
    subtitle: string;
    author: string;
    date: string;
    avatar: string;
    imageUrl: string;
    tags: string[];
    content: string;
}
