import Link from "next/link";
import { getPosts } from "@/lib/mock-service";

export async function Sidebar() {
    const posts = await getPosts();

    // 1. Popular Posts (For now, just pick the first 3)
    const popularPosts = posts.slice(0, 3);

    // 2. Categories (Aggregation)
    const categories = Array.from(new Set(posts.map(p => p.category)));

    return (
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            {/* Search Widget */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Search</h3>
                <form action="/search" method="GET">
                    <div className="relative">
                        <input
                            type="text"
                            name="q"
                            placeholder="Search..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <button type="submit" className="absolute right-2 top-2.5 text-gray-400 hover:text-blue-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </div>
                </form>
            </div>

            {/* Popular Posts Widget */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Popular Posts</h3>
                <ul className="space-y-4">
                    {popularPosts.map(post => (
                        <li key={post.id}>
                            <Link href={`/${post.slug}`} className="group block">
                                <h4 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h4>
                                <span className="text-xs text-gray-400 mt-1 block">{post.date}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Categories Widget */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Categories</h3>
                <ul className="space-y-2">
                    {categories.map(category => (
                        <li key={category}>
                            <Link href={`/category/${category}`} className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                <span>{category}</span>
                                <span className="bg-white px-2 py-0.5 rounded-full text-xs text-gray-400 border border-gray-200">
                                    {posts.filter(p => p.category === category).length}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
