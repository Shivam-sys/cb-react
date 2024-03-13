import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        if (!response.ok) {
          throw new Error("Some error occured while fetching data");
        }

        const responseData = await response.json();
        console.log(responseData.data);
        setPosts(responseData.data);
      } catch (e) {
        console.log("Error: " + e);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="container mx-auto mt-8">
        <div className="-mx-4 flex flex-wrap">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
