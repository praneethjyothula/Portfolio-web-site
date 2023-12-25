import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect, Route} from 'react-router-dom'

class ProtectedRoute extends Component {
  render() {
    const token = Cookies.get('jwt_token')

    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return <Route {...this.props} />
  }
}

export default ProtectedRoute
