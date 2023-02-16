import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import Hit from './Hit';

const searchClient = algoliasearch(
  'KRCT1Q6126',
  'c818c23d3da4b33222c71daa3dd5af4b'
);

const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName='Logger'>
      <SearchBox />
      <div className='grid grid-cols-2'>
        {/* <Hits hitComponent={Hit} /> */}
      </div>
    </InstantSearch>
  );
};

export default Search;
