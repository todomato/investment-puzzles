import { siteConfig } from "../../site.config";

export function Footer() {
    return (
        <footer className="py-8 mt-12 border-t border-gray-100 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} {siteConfig.author}. All rights reserved.</p>
        </footer>
    );
}
