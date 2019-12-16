import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { updateStore, getArtists, getPaintings } from "./utils/actions.js";
import { client } from './configureStore';


// ===== COMPONENTS =====
import Paintings from './components/Paintings.js';
import Artists from './components/Artists.js';

class Cartographer extends Component {

  componentDidMount() {
    this.getScreenSize();
    this.handleScroll();
    this.hideOptionBar();
    this.setInitialProps();
    getPaintings(this.props.dispatch)
    getArtists(this.props.dispatch)
    setTimeout(() => console.log(this.props), 5000)
    window.addEventListener("resize", this.getScreenSize, true);
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getScreenSize, true);
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  getScreenSize = () => {
    let screenSize = "";
    if (window.innerWidth < 700) screenSize = "mobile";
    else if (window.innerWidth <= 1000) screenSize = "tablet";
    else if (window.innerWidth < 1000) screenSize = "computer";
    else screenSize = "computer";

    updateStore({ screenSize: screenSize })(this.props.dispatch);
  }

  handleScroll = () => {
    let scrolllocation = 
      (window.pageYOffset < 6)
      ? { scrolledToTop: true }
      : { scrolledToTop: false }

    updateStore(scrolllocation)(this.props.dispatch);
  }

  showOptionBar = () => {
    updateStore({ optionBarOpen: true })(this.props.dispatch);
  }

  hideOptionBar = () => {
    updateStore({ optionBarOpen: false })(this.props.dispatch);
  }

  setInitialProps = () => {
    updateStore({ 
      view: 'view_paintings',
      selected_artist: '',
      selected_painting: '',
      snackbarColor: '',
      snackbarMessage: '',
    })(this.props.dispatch);
  }

  renderPresentPanel = () => {
    switch (this.props.where) {
      case "elsewhere":
        return (<div />)
      default:
        return (<div />)
    }
  }

  render() {

    return (
      <div className="cartographer noscroll">
        <BrowserRouter >
          <Switch>
            <Route Route exact path="/" component={Paintings} />
            <Route Route path="/artists" component={Artists} />
            <Route Route path="/paintings" component={Paintings} />
            <Route exact path="/index.html" render={() => (<Redirect to="/" />)} />
            <Route component={Paintings} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

Cartographer.propTypes = {
  sidebarVisible: PropTypes.bool,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    sidebarVisible: state.sidebarVisible,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    apollo: state.apollo,
    paintings: state.paintings,
  }
}

export default connect(mapStateToProps)(Cartographer);