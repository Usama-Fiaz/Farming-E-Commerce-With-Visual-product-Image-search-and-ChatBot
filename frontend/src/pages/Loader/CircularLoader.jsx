import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Loader from './Loader.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const CircularLoader = ({ size = 100 }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img src={Loader} alt="Loading..." width={size} />
    </Box>
  );
};

CircularLoader.propTypes = {
  size: PropTypes.number,
};

export default CircularLoader;
