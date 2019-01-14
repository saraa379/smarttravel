import React, { Component } from 'react';
import './App.css';
import store from "./store";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";
import Home from './components/Home.js';
import Howitworks from './components/Howitworks.js';
import OfferARide from './components/OfferARide.js';
import SendByATruck from './components/SendByATruck.js';
import LogIn from './components/LogIn.js';
import Menu from './components/Menu.js';
import Notexist from "./components/404.js"

class App extends Component {
  render() {
    return (
      <Provider store={store}>

            <Router>
                <div className="AppWrap">
                    <Menu></Menu>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/offeraride" component={OfferARide} />
                        <Route path="/sendbyatruck" component={SendByATruck} />
                        <Route path="/howitworks" component={Howitworks} />
                        <Route path="/login" component={LogIn} />
                        <Route component={Notexist} />
                    </Switch>
                    <footer>
                          <p>paragraph</p>
                          <p>paragraph</p>
                    </footer>
                </div>
            </Router>

      </Provider>
    );
  }
}

export default App;
