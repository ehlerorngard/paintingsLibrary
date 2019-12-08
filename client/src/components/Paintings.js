import React, { Component } from 'react'
import PropTypes from "prop-types";
import { compose } from 'redux'
import { connect } from 'react-redux'

import Header from './Header.js'
import Footer from './Footer.js'
import PaintingList from './PaintingList.js'
import PaintingDisplay from './PaintingDisplay.js'


class Paintings extends Component {

	render() {
		return (
			<div className="paintingsWrapper">
				<Header />
				<div className='paintingsMain'>
					<div className='col_third'>
						<PaintingList />
					</div>
					<div className='col_2thirds'>
						<PaintingDisplay />
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}

Paintings.propTypes = {
  sidebarVisible: PropTypes.bool,
  scrolledToTop: PropTypes.bool,
  screenSize: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    sidebarVisible: state.sidebarVisible,
    scrolledToTop: state.scrolledToTop,
    screenSize: state.screenSize,
    chicken: state.chicken,
    apollo: state.apollo,
  }
}

export default compose(
	connect(mapStateToProps),
)(Paintings)