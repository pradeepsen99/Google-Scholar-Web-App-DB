import React from 'react';
import { Query } from "react-apollo";
import Article from './Article';
import gql from "graphql-tag";

const Articles = () => (
  <Query
    query={gql`
      {
        Articles
        {
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
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return `Error! ${error.message}`; 

      return data.Articles.map(({ article_id, title, citedBy, citations, pub_year, eprint, pub_number, pub_publisher, pub_url, journal }) => (
      <div key={article_id}>
        <p>{`${title} by ${citedBy}`}</p>
      </div>

      ));
    }}
  </Query>
);export default Articles;