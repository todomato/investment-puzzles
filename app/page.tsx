import { getPosts } from "@/lib/notion-service";
import { PostCard } from "@/components/blog/PostCard";

export default async function Home() {
  const posts = await getPosts();

  return (
    <section>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Latest Writings</h1>
        <p className="text-gray-600">Thoughts on engineering, investment, and life puzzles.</p>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
