import React, { Component } from 'react'
import { compose } from 'redux'
import styles from '../styles.js'


class Footer extends Component {

	render() {
		return (
			<div className="Footer">
				<div style={styles.button} className='button' onClick={() => {}}>
					<div styles={styles.buttonText}>options</div>
				</div>
			</div>
		)
	}
}

export default Footer