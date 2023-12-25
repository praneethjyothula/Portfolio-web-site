import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  onCartList: () => {},
  onDeleteCart: () => {},
  quantity: 1,
  onIncrementCount: () => {},
  onDecrementCount: () => {},
})

export default CartContext
