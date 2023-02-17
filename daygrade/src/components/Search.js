import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { BsSearch } from 'react-icons/bs';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector, useDispatch } from 'react-redux';
import { searchLogs } from '../store';
import { Button } from '@mui/material';
import { useAuth } from '../context/Authcontext';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.logReducer);
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  // const handleSearch = () => {
  //   dispatch(searchLogs({ id: currentUser.uid, input: searchInput }));
  // };

  useEffect(() => {
    dispatch(searchLogs({ id: currentUser.uid, input: searchInput }));
  }, [searchInput]);

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
        <Button
          sx={{ margin: '10px' }}
          variant='contained'
          onClick={() => {
            // handleSearch(currentUser.uid, searchInput);
            console.log(searchInput);
          }}
        >
          Search
        </Button>
      </div>
      <div className='grid grid-cols-2'>
        {searchResults.map((obj, index) => (
          <div
            key={index}
            className='bg-white rounded-lg shadow-lg shadow-gray-500 p-4 m-5 '
          >
            <div>{obj.log}</div>
            <div className='text-sm text-gray-500'>{obj.Date}</div>
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
