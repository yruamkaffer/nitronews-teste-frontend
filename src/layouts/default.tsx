import { Link } from "@heroui/link";
import { CoffeeIcon } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-6 flex-grow pt-12 mt-8">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href={siteConfig.links.github}
          title="Github page."
        >
          <span className="text-default-600">Made with</span>
          <CoffeeIcon className="w-4 h-4 text-default-600" />
          <span className="text-default-600">by</span>
          <p className="text-primary">Yruam Käffer de Faria</p>
        </Link>
      </footer>
    </div>
  );
}
