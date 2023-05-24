/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllScores } from '../store';
import Calendar from 'react-github-contribution-calendar';

export default function PreviousStreaks() {
  const [heatMapValues, setHeatMap] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const usersScores = useSelector((state) => state.scoreReducer);

  useEffect(() => {
    const unsubscribeUserScores = dispatch(fetchAllScores(id));
    return () => {
      unsubscribeUserScores();
    };
  }, []);

  useEffect(() => {
    const obj = {};
    usersScores.forEach((scoreObj) => {
      //   console.log(scoreObj.date);
      const inputDate = new Date(scoreObj.date);
      const year = inputDate.getFullYear();
      const day = String(inputDate.getDate()).padStart(2, '0');
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const formattedDate = `${year}-${day}-${month}`;
      //   console.log(formattedDate);
      obj[formattedDate] = 1;
    });
    setHeatMap(obj);
  }, []);

  //   const values = {
  //     '2016-06-23': 1,
  //     '2016-06-26': 2,
  //     '2016-06-27': 3,
  //     '2016-06-28': 4,
  //     '2016-06-29': 4,
  //   };
  //   const until = '2023-06-30';
  const panelColors = ['#EEEEEE', '#F78A23', '#F87D09', '#AC5808', '#7B3F06'];
  const weekNames = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];
  const panelAttributes = { rx: 6 };

  const values = heatMapValues || {};
  console.log(values);

  return (
    <div className='m-10'>
      <Calendar
        values={values}
        // until={until}
        panelColors={panelColors}
        weekNames={weekNames}
        panelAttributes={panelAttributes}
        height='110'
      />
    </div>
  );
}
