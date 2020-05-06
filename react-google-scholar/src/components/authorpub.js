import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Authouritem from './authoritem';
import AuthorKey from './authorkey';
const AUTHORPUB_QUERY = gql`
    query ArticleQuery{
        authorPub{
            author_id,
            author_name,
            num_pubs
        }
    }
`;
export class authorPub extends Component{
    render(){
      return(
        <Fragment>
        <center><h1 className="display-4 my-3">Authors</h1></center>
        <AuthorKey />
        <Query query={AUTHORPUB_QUERY}>
        {
          ({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return `Error! ${error.message}`; 
            console.log(data.authorPub);
            return <Fragment>{
                data.authorPub.map(authorPub => (
                  <Authouritem key={authorPub.author_id} authorPub={authorPub} />
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
  
export default authorPub;
