import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import {useLazyQuery} from '@apollo/react-hooks';
import ArticleItem from "./ArticleItem";
const searchArticle = gql `
    query searchArticle($search_query:String!){
      searchArticle(search_query:$search_query){
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
const Search = () => {
  const [runQuery, {data, loading, error}] = useLazyQuery(searchArticle);
  if(data){
    console.log(data.searchArticle);
    return (
      <Fragment>{
      data.searchArticle.map(searchArticle => (
        <ArticleItem key={searchArticle.article_id} Paging={searchArticle} />
      ))                            
    }
    </Fragment> )
  }
  let search_query = '';
  return (
    <div id="edit-user">
     <div className="field">
        <label htmlFor="name">Search Title</label>
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
export default Search;