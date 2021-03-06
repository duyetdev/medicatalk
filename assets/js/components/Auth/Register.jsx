define(['react', 'react-router', 'Actions', './AuthMessage', '../../utils/ErrorParser'], 
function(React, ReactRouter, Actions, AuthMessage, ErrorParser) {
  const { PropTypes, Component } = React
  const { History } = ReactRouter
  const { changeForm, register } = Actions

  class RegisterForm extends Component {
    constructor(props) {
      super(props)
      
      // this.onChange = this.onChange.bind(this)
      const redirectRoute = this.props.location.query.next || '/';
      this.state = {
        message: '',
        username: '',
        email: '',
        password: '',
        repassword: '',
        remember: true,
        redirectTo: redirectRoute,
        isSending: false
      }
    }

    submitForm(e) {
      e.preventDefault();

      if (!this.state.username) {
        this.setState({ message: 'Username is required!' });
        return;
      }

      if (!this.state.email) {
        this.setState({ message: 'Email is required!' });
        return;
      }

      if (!this.state.password || this.state.password.length < 6) {
        this.setState({ message: 'Password invalid!' })
        return;
      }

      if (this.state.password != this.state.repassword) {
        this.setState({ message: 'Password not match!' })
        return;
      }

      this.setState({ isSending: true })
      this.props.actions.doRegister(this.state.email, this.state.username, this.state.password, this.state.redirectTo, (response) => {
        this.setState({ message: null });
        this.setState({ isSending: false })
        
        if (response.type == 'LOGIN_USER_SUCCESS') {
          
        } else {
          this.setState({ message: ErrorParser(response.payload) })
        }
      })
    }

    handleChange(type) {
      return (e) => {
        this.setState({ [type]: e.target.value })
      }
    }

    render() {
      return(
          <form className='form'>
            <h4 className='form-heading'>Register</h4>
            <AuthMessage message={this.state.message} />

            {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
            
            <label htmlFor='inputEmail' className='sr-only'>Email address</label>
            <input type='text' 
              id='inputUsername' 
              className='form-control' 
              placeholder='Username' 
              onChange={this.handleChange('username').bind(this)}
              required 
              autofocus />

            <label htmlFor='inputEmail' className='sr-only'>Email address</label>
            <input type='email' 
              id='inputEmail' 
              className='form-control' 
              placeholder='Email address' 
              onChange={this.handleChange('email').bind(this)}
              required 
              autofocus />

            <label htmlFor='inputPassword' className='sr-only'>Password</label>
            <input type='password' 
              id='inputPassword' 
              className='form-control' 
              placeholder='Password' 
              onChange={this.handleChange('password').bind(this)}
              required />

            <label htmlFor='inputPassword' className='sr-only'>Repeat</label>
            <input type='password' 
              id='inputRePassword' 
              className='form-control' 
              placeholder='Repeat' 
              onChange={this.handleChange('repassword').bind(this)}
              required />

            <button  
              className='btn btn-lg btn-primary btn-block' 
              type='submit'
              disabled={this.props.isSending}
              onClick={this.submitForm.bind(this)}>
              {!this.state.isSending ? 'Register' : 'Request ...'}
            </button>
          </form>
      );
    }
  }

  RegisterForm.propTypes = {
    // submitForm: React.PropTypes.func.isRequired,
    // data: React.PropTypes.object.isRequired
  }

return RegisterForm
})
