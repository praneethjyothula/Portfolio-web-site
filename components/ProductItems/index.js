import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

class ProductItems extends Component {
  render() {
    const {products} = this.props
    const {
      imageUrl,
      cuisine,
      menuType,
      name,
      rating,
      totalReviews,
      id,
    } = products
    return (
      <Link to={`/restorent/${id}`} className="product-main-container">
        <div className="product-container">
          <div>
            <img className="product-img" src={imageUrl} alt="logo" />
          </div>
          <div>
            <h3 className="product-title">{name}</h3>
            <p className="product-info">{menuType}</p>
            <div className="product-rating">
              <FaStar className="star" />
              <p className="rating-star">{rating}</p>
              <p className="rating">({totalReviews} ratings)</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}
export default ProductItems
