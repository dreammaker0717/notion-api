import BlogCardHeader from "./BlogCardHeader";
import BlogCardBody from "./BlogCardBody";
import BlogCardFooter from "./BlogCardFooter";

function BlogCard({ key, title, avatar, author, created, tags, openUrl }) {
  return (
    <div
      key={key}
      className="flex flex-col gap-3 border-[1px] border-gray-900 rounded-md p-4"
    >
      <BlogCardHeader avatar={avatar} author={author} created={created} />
      <BlogCardBody title={title} />
      <BlogCardFooter tags={tags} openUrl={openUrl} />
    </div>
  );
}

export default BlogCard;
