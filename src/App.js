import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import './App.css';
import Navbar from '../src/Components/layout/navbar';
import landing from '../src/Components/layout/landing';
import login from '../src/Components/auth/login';
import register from '../src/Components/auth/register';
import warehouse from './Components/Warehouse View/warehouse';
import delivery from './Components/Delivery View/delivery';
import admin from './Components/Admin View/admin';
import customer from './Components/Customer View/customer';

const App = () => (
  <Router>
      <Fragment>
        <Navbar/>
        <Route exact path='/' component={landing}/>
        <section className="container">
          <Switch>
            <Route exact path='/login' component={login}/>
            <Route exact path='/register' component={register}/>
          </Switch>
        </section>
        <Route exact path='/customer/dashboard' component={customer}/>
        <Route exact path='/admin/dashboard' component={admin}/>
        <Route exact path='/delivery/dashboard' component={delivery}/>
        <Route exact path='/warehouse/dashboard' component={warehouse}/>
      </Fragment>
    </Router>
);

export default App;
