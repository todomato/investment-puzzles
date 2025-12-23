import Link from "next/link";
import { siteConfig } from "../../site.config";

export function Navbar() {
    return (
        <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight hover:text-blue-600 transition-colors">
                    {siteConfig.title}
                </Link>
                <div className="flex gap-6">
                    {siteConfig.menu.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
