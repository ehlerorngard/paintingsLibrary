import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { updateStore, getPaintings } from "../utils/actions.js";


class PaintingList extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { apollo, dispatch } = this.props
		getPaintings(this.props.dispatch)
	}

	select = (pId) => {
		updateStore({ selected_painting: pId })(this.props.dispatch)
	}

	displayPaintings = () => {
		if (this.props.loading || !this.props.paintings) {
			return (<div className="italics">l o a d i n g    p a i n t i n g s . . .</div>)
		}
		else {
			return this.props.paintings.map(ptn => (
				<div key={ptn.id} className="paintingBox">
					<div className="r1half">{ptn.englishTitle}</div>
					<div className="r1 italics">{ptn.originalTitle}</div>
					<div className="r1">{ptn.year}</div>
					<div className="r1">{ptn.permanentResidence}</div>
					<div className="r1half Oswald">{ptn.artist.firstName} {ptn.artist.lastName}</div>
					<div  className="vertSpace" />
				</div>
			))
		}
	}

	render() {
		const textA = (pId) => (this.props.selected_painting === pId)
			? { fontSize: '1.3rem', transition: 'font-size .25s'}
			: { fontSize: '1rem', transition: 'font-size .25s'}

		const textB = (pId) => (this.props.selected_painting === pId)
			? { fontSize: '2rem', transition: 'font-size .25s'}
			: { fontSize: '1.5rem', transition: 'font-size .25s'}

		return (
			<div className="paintingListMain">
				<div  className="vertSpace" />
				<div className='pList'>
				{(!this.props.paintings) 
					? <div className="italics">l o a d i n g <br/><br/> p a i n t i n g s . . .</div>
					: this.props.paintings.map(ptn => (
						<div key={ptn.id} value={ptn.id} className="paintingBox" onClick={e => this.select(ptn.id)}>
							<div style={textB(ptn.id)} className='clickable_text'>{ptn.englishTitle}</div>
							<div style={textA(ptn.id)} className="italics clickable_text">{ptn.originalTitle}</div>
							<div style={textA(ptn.id)} className='clickable_text'>{ptn.year}</div>
							<div style={textA(ptn.id)} className='clickable_text'>{ptn.permanentResidence}</div>
							<div style={textA(ptn.id)} className="Oswald clickable_text">{ptn.artist.firstName} {ptn.artist.lastName}</div>
							<div  className="vertSpace" />
						</div>
					))
				}
				</div>
			</div>
		)
	}
}

PaintingList.propTypes = {
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
)(PaintingList)