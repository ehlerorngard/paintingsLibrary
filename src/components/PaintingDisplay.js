import React, { Component } from 'react'
import PropTypes from "prop-types";
import { compose } from 'redux'
import { connect } from 'react-redux'

import Header from './Header.js'
import Footer from './Footer.js'
import ModifyPainting from './ModifyPainting.js'

import pics from '../assets/pics.js'


class PaintingDisplay extends Component {

	render() {
    const getContent = () => {      
      if (this.props.selected_painting && this.props.selected_painting !== '') {
        console.log('editingPainting', this.props.editingPainting)
        if (this.props.editingPainting === true) {
          return (<ModifyPainting />)
        } else {
          return (<img src={pics[`_${this.props.selected_painting}`]} alt='' width='65%' className='image'></img>)
        }
      } else return (null)
    }

		return (
			<div className="PaintingDisplay">
        {getContent()}
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
    editingPainting: state.editingPainting,
  }
}

export default compose(
	connect(mapStateToProps),
)(PaintingDisplay)