import React, { Component } from 'react'
import PropTypes from "prop-types";
import { compose } from 'redux'
import { connect } from 'react-redux'
import { updateStore, getArtists, getPaintings } from "../utils/actions.js";
import Header from './Header.js'
import Footer from './Footer.js'
import PaintingList from './PaintingList.js'
import PaintingDisplay from './PaintingDisplay.js'
import OptionBar from './OptionBar.js'
import Artists from './Artists.js'
import Snackbarr from './Snackbarr.js'
import AddPainting from './AddPainting.js'


class Paintings extends Component {
	closeSnackbar = () => {
		updateStore({ snackbarOpen: false })(this.props.dispatch)
	}
	closeSnackbarInAFew = () => setTimeout(this.closeSnackbar, 6000)


	render() {
		const renderView = () => {
			switch(this.props.view) {
				case 'view_paintings':
					return (
					<div className='hundred noscroll'>
						<div className='col_third noscroll'>
							<PaintingList />
						</div>
						<div className='col_2thirds noscroll'>
							<PaintingDisplay />
						</div>
					</div>)
				case 'add_painting':
					return (<AddPainting />)
				case 'view_artists':
					return (<Artists />)
				default:
					return (
					<div className='hundred'>
						<div className='col_third'>
							<PaintingList />
						</div>
						<div className='col_2thirds'>
							<PaintingDisplay />
						</div>
					</div>)
			}
		}
		return (
			<div className="paintingsWrapper noscroll">
				<Header />
				<div className='paintingsMain noscroll'>
				{renderView()}
				</div>
				<Footer />
				<OptionBar />
				<Snackbarr 
					open={this.props.snackbarOpen}
					message={this.props.snackbarMessage}
					closeSnackbar={this.closeSnackbar}
					color={this.props.snackbarColor}
					closeSnackbarInAFew={this.closeSnackbarInAFew}
				/>
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
    view: state.view,
    snackbarOpen: state.snackbarOpen,
    snackbarMessage: state.snackbarMessage,
    snackbarColor: state.snackbarColor,
  }
}

export default compose(
	connect(mapStateToProps),
)(Paintings)