import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import {useLazyQuery} from '@apollo/react-hooks';
import ArticleItem from "./ArticleItem";
const searchJournal = gql `
    query searchJournal($search_query:String!){
      searchJournal(search_query:$search_query){
        article_id,
        title,
        citedBy,
        citations,
        pub_year,
        eprint,
        pub_number,
        pub_publisher,
        pub_url,
        journal
      }
    }
`;
const SearchJ = () => {
  const [runQuery, {data, loading, error}] = useLazyQuery(searchJournal);
  if(data){
    console.log(data.searchJournal);
    return (
      <Fragment>{
      data.searchJournal.map(searchJournal => (
        <ArticleItem key={searchJournal.article_id} Paging={searchJournal} />
      ))                            
    }
    </Fragment> )
  }
  let search_query = '';
  return (
    <div id="edit-user">
     <div className="field">
        <label htmlFor="name">Search Journal</label>
        <input
          type="text"
          id="search_query"
          onChange={(event) => {search_query = event.target.value }} />
        <button onClick={
          (event) => {
            event.preventDefault();
            runQuery({
              variables: { search_query }, 
              suspend: false
            })
          }}
          className = "btn btn-success"
          >Search</button>
        </div>
      </div>
  );
}
export default SearchJ;