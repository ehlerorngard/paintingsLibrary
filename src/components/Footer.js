import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styles from '../styles.js'
import { updateStore, getPaintings } from '../utils/actions.js';
import { OutlinedInput, TextField, Paper, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

class Footer extends Component {

	toggleOptionBar = () => {
		updateStore({ optionBarOpen: !this.props.optionBarOpen })(this.props.dispatch)
	}

	editPainting = () => {
		if (this.props.selected_painting) {
			updateStore({ editingPainting: true, optionBarOpen: false })(this.props.dispatch)
		}
	}

	render() {
		return (
			<div className="Footer">
				<Button
					variant="contained"
					color="secondary"
					label="submit"
					key="optionsButton"
					onClick={this.toggleOptionBar}
				>options</Button>
				{(this.props.selected_painting !== '') ? (<Button
					variant="contained"
					color="primary"
					label="submit"
					key="editPaintingButton"
					onClick={this.editPainting}
				>edit painting <EditIcon />
				</Button>) : null}
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

export default connect(mapStateToProps)(Footer)