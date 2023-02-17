import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  SearchBox,
  InstantSearch,
  Hits,
  Highlight,
} from 'react-instantsearch-dom';
import Hit from './Hit';

const searchClient = algoliasearch(
  'KRCT1Q6126',
  'c818c23d3da4b33222c71daa3dd5af4b'
);

const Search = () => {
  const TheHit = ({ hit }) => {
    return <Hit hit={hit} />;
  };

  return (
    <InstantSearch searchClient={searchClient} indexName={'Logger'}>
      <div id='search-container'>
        <SearchBox
          searchAsYouType={true}
          autoFocus
          translations={{
            placeholder: 'Search Logs',
          }}
        />
      </div>
      <div id='hits-container'>
        <Hits hitComponent={TheHit} />
      </div>
    </InstantSearch>
  );
};

export default Search;
