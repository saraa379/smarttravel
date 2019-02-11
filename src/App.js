import React, { Component } from 'react';
import './App.css';
import store from "./store";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from "react-redux";
import Home from './components/Home.js';
import Howitworks from './components/Howitworks.js';
import FAQ from './components/FAQ.js';
import OfferARide from './components/OfferARide.js';
import SendByATruck from './components/SendByATruck.js';
import Menu from './components/Menu.js';
import Notexist from "./components/404.js";
import Profile from "./components/Profile.js";
import {Link} from 'react-router-dom';


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
                        <Route path="/profile" component={Profile} />
                        <Route path="/faq" component={FAQ} />
                        <Route component={Notexist} />
                    </Switch>
                    <footer>
                          <div className="footerTop">
                              <div className="footerLinks">
                                  <Link to="/howitworks">How it works</Link>
                                  <Link to="/faq">Frequently Asked Questions</Link>
                              </div>
                              <div className="facebookShare">
                                    <i className="fab fa-facebook-f"></i>
                                    <span>Share on Facebook</span>
                              </div>
                          </div>
                          <div className="copy">Copyright &copy; Smart Travel, 2019</div>
                    </footer>
                </div>
            </Router>

      </Provider>
    );
  }
}

export default App;
