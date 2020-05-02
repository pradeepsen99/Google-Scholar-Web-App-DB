import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation} from 'react-apollo';

var neo4japi = require('./neo4jApi');

const DELETE_ARTICLE_QUERY = gql`
    mutation deleteArticle($article_id: ID!){
        deleteArticle(
            article_id: $article_id
        )
    }
`;

class deleteArticle extends Component{
    deleteArticle(mutation){
        if(window.confirm('Are you sure to delete?')){
            mutation()
        }
    }
    render(){
        let {article_id} = this.props.match.params;
        //neo4japi.neo4jDeleteArticle(article_id);
        return(
            <div className="edit-btn-container">
                <Mutation 
                mutation = { DELETE_ARTICLE_QUERY } 
                variables = { { article_id } } 
                onCompleted = { () => window.location.replace("../")}>
                {postMutation => <button onClick={ () => this.deleteArticle(postMutation)} className="btn btn-primary">DELETE</button>}               
                </Mutation> 
            </div>
        )
    }
}
export default deleteArticle;