import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { updateStore, getPaintings } from "../utils/actions.js";
import styles from '../styles.js'


class OptionBar extends Component {

	changeView = (view) => {
		updateStore({ view: view, optionBarOpen: false })(this.props.dispatch)
	}
	toggleOptionBar = (e) => {
		updateStore({ optionBarOpen: !this.props.optionBarOpen })(this.props.dispatch)
	}

	render() {
		return (
			<div className="OptionBar" style={(this.props.optionBarOpen) ? styles.optionBarOpen : styles.optionBarClosed}>
				<div className='vertSpace'/>
				<div onClick={() => this.changeView('view_paintings')} value='view_paintings' className='option'>view paintings</div>
				<div onClick={() => this.changeView('add_painting')} value='add_painting' className='option'>add painting</div>
				<div onClick={() => this.changeView('view_artists')} value='view_artists' className='option'>view artists</div>
				<div onClick={() => this.changeView('add_artist')} value='add_artist' className='option'>add artist</div>
				<div style={styles.button} className='button center bottom' onClick={this.toggleOptionBar}>
					<div styles={styles.buttonText}>close</div>
				</div>
			</div>
		)
	}
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
    view: state.view,
    optionBarOpen: state.optionBarOpen,
  }
}

export default connect(mapStateToProps)(OptionBar)