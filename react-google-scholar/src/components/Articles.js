import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import ArticleItem from "./ArticleItem";
import Article from './Article';
import Key from './Key';

// const ARTICLES_QUERY = gql`
//   query ArticlesQuery{
//     Articles {
//       article_id,
//       title, 
//       citedBy, 
//       citations, 
//       pub_year, 
//       eprint, 
//       pub_number, 
//       pub_publisher, 
//       pub_url, 
//       journal
//     }
//   }  
// `;
const PAGINATION_ARTICLES_QUERY = gql`
  query ArticleQuery{
    Paging (offset:0, limit:1000){
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
export class Articles extends Component{
  render(){
    return(
      <Fragment>
      <h1 className="display-4 my-3">Articles</h1>
      <Key />
      <Query query={PAGINATION_ARTICLES_QUERY}>
      {
        ({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return `Error! ${error.message}`; 
          return <Fragment>{
            data.Paging.map(Paging => (
              <ArticleItem key={Paging.article_id} Paging={Paging} />
            ))
          }
          </Fragment>
          
        }
      }
      </Query>
      </Fragment>
    );
  }
}

export default Articles;