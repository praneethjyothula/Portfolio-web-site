import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import ProductItems from '../ProductItems'
import './index.css'
import Header from '../Header'

class Home extends Component {
  state = {
    offers: [],
    products: [],
    counter: 1,
  }

  componentDidMount() {
    this.getInfo()
    this.getProductInfo()
  }

  getInfo = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const updatedData = data.offers.map(eachImg => ({
      imageUrl: eachImg.image_url,
      id: eachImg.id,
    }))
    this.setState({offers: updatedData})
  }

  getProductInfo = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {counter} = this.state
    const offset = (counter - 1) * 9
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${9}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedData = data.restaurants.map(eachProduct => ({
      id: eachProduct.id,
      cuisine: eachProduct.cuisine,
      imageUrl: eachProduct.image_url,
      menuType: eachProduct.menu_type,
      name: eachProduct.name,
      rating: eachProduct.user_rating.rating,
      totalReviews: eachProduct.user_rating.total_reviews,
    }))
    this.setState({products: updatedData})
  }

  onDecrement = () => {
    const {counter} = this.state
    if (counter !== 1) {
      this.setState(
        prevCount => ({counter: prevCount.counter - 1}),
        this.getProductInfo,
      )
    }
  }

  onIncrement = () => {
    const {counter} = this.state
    if (counter < 4) {
      this.setState(
        prevCount => ({counter: prevCount.counter + 1}),
        this.getProductInfo,
      )
    }
  }

  render() {
    const {offers, products, counter} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div>
        <Header />
        <div className="main-carousel-container">
          <div className="carousel-container ">
            <Slider {...settings}>
              {offers.map(eachImg => (
                <img
                  className="carousel-img"
                  src={eachImg.imageUrl}
                  alt="logo"
                />
              ))}
            </Slider>
            <h1 className="details">Popular Restaurants</h1>
            <p className="info">
              select Your favourite restaurants special dish and make your day
              happy....
            </p>
          </div>
        </div>
        <div className="productDetails-container">
          {products.map(eachProduct => (
            <ProductItems products={eachProduct} />
          ))}
        </div>
        <div className="counter-container">
          <button
            type="button"
            className="counter-btn"
            onClick={this.onDecrement}
            aria-label="Mute_Volume"
          >
            <IoIosArrowBack fontSize="20px" />
          </button>
          <div>{counter} Of 4</div>
          <button
            type="button"
            className="counter-btn"
            onClick={this.onIncrement}
            aria-label="Mute_Volume"
          >
            <IoIosArrowForward fontSize="20px" />
          </button>
        </div>
      </div>
    )
  }
}
export default Home
