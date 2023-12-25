import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../CartContext'
import Header from '../Header'
import CartListItem from '../CartListItem'
import cookingLogo from '../Images/cooking 1.png'
import './index.css'

class Cart extends Component {
  toShowContent = List => {
    console.log(List)
    const totalAmount = List.map(eachItem => eachItem.quantity * eachItem.cost)

    const mainAmount = totalAmount.reduce((num1, num2) => num1 + num2)

    return (
      <div>
        <Header />
        <div className="cart-main-container">
          {List.map(eachCart => (
            <CartListItem eachList={eachCart} />
          ))}
        </div>
        <div className="order-total-container">
          <h1 className="order-total">Order Total:</h1>
          <div className="total-price">
            <h1 className="total-cost">₹{mainAmount}.00</h1>
          </div>
        </div>
        <Link to="/place-order" className="place-order-btn">
          Place Order
        </Link>
      </div>
    )
  }

  toShowEmptyResult = () => (
    <div>
      <Header />
      <div className="empty-container">
        <img src={cookingLogo} alt="logo" className="empty-logo" />
        <h1 className="emptyCart-heading">No Order Yet!</h1>
        <p className="emptyCart-data">Your Cart is empty.Add something</p>
        <p className="emptyCart-data">from the menu</p>
        <Link to="/" className="order-now-btn">
          Order Now
        </Link>
      </div>
    </div>
  )

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          return (
            <div>
              <div className="cart-main-data-container">
                {cartList.length === 0
                  ? this.toShowEmptyResult()
                  : this.toShowContent(cartList)}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Cart
