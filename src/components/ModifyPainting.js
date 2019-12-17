import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { updateStore, getPaintings, modifyPainting, getPainting } from "../utils/actions.js";
import TextInput from './TextInput.js'
import DropSelect from './DropSelect.js'
import { OutlinedInput, TextField, Paper, Typography, Button } from '@material-ui/core';
import { withStyles, withTheme, makeStyles } from '@material-ui/core/styles';
import styles from '../styles.js'
import EditIcon from '@material-ui/icons/Edit';
import actions from "../utils/actions.js";


class ModifyPainting extends Component {

	componentDidMount() {
		const painting = this.props.paintings.filter(ptn => ptn.id === this.props.selected_painting)
			let art = (painting[0].artist) ? painting[0].artist.id : '';
			if (painting.length > 0) {
				updateStore({
					englishTitle: painting[0].englishTitle,
					originalTitle: painting[0].originalTitle,
					year: painting[0].year,
					permanentResidence: painting[0].permanentResidence,
					medium: painting[0].medium,
					currentOwner: painting[0].currentOwner,
					selected_artist: art,
				})(this.props.dispatch)
			}
	}

	changeView = (e) => {
		updateStore({ view: e.target.value, optionBarOpen: false })(this.props.dispatch)
	}
	toggleOptionBar = (e) => {
		updateStore({ optionBarOpen: !this.props.optionBarOpen })(this.props.dispatch)
	}
	handleChange = e => {
		updateStore({ [e.target.name]: e.target.value })(this.props.dispatch)
	}
	selectArtist = e => {
		updateStore({ selected_artist: e.target.value })(this.props.dispatch)
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
		const list = ['englishTitle', 'originalTitle', 'year', 'permanentResidence', 'currentOwner', 'selected_artist', 'selected_painting']
		const obj = {}
		list.forEach(key => obj[key] = '')
		updateStore(obj)(this.props.dispatch)
	}
	updateClient = (data, listkey) => {
		console.log('updating client state..', data, listkey)
		let ptns = this.props[listkey].map(ptn => {
			if (ptn.id === data.id) {
				return data
			} else return ptn
		})
		console.log('ptns ready to update store', ptns)
		updateStore({ [listkey]: ptns })(this.props.dispatch)
	}
	submitPainting = () => {
		console.log('submitting painting!', this.props)
		if (this.validatePainting()) {
			const data = {
				id: this.props.selected_painting,
				englishTitle: this.props.englishTitle,
				originalTitle: this.props.originalTitle,
				medium: this.props.medium,
				year: parseInt(this.props.year),
				permanentResidence: this.props.permanentResidence,
				currentOwner: this.props.currentOwner,
			}
			if (this.props.selected_artist && this.props.selected_artist !== '') {
				data.artistId = this.props.selected_artist
			}

			this.updateClient(data, 'paintings')
			modifyPainting(data, this.props.paintings)(this.props.dispatch)
			this.clearFields()
			setTimeout(() => actions.getPaintings(this.props.apollo)(this.props.dispatch), 5000)
			updateStore({ view: 'view_paintings' })(this.props.dispatch)
		}
	}

	render() {

		return (
			<div className="ModifyPainting" style={(this.props.optionBarOpen) ? styles.optionBarOpen : styles.optionBarClosed}>
				<Typography variant='h5' className='smallText skinnyMarginBottom inline'>
					modify painting
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
			          label="Medium"
			          value={this.props.medium}
			          name="medium"
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
    medium: state.medium,
    year: state.year,
    permanentResidence: state.permanentResidence,
    currentOwner: state.currentOwner,
    classes: state.classes,
    selected_artist: state.selected_artist,
    artists: state.artists,
    apollo: state.apollo,
  }
}

export default compose(
	connect(mapStateToProps)
)(ModifyPainting)