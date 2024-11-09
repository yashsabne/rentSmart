import { categories } from "../data";
import "../styles/Categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories" id="explore">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to RentSmart</h1>
        <p>Your one-stop solution for finding your ideal rental, from homes to villas.</p>
      </div>

      {/* Info Section */}
      <div className="info_section">
        <h2>Discover Your Dream Rental</h2>
        <p>
          At RentSmart, we connect you with properties tailored to your needs. Choose from
          a wide variety, whether it’s a cozy apartment, a luxurious villa, or a family-friendly house.
        </p>
      </div>

      {/* Categories List */}
      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`} key={index} style={{textDecoration:'none'}} >
            <div className="category">
              <img src={category.img} alt={category.label} />
              <div className="category_content">
                <div className="category_icon">{category.icon}</div>
                <h3>{category.label}</h3>
                <p>Find the best {category.label} options suited just for you.</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Additional Benefits Section */}
      <div className="benefits_section">
        <h2>Why Choose RentSmart?</h2>
        <ul>
          <li>Wide range of listings for all preferences</li>
          <li>Easy-to-navigate interface and personalized recommendations</li>
          <li>Verified listings with transparent pricing</li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
