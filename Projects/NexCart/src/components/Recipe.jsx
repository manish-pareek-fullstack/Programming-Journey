
  import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setloading] = useState(true);
  const [post, setpost] = useState({});
  const [showPost, setShowPost] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/recipes");
        setRecipes(res.data.recipes);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (showPost) {
      axios
        .get(`https://dummyjson.com/posts/${id}`)
        .then((res) => { setpost(res.data); })
        .catch((err) => console.log(err));
    } else {
      setpost({});
    }
  }, [showPost, id]);

  const recipe = recipes.find((r) => r.id === Number(id));

  if (loading) return <Loader />;
  if (!recipe) return (
    <div className="no-data-state">
      <div className="no-data-icon">🍽️</div>
      <h2>Recipe Not Found</h2>
      <p>This recipe doesn't exist.</p>
    </div>
  );

  return (
    <div className="recipe-container">

      {/* ── TOP BAR ── */}
      <div className="recipe-top-bar">
        <input type="search" placeholder="Search..." />
        <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>
        <button className="btn-toggle" onClick={() => setShowPost(!showPost)}>
          {showPost ? "🙈 Hide Post" : "📝 Show Post"}
        </button>
      </div>

      {/* ── HERO CARD ── */}
      <div className="recipe-hero">
        <img className="recipe-hero-img" src={recipe.image} alt={recipe.name} />
        <div className="recipe-hero-body">
          <h2>{recipe.name}</h2>

          {/* META GRID */}
          <div className="recipe-meta-grid">
            <div className="recipe-meta-item">
              <div className="meta-label">⏱ Prep Time</div>
              <div className="meta-value">{recipe?.prepTimeMinutes} min</div>
            </div>
            <div className="recipe-meta-item">
              <div className="meta-label">🍽 Servings</div>
              <div className="meta-value">{recipe?.servings}</div>
            </div>
            <div className="recipe-meta-item">
              <div className="meta-label">📊 Difficulty</div>
              <div className="meta-value">{recipe?.difficulty}</div>
            </div>
            <div className="recipe-meta-item">
              <div className="meta-label">🌍 Cuisine</div>
              <div className="meta-value">{recipe?.cuisine}</div>
            </div>
            <div className="recipe-meta-item">
              <div className="meta-label">🔥 Calories</div>
              <div className="meta-value">{recipe?.caloriesPerServing}</div>
            </div>
            <div className="recipe-meta-item">
              <div className="meta-label">⭐ Rating</div>
              <div className="meta-value">{recipe?.rating}</div>
            </div>
            <div className="recipe-meta-item">
              <div className="meta-label">💬 Reviews</div>
              <div className="meta-value">{recipe?.reviewCount}</div>
            </div>
            <div className="recipe-meta-item">
              <div className="meta-label">🍳 Meal Type</div>
              <div className="meta-value">{recipe?.mealType?.join(", ")}</div>
            </div>
          </div>

          {/* TAGS */}
          <div className="recipe-tags">
            {recipe?.tags?.map((t, i) => (
              <span className="recipe-tag" key={i}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── INGREDIENTS ── */}
      <div className="recipe-section">
        <h3>🥦 Ingredients</h3>
        {recipe.ingredients.map((item, i) => (
          <p key={i}>• {item}</p>
        ))}
      </div>

      {/* ── INSTRUCTIONS ── */}
      <div className="recipe-section">
        <h3>📋 Instructions</h3>
        {recipe.instructions.map((item, i) => (
          <p key={i}><span className="instruction-step">{i + 1}.</span> {item}</p>
        ))}
      </div>

      {/* ── POST CARD (toggle) ── */}
      {showPost && post?.id && (
        <div className="post-card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <div className="post-tags">
            {post.tags?.map((t, i) => (
              <span className="post-tag" key={i}>{t}</span>
            ))}
          </div>
          <div className="post-reactions">
            <span>👍 {post.reactions?.likes}</span>
            <span>👎 {post.reactions?.dislikes}</span>
            <span>👁 {post.views} views</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default Recipe;

