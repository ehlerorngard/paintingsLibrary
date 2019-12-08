import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

// ==== COMPONENTS ====
import Header from './Header.js'
import PaintingList from './PaintingList.js'


class Artists extends Component {

	render() {
		console.log('props from the Artists component:', this.props)

		return (
			<div className="artistsMain">
				<div>this is the Artists component</div>
			</div>
		)
	}
}

Artists.propTypes = {
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
  }
}

export default compose(
	connect(mapStateToProps),
)(Artists)