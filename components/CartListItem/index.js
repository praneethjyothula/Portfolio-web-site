import {Component} from 'react'
import {TiDelete} from 'react-icons/ti'
import CartContext from '../../CartContext'
import './index.css'

class CartListItem extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {onDeleteCart, onIncrementCount, onDecrementCount} = value

          const {eachList} = this.props
          const {quantity, imageUrl, name, id} = eachList

          const onDeleteCartList = () => {
            onDeleteCart(id)
          }

          const onAddIncrementCount = () => {
            onIncrementCount(id)
          }

          const onAddDecrementCount = () => {
            if (quantity !== 1) {
              onDecrementCount(id)
            }
          }

          return (
            <div>
              <div className="cartList-container">
                <div className="cartList-display">
                  <img src={imageUrl} alt="logo" className="cartList-img" />
                  <p className="cartList-name">{name}</p>
                </div>
                <div className="cartList-counter">
                  <p
                    onClick={onAddIncrementCount}
                    className="cartList-count-display"
                  >
                    +
                  </p>
                  <p>{quantity}</p>
                  <p
                    onClick={onAddDecrementCount}
                    className="cartList-count-display"
                  >
                    -
                  </p>
                </div>
                <div>
                  <p className="cartList-price">
                    ₹{eachList.quantity * eachList.cost}
                  </p>
                </div>
                <TiDelete className="delete-logo" onClick={onDeleteCartList} />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartListItem
