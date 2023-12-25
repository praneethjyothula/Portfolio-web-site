import {Component} from 'react'
import {FaCheckCircle} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class PlaceOrder extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="payment-container">
          <FaCheckCircle className="payment-success" />
          <h1 className="payment-font">Payment Successful</h1>

          <p className="payment-data">
            Thank you for ordering Your Payment is successfully completed.
          </p>
          <Link to="/" className="home-page">
            Go To HomePage
          </Link>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}
export default PlaceOrder
