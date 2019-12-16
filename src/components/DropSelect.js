import React, { Component } from 'react'
import { compose } from 'redux'
import { FormControl, InputLabel, Select, MenuItem, Input, } from '@material-ui/core';
import { withStyles, withTheme, makeStyles } from '@material-ui/core/styles';
import styles from '../styles.js'


const useStyles = makeStyles({
	root: {
		width: '310px',
	},
	inputLabel: {
		fontSize: '1.2rem',
	},
	dropSelect: {
		margin: 0,
		minWidth: 160,
	},
	select: {
		minHeight: '1.5em',
		whiteSpace: 'wrap',
		fontSize: '1.2rem',
	},
	menuItem: {
		fontSize: '1.25rem',
	},
	input: {
		fontSize: '1.25rem',
		paddingLeft: '12px',
		paddingTop: '18px',
	},
});

export default function DropSelect(props) {
	const classes = useStyles()

	const listArtists = () => {
		return (props.artists && props.artists[0]) ? 
			props.artists.map((artist, i) => (
              <MenuItem 
              	value={artist.id} 
              	key={artist.id} 
              	className={ classes.menuItem }
              >{`${artist.firstName} ${artist.lastName}`}
              </MenuItem>
            )) : 
            (<MenuItem value={''} key={'null'} className={ classes.menuItem }></MenuItem>)
	}
	
	return (
        <FormControl className={ classes.dropSelect } fullWidth={true}>
          <InputLabel className={ classes.inputLabel } htmlFor={props.name}>{props.label}</InputLabel>
          <Select
            className={ classes.select }
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            input={<Input required={true} name={props.name} id={props.name} className={ classes.input }/>}
          >
          	{listArtists()}
          </Select>
        </FormControl>
	)
}