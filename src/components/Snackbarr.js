import React, { Component, useEffect } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles({
  message: {
    fontSize: "24px",
    maxWidth: 500,
    opacity: 1,
  },
  paper: {
    opacity: .9,
  },
  margin: {
    marginBottom: 16,
  },
  orange: {
    backgroundColor: '#ffb74d',
    color: '#263238'
  },
  indigo: {
    backgroundColor: '#c5cae9',
  },
  cyan: {
    backgroundColor: '#b2ebf2',
    color: '#263238'
  },
});

const color = function(colour) {
  if (colour === 'indigo' || colour === 'orange' || colour === 'cyan') {
    return colour
  } else return 'cyan'
}

export default function Snackbarr(props) {
  const classes = useStyles(() => color(props.color))

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={props.open}
      autoHideDuration={6000}
      className={ classes.margin }
      onEntered={props.closeSnackbarInAFew}
    >
      <SnackbarContent 
        className={ classes.paper, classes[color(props.color)] }
        aria-describedby='message-id'
        message={<span id="message-id">{props.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className="closeX"
            onClick={props.closeSnackbar}
          >
            <CloseIcon size="large" />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}