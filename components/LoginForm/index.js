import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import logo from '../Images/Frame 274.png'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    message: '',
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    this.onSubmitForm()
  }

  onSubmitForm = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    const {message} = this.state
    this.setState({message: errorMsg})
  }

  render() {
    const {username, password, message} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect path="/" />
    }

    return (
      <div className="login-form">
        <div className="logo-container">
          <img src={logo} alt="logo" />
          <h1 className="title">Tasty Kitchens</h1>
        </div>
        <div className="submit-data">
          <form onSubmit={this.submitForm}>
            <label htmlFor="username" className="username">
              username
            </label>
            <br />
            <input type="text" id="username" onChange={this.onChangeUsername} />
            <br />
            <label htmlFor="password" className="password">
              password
            </label>
            <br />
            <input
              type="password"
              id="password"
              onChange={this.onChangePassword}
            />
            <br />
            <input type="submit" value="Login" className="login-btn" />
            <p className="notification">{message}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
