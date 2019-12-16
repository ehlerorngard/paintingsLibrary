import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { updateStore, getPaintings, addPainting, getPainting } from "../utils/actions.js";
import TextInput from './TextInput.js'
import DropSelect from './DropSelect.js'
import { OutlinedInput, TextField, Paper, Typography, Button } from '@material-ui/core';
import { withStyles, withTheme, makeStyles } from '@material-ui/core/styles';
import styles from '../styles.js'


class AddPainting extends Component {

	changeView = (e) => {
		updateStore({ view: e.target.value, optionBarOpen: false })(this.props.dispatch)
	}
	toggleOptionBar = (e) => {
		updateStore({ optionBarOpen: !this.props.optionBarOpen })(this.props.dispatch)
	}
	handleChange = e => {
		updateStore({ [e.target.name]: e.target.value })(this.props.dispatch)
	}
	selectArtist = id => {
		updateStore({ selected_artist: id })(this.props.dispatch)
	}
	validatePainting = () => {
		if (!this.props.originalTitle || !this.props.year || !this.props.permanentResidence) {
			const what = (!this.props.originalTitle) ? 'n original title' 
				: ((!this.props.year) ? ' year' : ' place of residence')
			updateStore({ 
				snackbarMessage: `The painting must have a${what}`,
				snackbarColor: 'orange',
				snackbarOpen: true,
			})(this.props.dispatch)
			return false
		}
		return true
	}
	openSnackbar = (message, color) => {
		updateStore({ snackbarMessage: message, snackbarColor: color, snackbarOpen: true })(this.props.dispatch)
	}
	clearFields = () => {
		const list = ['englishTitle', 'originalTitle', 'year', 'permanentResidence', 'currentOwner', 'selected_artist']
		const obj = {}
		list.forEach(key => obj[key] = '')
		updateStore(obj)(this.props.dispatch)
	}

	submitPainting = () => {
		console.log('submitting painting!', this.props)
		if (this.validatePainting()) {
			const data = {
				englishTitle: this.props.englishTitle,
				originalTitle: this.props.originalTitle,
				year: parseInt(this.props.year),
				permanentResidence: this.props.permanentResidence,
				currentOwner: this.props.currentOwner,
			}
			if (this.props.selected_artist && this.props.selected_artist !== '') {
				data.artistId = this.props.selected_artist
			}

			addPainting(data, this.props.paintings)(this.props.dispatch)
			this.clearFields()
			updateStore({ view: 'view_paintings' })(this.props.dispatch)
		}
	}

	render() {

		return (
			<div className="AddPainting" style={(this.props.optionBarOpen) ? styles.optionBarOpen : styles.optionBarClosed}>
				<Typography variant='h5' className='smallText skinnyMarginBottom inline'>
					add a painting
				</Typography>
				<div className='row hundred'>
					<TextInput
			          label="Title in English"
			          value={this.props.englishTitle}
			          name="englishTitle"
			          onChange={this.handleChange}
			        />
			        <TextInput
			          label="Original Title"
			          value={this.props.originalTitle}
			          name="originalTitle"
			          onChange={this.handleChange}
			        />
			    </div>
			    <div className='row hundred'>
					<TextInput
			          label="Year"
			          value={this.props.year}
			          name="year"
			          onChange={this.handleChange}
			        />
				</div>
				<div className='row hundred'>
					<TextInput
			          label="Permanent Residence"
			          value={this.props.permanentResidence}
			          name="permanentResidence"
			          onChange={this.handleChange}
			        />
					<TextInput
			          label="Current Owner"
			          value={this.props.currentOwner}
			          name="currentOwner"
			          onChange={this.handleChange}
			        />
				</div>
				<div className='row hundred'>
					<DropSelect 
						label={'Artist'}
						name={'artist'}
						value={this.props.selected_artist}
						onChange={this.selectArtist}
						artists={this.props.artists}
					/>
				</div>
				<div className='vertSpace'/>
				<Button 
					variant="contained" 
					color="primary" 
					label="submit"
					key={true}
					onClick={this.submitPainting}
				>
					submit
				</Button>
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
    englishTitle: state.englishTitle,
    originalTitle: state.originalTitle,
    year: state.year,
    permanentResidence: state.permanentResidence,
    currentOwner: state.currentOwner,
    classes: state.classes,
    selected_artist: state.selected_artist,
    artists: state.artists,
  }
}

export default compose(
	connect(mapStateToProps)
)(AddPainting)