import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import CartContext from '../../CartContext'
import './index.css'

class RelatedProduct extends Component {
  state = {
    quantity: 1,
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {onCartList} = value
          const {quantity} = this.state
          const {productList} = this.props
          const {cost, foodType, imageUrl, name, rating, id} = productList

          const onAddCartList = () => {
            onCartList({...productList, quantity})
          }

          return (
            <div className="relatedProduct-container">
              <div>
                <img src={imageUrl} alt="logo" className="relatedProduct-img" />
              </div>
              <div>
                <h1 className="relatedProduct-title">{name}</h1>
                <p className="relatedProduct-rating">{cost} RS/-</p>
                <div className="relatedProduct-rating">
                  <FaStar color="#FFCC00" />
                  <p>{rating}</p>
                </div>

                <input
                  type="button"
                  value="ADD"
                  className="add-btn"
                  onClick={onAddCartList}
                />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default RelatedProduct
