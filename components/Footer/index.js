import {Component} from 'react'
import {FaPinterest, FaInstagram, FaFacebook} from 'react-icons/fa'
import {IoLogoTwitter} from 'react-icons/io'

import logo from '../Images/Frame 275.png'

import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-logo-container">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <h1 className="footer-title">Tasty Kitchens</h1>
        </div>
        <div className="footer-detail-container">
          <p>The Only thing We are serious about is food.</p>
          <p>Contact Us On</p>
        </div>
        <div className="footer-logo-container">
          <FaInstagram className="footer-logo" />
          <FaPinterest className="footer-logo" />
          <IoLogoTwitter className="footer-logo" />
          <FaFacebook className="footer-logo" />
        </div>
      </div>
    )
  }
}
export default Footer
