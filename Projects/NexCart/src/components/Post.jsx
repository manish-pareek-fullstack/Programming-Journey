import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";


const Post = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);

    axios.get("https://dummyjson.com/posts").then((res) => {
      setPosts(res.data.posts);
      setloading(false);
    });
  }, []);
  if (loading) return <Loader />;
  

  const post = posts.find((p) => p.id === Number(id));
if (!post) {
  return <h1>No Data Found</h1>;
}
  return (
    <div>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      {post && (
        <div className="post-card">
          <h3 className="title">{post.title}</h3>
          <p className="body">{post.body}</p>

          <div className="tags">
            {post.tags.map((t, index) => (
              <span key={index} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="reactions">
            <span> {post.reactions?.likes}</span>
            <span> {post.reactions?.dislikes}</span>
            <span> {post.views}</span>
          </div>

          <p className="user">User ID: {post.userId}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
