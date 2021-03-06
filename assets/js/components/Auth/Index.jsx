define(['react', 'react-router', '../../Store', './Login', './Register', './Logout', './LogoutSuccess'], 
function(React, ReactRouter, Store, Login, Register, Logout, LogoutSuccess) {
  const { PropTypes, Component } = React
  const { Router, Route, browserHistory, Link } = ReactRouter

  class Home extends Component {
    componentDidMount() {
      if (this.props.Auth.isAuthenticated && this.props.route.path != '/auth/logout_success') {
        this.props.actions.redirect('/');
      }
    }

    render() {
      const parent_props = this.props
      return (
        <div className='auth wrap'>

          <Router>
            <Route path='/auth/register' component={(props, state) => <Register {...parent_props} />}></Route>
            <Route path='/auth/logout' component={(props, state) => <Logout {...parent_props} />}></Route>
            <Route path='/auth/logout_success' component={(props, state) => <LogoutSuccess {...parent_props} />}></Route>
            <Route path='/auth*' component={(props, state) => <Login {...parent_props} />}></Route>
          </Router>

          <div className='row text-center' style={{ marginTop: 60 }}>
            <Link to='/auth/login'>Login</Link> or <Link to='/auth/register'>Register</Link> 
          </div>
          
        </div>

      );
    }
  }

  return Home
})
