import { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";
import { HiOutlineExternalLink } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import Container from "@/components/layout/Container";
import BlogCard from "./BlogCard";
import Link from "next/link";

function Blogs({ homePage, blogPage, ...props }) {
  const [blogData, setBlogdata] = useState([]);

  useEffect(() => {
    async function fetchBlogdata() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/notion?query=blogs"
        );
        setBlogdata(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBlogdata();
  }, []);

  return (
    <Container
      className={classNames(
        {
          labela: true,
        },
        props.className
      )}
    >
      <div className="flex justify-between items-center">
        <h2 className="inline-flex text-[40px] font-semibold relative">
          <span className="z-10">Latest Blogs</span>
        </h2>
        {homePage && (
          <Link
            href="blog"
            className="flex items-center gap-2 text-[18px] text-danger-900 border-b-[1px] border-danger-900"
          >
            <HiOutlineExternalLink />
            Browse Blogs
          </Link>
        )}
        {blogPage && (
          <div className="flex items-center gap-4 py-2 px-4 bg-dark-900 border-[1px] border-gray-900 rounded-md">
            <div className="flex items-center gap-3">
              <BsSearch className="w-[20px] h-[20px]" />
              <input
                className="outline-none bg-transparent"
                type="search"
                placeholder="Search blog posts"
              />
            </div>
            <button class="btn">Search</button>
          </div>
        )}
      </div>
      <div className="py-[50px] flex flex-col gap-3">
        {blogData.map((data) => (
          <BlogCard
            key={data.id}
            title={data.properties.Name.title[0].text.content}
            avatar={data.properties.Author.people[0].avatar_url} 
            author={data.properties.Author.people[0].name}
            created={data.properties.Created.created_time}
            tags={data.properties.Tags.multi_select}
            openUrl={`blog/${data.properties.Slug.formula.string}`}
          />
        ))}
      </div>
    </Container>
  );
}

export default Blogs;
