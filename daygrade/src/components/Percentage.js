/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          id='percent'
          variant='caption'
          component='div'
          color='text.secondary'
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function Percentage({ todos }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let count = 0;
    todos.forEach((todo) => {
      if (todo.completed) {
        count++;
      }
    });
    const newPercentage = (count / todos.length) * 100;
    if (newPercentage > 0) {
      setPercentage(newPercentage);
    } else {
      setPercentage(0);
    }
  }, [todos]);

  return <CircularProgressWithLabel value={percentage} size={95} />;
}
