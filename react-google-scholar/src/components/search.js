import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { graphql} from "react-apollo";
import * as compose from 'lodash.flowright';
import debounce from 'debounce';
const searchArticle = gql `
    query searchArticle{
      searchArticle(search_query:"is"){
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
const Paging = gql`
query {
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
class Search extends Component{
   state = {
     search_query: ''
   }
   onChange = (e) => {
     const value = e.target.value
     this.handleFilter(value)
   }
   handleFilter = debounce((value) => {
     this.props.onSearch(value);
   },250)
   render(){
     const { loading } = this.props.data;
     console.log(this.props.data.searchArticle);
     const items = this.props.data.searchArticle;
     return (
       <div>
        <input
          style={styles.input}
          onChange={this.onChange.bind(this)}
          placeholder='Search for articles' />
          {
            !!loading&&(<p>Searching...</p>)
          }
          {
            !loading&&!items.length&&(<p>Sorry, no results.</p>)
          }
          {
            !loading&&this.props.data.searchArticle.map(searchArticle => (
              <div key={searchArticle.title} style={styles.container}>
              <p style={styles.title}>{searchArticle.title}</p>
              <p style={styles.description}>{searchArticle.article_id}</p>
              </div>
            ))
          }
          </div>
     )
   }
  }
  
  export default compose(
    graphql(searchArticle, {
      options: data => ({
        fetchPolicy: 'cache-and-network'
      }),
      props: props => ({
        onSearch: search_query => {
          search_query = search_query.toLowerCase()
          return props.data.fetchMore({
            query: search_query === '' ? Paging:searchArticle,
            variables: {
              search_query
            },
            updateQuery: (previousResult, { fetchMoreResult }) => ({
              ...previousResult,
              Paging: {
                ...previousResult.Paging,
                items: fetchMoreResult.Paging.items
              }
            })
          })
        },
        data: props.data
      })
    })
  )(Search);
  const styles = {
    container: {
      padding: 10,
      borderBottom: '1px solid #ddd'
    },
    title: {
      fontSize: 18
    },
    description: {
      fontSize: 15,
      color: 'rgba(0, 0, 0, .5)'
    },
    input: {
      height: 40,
      width: 300,
      padding: 7,
      fontSize: 15,
      outline: 'none'
    }
  }