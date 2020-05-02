import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation, graphql } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';

const CREATE_ARTICLE_QUERY = gql`
    mutation createArticle($title: String!, $citedBy: String!, $citations: ID!, $pub_year: ID!, $eprint: String!, $pub_number: ID!, $pub_publisher: String!, $pub_url: String!, $journal: String! ){
        createArticle(
            title: $title, 
            citedBy: $citedBy, 
            citations: $citations, 
            pub_year: $pub_year, 
            eprint: $eprint, 
            pub_number: $pub_number, 
            pub_publisher: $pub_publisher, 
            pub_url: $pub_url, 
            journal: $journal
        )
        
    }
`;

class createArticle extends Component{
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          age: null,
        };
      }
      myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
      shoot(){
          alert("submit sucessfully!");
      }
      render() {
          let header ='';
          if(this.state.username){
              header = <h1>Hello {this.state.username}</h1>;
          }
          else{
              header = <h1>Hello stranger</h1>;
          }
        return (
          <form>
          {header}
          <p>Enter your name:</p>
          <input
            type='text'
            name='username'
            placeholder="the username"
            onChange={this.myChangeHandler}
          />
          <p>Enter your age:</p>
          <input
            type='text'
            name='age'
            placeholder="the age of user"
            onChange={this.myChangeHandler}
          />
          <hr />
          <button onClick={this.shoot}>Submit</button>
          </form>
          
        );
      }
}
export default createArticle;