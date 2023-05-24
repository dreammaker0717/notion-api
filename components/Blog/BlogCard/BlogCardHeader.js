import Image from "next/image";

function BlogCardHeader({ avatar, author, created }) {
  return (
    <div className="flex gap-3">
      <div className="w-[40px] h-[40px]">
        <Image
          className="rounded-full"
          src={avatar}
          alt={author}
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col text-[18px]">
        <h4 className="font-medium">{author}</h4>
        <span className="text-[12px] text-white-200">{created}</span>
      </div>
    </div>
  );
}

export default BlogCardHeader;
