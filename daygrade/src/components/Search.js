import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { BsSearch } from 'react-icons/bs';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector, useDispatch } from 'react-redux';
import { searchLogs } from '../store';
import { Button } from '@mui/material';
import { FcOk } from 'react-icons/fc';
import { useAuth } from '../context/Authcontext';
import Pagination from '@mui/material/Pagination';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [curPage, setCurPage] = useState(1);
  const [logsPerPage] = useState(8);

  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.logReducer);
  // console.log('search results', searchResults);
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    dispatch(searchLogs({ id: currentUser.uid, input: searchInput }));
  }, [searchInput]);

  const indexOfLastLog = curPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = searchResults.slice(indexOfFirstLog, indexOfLastLog);

  let pageNumbers = [];
  let totalLogs = searchResults.length;
  for (let i = 1; i <= Math.ceil(totalLogs / logsPerPage); i++) {
    pageNumbers.push(i);
  }
  pageNumbers = pageNumbers.slice(0, 8);

  const paginate = (pageNumber) => {
    setCurPage(pageNumber);
  };

  return (
    <div className='w-full'>
      <div className='text-center mt-8'>
        <TextField
          id='outlined-search'
          value={searchInput}
          onChange={handleChange}
          // label='Search Your Logs'
          type='search'
          focused
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <BsSearch color='blue' sx={{ font: 'bold' }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: '50%' }}
          placeholder='Search Your Logs'
        />
        <ul className='flex items-center justify-center mt-6'>
          {pageNumbers.map((num) => (
            <li
              key={num}
              onClick={() => paginate(num)}
              className={`${
                num === curPage ? 'bg-blue-600 text-white' : ''
              } cursor-pointer border border-blue-500 rounded-lg ml-2 p-4 hover:bg-blue-600 hover:text-white hover:rounded-lg hover:shadow-gray-600 hover:scale-110 duration-300`}
            >
              <a href='!#'>{num}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 md:p-8'>
        {currentLogs.map((obj, index) => (
          <div
            key={index}
            className='bg-white rounded-lg shadow-lg shadow-gray-500 p-4 m-5'
          >
            <div className='font-bold pb-4'>{obj.log}</div>
            {/* <div className='text-sm text-gray-500'>{obj.Date}</div> */}
            <div className='text-sm text-gray-500 pb-2 flex items-center '>
              <FcOk size={35} className='p-2' />
              {obj.Date}
            </div>
            <div className='flex justify-end'>
              <Button
                variant='contained'
                color='success'
                sx={{ padding: '3px', fontSize: '12px' }}
                onClick={() => console.log(obj)}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

// import React, { useState, useEffect } from 'react';
// import algoliasearch from 'algoliasearch/lite';
// import {
//   SearchBox,
//   InstantSearch,
//   Hits,
//   Pagination,
// } from 'react-instantsearch-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase';
// import Hit from './Hit';
// import { useAuth } from '../context/Authcontext';
// import NotFound from './NotFound';
// import { useNavigate } from 'react-router-dom';

// const searchClient = algoliasearch(
//   'KRCT1Q6126',
//   'c818c23d3da4b33222c71daa3dd5af4b'
// );

// const Search = () => {
//   const [record, setRecord] = useState(null);
//   const { currentUser } = useAuth();

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (record) {
//       async function getLog() {
//         const docRef = doc(db, 'Logger', record.objectID);
//         const docSnap = await getDoc(docRef);
//         console.log(docSnap.data());
//       }
//       getLog();
//     }
//   }, [record]);

//   const TheHit = ({ hit, onClick }) => {
//     // if (currentUser.uid === hit.userId) {
//     //   return <Hit hit={hit} onClick={setRecord} currentUser={currentUser} />;
//     // }
//     return <Hit hit={hit} onClick={setRecord} currentUser={currentUser} />;
//   };

//   if (!currentUser) {
//     navigate('*');
//   }
//   return (
//     <div>
//       <InstantSearch searchClient={searchClient} indexName={'Logger'}>
//         <div id='search-container'>
//           <SearchBox
//             searchAsYouType={true}
//             autoFocus
//             translations={{
//               placeholder: 'Search Logs',
//             }}
//           />
//         </div>

//         <div id='hits-container'>
//           <Hits hitComponent={TheHit} />
//         </div>
//         <Pagination showLast />
//       </InstantSearch>
//     </div>
//   );
// };

// export default Search;
