import Blogs from "@/components/Blog/Blogs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/blog">
        <button className="btn btn-active btn-primary">All Blogs</button>
      </Link>
      <div>
        <Blogs />
      </div>
    </div>
  );
}
