import React, { useEffect, useState } from "react";
import { getPublishedBlogs } from "../api";
import Card from "./Card";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsloading(true);
        const response = await getPublishedBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.log("Failed to fetch blogs");
      } finally {
        setIsloading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading)
    return <div className="h-screen animate-pulse text-2xl">loading...</div>;
  return (
    <div>
      {blogs.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {blogs.map((blog, idx) => (
            <a href={blog.navigation} key={idx} target="_blank">
              <Card image={blog.coverImageUrl} title={blog.title} />
            </a>
          ))}
        </div>
      ) : (
        "nothing to show right now"
      )}
    </div>
  );
}

export default BlogList;
