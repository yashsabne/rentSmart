import { categories } from "../data";
import "../styles/Categories.css"
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories" id="explore">

      <h1 style={{marginTop:'50px'}} >Explore The RentSmart</h1>
      <p>
        Explore our wide range of rentals that cater to all types of
        renter that may be house, Villa, Apartment, Banglow, and many more. 
      </p>

      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`}>
            <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
