import React, { Component } from 'react';
import './App.css';

import axios from 'axios'
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

import { withRouter, Switch, Route, NavLink } from 'react-router-dom';

const url = "http://localhost:9000";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      users: [],
      jokes :[],
    };
  }


  authenticate = () => {
    const token = localStorage.getItem('secret_token');
    const options = {
      headers: {
        authorization: token,
      },
    };
  
    if (token) {
      axios.get(`${url}/api/jokes`, options)
        .then((res) => {
          if (res.status === 200 && res.data) {
    
            this.setState({ loggedIn: true, jokes: res.data });
          }
          else {
            throw new Error();
          }
        })
        .catch((err) => {
          this.props.history.push('/login');
          
        });
    } else {
      this.props.history.push('/login');
    }
  }
  
  componentDidMount() {
    this.authenticate();
  }
  
  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    // console.log(this.props);
    // console.log(prevProps);
    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }


  render() {
    return (
      <div className="App">
             <nav>
          <NavLink to="/">Home </NavLink>
          <NavLink to="/login"> Login </NavLink>
          <NavLink to="/register"> Register </NavLink>
         
          <NavLink to="/logout"> Logout </NavLink>
        </nav>

       <section>
          <Switch>
            <Route path="/register" component={Register} />
           <Route path="/login" component={Login} />
           <Route path="/logout" component={Logout} />
            <Route path="/" render={() => {
              return (
                <React.Fragment>
                  
                <h2>Jokes</h2>
                  <ol>
                    {this.state.jokes.map((joke, i) => 
                      <li key={i}>
                        Setup : {joke.setup}<br></br>
                        PunchLine : {joke.punchline}<br></br> <br></br> 
                        </li>)}
                  </ol>
                </React.Fragment>
              );
            }} /> 
          </Switch>
          
        </section>
      </div>
    );
  }
}

export default withRouter(App);
