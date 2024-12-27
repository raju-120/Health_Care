import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function AllPosts() {
  const { currentUser } = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://health-care-server-0t0x.onrender.com/api/posts/all-posts');
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
    const interval = setInterval(fetchPosts, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (postId, e) => {
    e.preventDefault();
    try {
      if (newComment.trim() !== "") {
        const res = await fetch('https://health-care-server-0t0x.onrender.com/api/comments/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uId: currentUser?.data?.user?._id,
            pId: postId,
            comments: newComment,
            username: currentUser?.data?.user?.username,
            useravatar: currentUser?.data?.user?.avatar
          })
        });
        const data = await res.json();
        if (!data.success) {
          console.log('Comment did not post:', data.message);
        }
        setAllComments();
        setNewComment("");
      }
    } catch (error) {
      console.error('Error posting comment:', error.message);
    }
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="lg:m-5 border-2 border-gray-200 rounded-lg">
      <div className="lg:m-2 lg:p-5">
        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <div key={post?._id} className="border-2 border-blue-500 mb-4 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <img className="rounded-full w-12 h-12 mr-2" src={post?.useravatar} alt="" />
                  <div className="text-xl font-semibold">{post?.username}</div>
                </div>
                <div className="bg-gray-100 p-3 rounded-md mb-3">
                  <p className="text-lg font-semibold">{post?.descriptions}</p>
                  <img className="mt-2 rounded-lg" src={post?.avatar} alt="" />
                </div>
                <div className="bg-white p-3 rounded-md mb-3">
                  {allComments.filter(comment => comment.pId === post._id).map((comment) => (
                    <div key={comment._id} className="flex items-center mb-3">
                      <img className="rounded-full w-10 h-10 mr-3" src={comment?.useravatar} alt="user photo" />
                      <div>
                        <h1 className="text-xl font-semibold">{comment?.username}</h1>
                        <p className="text-lg">{comment?.comments}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={(e) => handleSubmit(post._id, e)}>
                  <textarea
                    className="w-full p-2 rounded-lg mb-2"
                    value={newComment}
                    onChange={handleChange}
                    placeholder="Write a comment..."
                  />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm">
                    Comment
                  </button>
                </form>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No posts available</p>
        )}
      </div>
    </div>
  );
}
