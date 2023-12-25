import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import Header from '../Header'
import RelatedProduct from '../RelatedProduct'
import Footer from '../Footer'
import './index.css'

class ProductItemsDetails extends Component {
  state = {
    product: {},
    productList: [],
  }

  componentDidMount() {
    this.getProductInfo()
  }

  getProductInfo = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      imageUrl: data.image_url,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    }

    const updatedProductsList = data.food_items.map(eachItem => ({
      cost: eachItem.cost,
      foodType: eachItem.food_type,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.rating,
      id: eachItem.id,
    }))
    this.setState({product: updatedData, productList: updatedProductsList})
  }

  render() {
    const {product, productList} = this.state
    const {
      costForTwo,
      cuisine,
      imageUrl,
      location,
      name,
      opensAt,
      rating,
      reviewsCount,
    } = product
    return (
      <div>
        <Header />
        <div className="productDetails-data-container">
          <div>
            <img className="productDetails-img" src={imageUrl} alt="logo" />
          </div>
          <div>
            <h1 className="productDetails-heading">{name}</h1>
            <p className="productDetails-data">{cuisine}</p>
            <p className="productDetails-data">{location}</p>
            <div className="productDetails-info">
              <div>
                <div className="productDetails-rating">
                  <FaStar />
                  <p>{rating}</p>
                </div>
                <p className="productDetails-review">{reviewsCount}+ Reviews</p>
              </div>
              <div>
                <p>{costForTwo} RS/-</p>
                <p>Cost For Two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relatedProduct-component">
          {productList.map(eachProduct => (
            <RelatedProduct productList={eachProduct} />
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}
export default ProductItemsDetails
