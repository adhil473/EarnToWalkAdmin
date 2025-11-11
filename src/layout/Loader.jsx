// Spinner.js
import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

const Loader = ({ color = '#FFCF53', size = 50 }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader color={color} size={size} />
    </div>
  );
};
Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Loader;
