import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function AllPosts() {
  const { currentUser } = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  console.log('allComments: ', allComments);

  const handleSubmit = async (_id, e) => {
    e.preventDefault();
    try {
      if (newComment.trim() !== "") {
        const res = await fetch('/api/comments/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uId: currentUser?.data?.user?._id,
            pId: _id,
            comments: newComment,
            username: currentUser?.data?.user?.username,
            useravatar: currentUser?.data?.user?.avatar
          })
        });
        const data = await res.json();
        if (data.success === false) {
          console.log('Comment did not posted: ', data.message);
        }
        console.log('data for comment: ', data);
        setNewComment("");
      }
    } catch (error) {
      console.log('error from comment: ', error.message);
    }
  }

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts/all-posts');
        const data = await res.json();
        if (Array.isArray(data?.data)) {
          // Sort posts by createdAt in descending order
          const sortedPosts = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(sortedPosts);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comments/comments');
        const data = await res.json();
        if (Array.isArray(data?.data)) {
          setAllComments(data?.data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
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
                      <span className="font-semibold text-xl text-center">{post?.descriptions}</span>
                    </div>
                    <div className="lg:w-2/5">
                      <img className="mt-2 rounded-lg" src={post?.avatar} alt="" />
                    </div>
                  </div>

                  {/* comments shown section */}
                  <div className="mt-5 bg-white p-2 rounded-md">
                    {allComments.length > 0 ? (
                      <div>
                        {allComments.map((comment) => {
                          if (comment?.pId === post?._id) {
                            return (
                              <div key={comment._id}>
                                <div className="divider"></div>
                                <div className="flex">
                                  <div className="mt-3">
                                    <img src={comment?.useravatar} alt="user photo" className="lg:w-14 lg:h-14 w-10 h-10 rounded-full" />
                                  </div>
                                  <div>
                                    <h1 className="text-xl font-semibold mt-1 ml-4 mb-5">{comment?.username}</h1>
                                    <div style={{ marginTop: '-16px' }} className="ml-5 bg-gray-300 p-2 rounded-lg">
                                      <p className="text-lg">{comment?.comments}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-3">
                    <h2 className="text-lg mb-2 font-semibold">Comment Section : </h2>

                    <form onClick={(e) => handleSubmit(post?._id, e)}>
                      <input type="text-area" className="w-full p-4 rounded-lg mb-2" id="comments" onChange={handleChange} />
                      <button style={{ marginLeft: '550px' }} className="mt-2 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Comment</button>
                    </form>

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
