import Link from "next/link";
import { BlogPost } from "../../lib/types";

interface PostCardProps {
    post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <article className="group mb-8">
            <Link href={`/${post.slug}`} className="block">
                <div className="flex items-baseline justify-between mb-2">
                    <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                        {post.title}
                    </h2>
                    <time className="text-gray-400 text-sm whitespace-nowrap ml-4">
                        {post.date}
                    </time>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    {post.summary}
                </p>
                <div className="mt-3 flex gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                            #{tag}
                        </span>
                    ))}
                </div>
            </Link>
        </article>
    );
}
