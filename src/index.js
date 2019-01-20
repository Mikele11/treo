import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import Update from './components/Upd';
import Details from './components/Details'


import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/create' component={Create} />
        <Route path='/update' component={Update} />
        <Route path='/details' component={Details} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

