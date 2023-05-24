import Link from "next/link";

function BlogCardFooter({ tags, openUrl }) {
  return (
    <div className="flex flex-col items-start pt-3 border-t-[1px] border-gray-900">
      <div className="flex items-center gap-3">
        {tags.map((data) => (
          <div className="badge">{data.name}</div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link href={openUrl}>
          <button className="btn btn-active btn-primary">Read </button>
        </Link>
      </div>
    </div>
  );
}

export default BlogCardFooter;
