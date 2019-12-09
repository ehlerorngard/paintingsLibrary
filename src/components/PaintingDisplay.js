import React, { Component } from 'react'
import PropTypes from "prop-types";
import { compose } from 'redux'
import { connect } from 'react-redux'

import Header from './Header.js'
import Footer from './Footer.js'

import pics from '../assets/pics.js'


class PaintingDisplay extends Component {

	render() {
		return (
			<div className="PaintingDisplay">
				{(this.props.selected_painting)
					? <img src={pics[`_${this.props.selected_painting}`]} alt='' width='65%' className='image'></img>
					: <div />
				}
			</div>
		)
	}
}

PaintingDisplay.propTypes = {
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
    paintings: state.paintings,
    selected_painting: state.selected_painting,
  }
}

export default compose(
	connect(mapStateToProps),
)(PaintingDisplay)