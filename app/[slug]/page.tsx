import { getPostBySlug, getPosts } from "@/lib/notion-service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from 'next';
import ReactMarkdown from "react-markdown";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    console.log("DEBUG: Running generateStaticParams for [slug]");
    const posts = await getPosts();
    console.log(`📝 Generating static params for ${posts.length} posts`);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Not Found' };

    return {
        title: `${post.title} | Investment Puzzles`,
        description: post.summary,
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <header className="mb-10">
                <div className="flex gap-2 mb-4">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium tracking-wide">
                            #{tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl font-bold mb-4 leading-tight tracking-tight text-gray-900">{post.title}</h1>
                <div className="text-gray-500 text-sm font-medium">
                    {post.date} • {post.category}
                </div>
            </header>

            <div className="prose prose-lg max-w-none prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500">
                <ReactMarkdown>{post.content || ""}</ReactMarkdown>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-100">
                <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                    ← Back to Home
                </Link>
            </div>
        </article>
    );
}
