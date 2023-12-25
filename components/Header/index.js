import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import CartContext from '../../CartContext'
import logo from '../Images/Frame 274.png'
import './index.css'

class Header extends Component {
  render() {
    const onLogOut = () => {
      Cookies.remove('jwt_token')
      const {history} = this.props
      history.replace('/login')
    }

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          return (
            <div className="nav-container">
              <div className="nav-bar">
                <div className="logo-bar">
                  <div>
                    <img src={logo} alt="logo" />
                  </div>
                  <h1 className="logo-title">Tasty Kitchens</h1>
                </div>
                <div className="menu-bar">
                  <Link to="/" className="menu-option">
                    Home
                  </Link>
                  <Link to="/cart" className="menu-option">
                    Cart
                    <p className="notification-header">
                      {cartList.length > 0 ? cartList.length : null}
                    </p>
                  </Link>

                  <div>
                    <input
                      className="login-button"
                      type="button"
                      onClick={onLogOut}
                      value="Log-Out"
                    />
                  </div>
                </div>
              </div>
              <div className="sm-nav-bar">
                <div className="logo-bar">
                  <div>
                    <img src={logo} alt="logo" />
                  </div>
                  <h1 className="logo-title">Tasty Kitchens</h1>
                </div>

                <div className="popup-container">
                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        aria-label="Mute Volume"
                        className="trigger-button"
                      >
                        <GiHamburgerMenu className="menu-icon" />
                      </button>
                    }
                  >
                    {close => (
                      <div className="popUp-menu-container">
                        <div className="menu-link-li">
                          <div className="menu-bar">
                            <Link to="/" className="menu-option">
                              Home
                            </Link>
                            <Link to="/cart" className="menu-option">
                              Cart
                              <p className="notification-header">
                                {cartList.length > 0 ? cartList.length : null}
                              </p>
                            </Link>

                            <div>
                              <input
                                className="login-button"
                                type="button"
                                onClick={onLogOut}
                                value="Log-Out"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="trigger-button"
                          onClick={() => close()}
                        >
                          X
                        </button>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default withRouter(Header)
