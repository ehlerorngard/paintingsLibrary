import React, { Component } from 'react'
import { compose } from 'redux'


class Header extends Component {
	render() {
		console.log('props from Header:', this.props)

		return (
			<div className="header">
				<div className="r4">paintings and their painters</div>
			</div>
		)
	}
}

export default Header