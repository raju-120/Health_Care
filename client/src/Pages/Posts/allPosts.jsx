import { useState, useEffect } from "react";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts/all-posts');
        const data = await res.json();
        if (Array.isArray(data?.data)) {
          setPosts(data?.data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div className="m-5 border-2 border-gray-200 rounded-lg">
      <div className="m-2 p-5">
        {posts.length > 0 ? (
          <div>

            {posts.map((post) => (
              <div key={post?._id} className="border-3 border-blue-500 mb-4">
                <div className="bg-gray-300 p-1 rounded-md">
                  <div className="flex gap-3 mt-2 bg-gray-100 p-3 rounded-xl">
                    <div className="lg:w-12 lg:h-12  w-8 h-8">
                      <img className="rounded-full" src={post?.profile} alt="" />
                    </div>
                    <div className="text-xl m-1 font-semibold items-center ">
                      {post?.username}
                    </div>
                    <div className="mt-1">
                      <span className="text-xs  ">posted something..</span>
                    </div>
                  </div>

                  <div className="mt-5 p-3 bg-gray-50 rounded-md items-center">
                    <div>
                      <span className="font-semibold text-xl text-center">{post?.description}</span>
                    </div>
                    <div className="lg:w-2/5">
                      <img className="mt-2 rounded-lg" src={post?.avatar} alt="" />
                    </div>
                </div>

                <div className="mt-3">
                  <h2 className="text-lg mb-2 font-semibold">Comment Section : </h2>
                  <form>
                    <input type="text-area" className="w-full p-4 rounded-lg mb-2"/>
                    <button style={{marginLeft: '550px'}} className="mt-2 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Comment</button>
                  </form>
                </div>

                <div className="mt-5 p-3 bg-gray-50 rounded-lg">
                  <h1>Comments are displaying section area: </h1>
                </div>

                </div>
              </div>
            ))}

          </div>
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}
