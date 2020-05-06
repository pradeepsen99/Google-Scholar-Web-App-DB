import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import {useLazyQuery} from '@apollo/react-hooks';
import ArticleItem from "./ArticleItem";
const searchP = gql `
    query searchP($search_query:String!){
      searchP(search_query:$search_query){
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
const SearchP = () => {
  const [runQuery, {data, loading, error}] = useLazyQuery(searchP);
  if(data){
    console.log(data.searchP);
    return (
      <Fragment>{
      data.searchP.map(searchP => (
        <ArticleItem key={searchP.article_id} Paging={searchP} />
      ))                            
    }
    </Fragment> )
  }
  let search_query = '';
  return (
    <div id="edit-user">
     <div className="field">
        <label htmlFor="name">Search Publisher</label>
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
export default SearchP;