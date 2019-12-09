import React, { Component } from 'react'
import { compose } from 'redux'
import styles from '../styles.js'


class Footer extends Component {

	openOptions = () => {
		console.log("button clicked!")
	}

	render() {
		console.log('props from Footer:', this.props)


		return (
			<div className="Footer">
				<div style={styles.button} className='button' onClick={this.openOptions}>
					<div styles={styles.buttonText}>options</div>
				</div>
			</div>
		)
	}
}

export default Footer