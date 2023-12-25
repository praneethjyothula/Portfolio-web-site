import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ProductItemsDetails from './components/ProductItemsDetails'
import Cart from './components/Cart'
import CartContext from './CartContext'
import PlaceOrder from './components/PlaceOrder'

class App extends Component {
  state = {
    cartList: [],
  }

  onCartList = ProductList => {
    const {cartList} = this.state
    const result = cartList.map(item => item.name === ProductList.name)
    const resultLength = result.length - 1
    const mainCart = result[resultLength]

    if (mainCart === false || mainCart === undefined) {
      this.setState(Previous => ({
        cartList: [...Previous.cartList, ProductList],
      }))
    }
  }

  onDeleteCart = ID => {
    const {cartList} = this.state
    const updatedCart = cartList.filter(eachItem => eachItem.id !== ID)
    this.setState({cartList: updatedCart})
  }

  onIncrementCount = ID => {
    this.setState(previous => ({
      cartList: previous.cartList.map(eachItem => {
        if (eachItem.id === ID) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      }),
    }))
  }

  onDecrementCount = ID => {
    const {quantity} = this.state
    if (quantity !== 1) {
      this.setState(previous => ({
        cartList: previous.cartList.map(eachItem => {
          if (eachItem.id === ID) {
            return {...eachItem, quantity: eachItem.quantity - 1}
          }
          return eachItem
        }),
      }))
    }
  }

  render() {
    const {cartList, quantity} = this.state

    return (
      <div>
        <CartContext.Provider
          value={{
            cartList,
            onCartList: this.onCartList,
            onDeleteCart: this.onDeleteCart,
            onIncrementCount: this.onIncrementCount,
            onDecrementCount: this.onDecrementCount,
          }}
        >
          <BrowserRouter>
            <Switch>
              <ProtectedRoute exact path="/" component={Home} />
              <Route exact path="/login" component={LoginForm} />
              <Route
                exact
                path="/restorent/:id"
                component={ProductItemsDetails}
              />
              <ProtectedRoute exact path="/cart" component={Cart} />
              <ProtectedRoute
                exact
                path="/place-order"
                component={PlaceOrder}
              />
            </Switch>
          </BrowserRouter>
        </CartContext.Provider>
      </div>
    )
  }
}
export default App
