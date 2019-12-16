import React, { Component } from 'react'
import { compose } from 'redux'
import { OutlinedInput, TextField } from '@material-ui/core';
import { withStyles, withTheme, makeStyles } from '@material-ui/core/styles';
import styles from '../styles.js'


const useStyles = makeStyles({
	root: {
		width: '310px',
	},
})

export default function TextInput(props) {
	const classes = useStyles()

	return (
		<TextField
          label={props.label}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          margin="normal"
          variant="outlined"
          className={classes.root}
        />
	)
}