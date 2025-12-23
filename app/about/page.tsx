import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Investment Puzzles",
    description: "About the author",
};

export default function AboutPage() {
    return (
        <article className="prose prose-lg max-w-none prose-slate">
            <h1>About Me</h1>
            <p>
                Welcome to Investment Puzzles! I am an engineer passionate about solving the financial puzzles of life.
            </p>
            <p>
                This blog serves as a personal knowledge base where I document my journey in:
            </p>
            <ul>
                <li>Software Architecture</li>
                <li>Financial Independence (FIRE)</li>
                <li>System Thinking</li>
            </ul>
            <p>
                <em>(In Phase 2, this content can be fetched dynamically from a Notion page!)</em>
            </p>
        </article>
    );
}
