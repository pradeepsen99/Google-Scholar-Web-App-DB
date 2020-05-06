import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import ArticleItem from "./ArticleItem";
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
      <center><h1 className="display-4 my-3">Articles</h1></center>
      <Key />
      <Query query={PAGINATION_ARTICLES_QUERY}>
      {
        ({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return `Error! ${error.message}`; 
          console.log(data.Paging);
          return <Fragment>{
            data.Paging.map(Paging => (
              <ArticleItem key={Paging.article_id} Paging={Paging} />
            ))
          }
          </Fragment>
          
        }
      }
      </Query>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="/">1</a></li>
          <li class="page-item"><a class="page-link" href="/page2">2</a></li>
          <li class="page-item"><a class="page-link" href="/page3">3</a></li>
          <li class="page-item"><a class="page-link" href="/page4">4</a></li>
          <li class="page-item"><a class="page-link" href="/page5">5</a></li>
          <li class="page-item"><a class="page-link" href="/page6">6</a></li>
          <li class="page-item"><a class="page-link" href="/page7">7</a></li>
          <li class="page-item"><a class="page-link" href="/page8">8</a></li>
          <li class="page-item"><a class="page-link" href="/page9">9</a></li>
          <li class="page-item"><a class="page-link" href="/page10">10</a></li>
          <li class="page-item"><a class="page-link" href="/page11">11</a></li>
        </ul>
      </nav>
      </Fragment>
    );
  }
}

export default Articles;