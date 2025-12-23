import { getPosts } from "@/lib/notion-service";
import { PostCard } from "@/components/blog/PostCard";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    const posts = await getPosts();
    const categories = Array.from(new Set(posts.map((p) => p.category)));
    console.log(`📝 Generating static params for ${categories.length} categories:`, categories);
    return categories.map((category) => ({
        category: encodeURIComponent(category),
    }));
}

export default async function CategoryPage({ params }: PageProps) {
    // Decode category from URL (e.g. "Tech" or "Investment")
    const { category: rawCategory } = await params;
    const category = decodeURIComponent(rawCategory);

    const allPosts = await getPosts();
    const posts = allPosts.filter(p => p.category.toLowerCase() === category.toLowerCase());

    if (posts.length === 0) {
        return (
            <div className="py-10 text-center">
                <h1 className="text-2xl font-bold mb-4">Category: {category}</h1>
                <p className="text-gray-500">No posts found in this category.</p>
            </div>
        );
    }

    return (
        <section>
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Category: {category}</h1>
                <p className="text-gray-600">Browsing all articles in {category}</p>
            </div>
            <div className="space-y-4">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}
