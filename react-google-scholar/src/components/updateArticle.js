import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';

const UPDATE_ARTICLE_QUERY = gql`
    mutation updateArticle($article_id: ID!, $title: String!, $citedBy: String!, $citations: ID!, $pub_year: ID!, $eprint: String!, $pub_number: ID!, $pub_publisher: String!, $pub_url: String!, $journal: String!){
        updateArticle(
            article_id: $article_id,
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

const GET_ARTICLE_QUERY = gql`
  query ArticleQuery($article_id: ID!){
    Article (article_id : $article_id){
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
class updateArticle extends Component{
    render(){
        const {article_id} = this.props.match.params;
        return (
            <Query pollInterval={500} query={GET_ARTICLE_QUERY} variables={{article_id}}>{
                ({loading, error, data}) => {
                    if(loading) return <p>Loading...</p>;
                    if (error) return `Error! ${error.message}`;
                    let title,citedBy,citations,pub_year,eprint,pub_number,pub_publisher,pub_url,journal;
                    let input = {
                        article_id: article_id
                    };
                    return (
                        <Mutation mutation={UPDATE_ARTICLE_QUERY} 
                        key={article_id}
                        //onCompleted={() => window.location.replace("./create")}
                        //onCompleted={() => this.props.history.push('/')}
                        >
                        {(updateArticle, {loading, error}) =>(
                            <div className="container">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h1 className="panel-title">Edit Article</h1>
                                    </div>
                                    <div className="panel-boday">
                                        <h4><Link to={`/article/${article_id}`} className="btn btn-primary">Back</Link></h4>
                                        <form onSubmit={ e => {
                                             input ={
                                                 title: title.value,
                                                 citedBy: citedBy.value,
                                                 citations: citations.value,
                                                 pub_year: pub_year.value,
                                                 eprint: eprint.value,
                                                 pub_number: pub_number.value,
                                                 pub_publisher: pub_publisher.value,
                                                 pub_url:pub_url.value,
                                                 journal: journal.value,
                                                 article_id:article_id
                                             };
                                            e.preventDefault();
                                            updateArticle({variables: {title: title.value,
                                                citedBy: citedBy.value,
                                                citations: citations.value,
                                                pub_year: pub_year.value,
                                                eprint: eprint.value,
                                                pub_number: pub_number.value,
                                                pub_publisher: pub_publisher.value,
                                                pub_url:pub_url.value,
                                                journal: journal.value,
                                                article_id:article_id}});
                                            /*title.value = "";
                                            citedBy.value = "";
                                            citations.value = "";
                                            pub_year.value = "";
                                            eprint.value = "";
                                            pub_number.value = "";
                                            pub_publisher.value = "";
                                            pub_url.value = "";
                                            journal.value = "";*/
                                        }
                                        }>
                                        <div className="form-group">
                                            <label htmlFor="title">Title:</label>
                                                <input type="text" className="form-control"
                                                title="title" ref={node => {title = node;}}
                                                placeholder = "title"
                                                defaultValue={data.Article.title}
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="citedBy">CitedBy:</label>
                                                <input type="text" className="form-control"
                                                citedBy="citedBy" ref={node => {citedBy = node;}}
                                                placeholder = "citedBy"
                                                defaultValue={data.Article.citedBy}
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="citations">Citations:</label>
                                                <input type="text" className="form-control"
                                                citations="citations" ref={node => {citations = node;}}
                                                placeholder = "citations"
                                                defaultValue={data.Article.citations}
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pub_year">Pub_year:</label>
                                                <input type="text" className="form-control"
                                                pub_year="pub_year" ref={node => {pub_year = node;}}
                                                placeholder = "pub_year"
                                                defaultValue={data.Article.pub_year}
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="eprint">Eprint:</label>
                                                <input type="text" className="form-control"
                                                eprint="eprint" ref={node => {eprint = node;}}
                                                placeholder = "eprint"
                                                defaultValue={data.Article.eprint}
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pub_number">Pub_number:</label>
                                                <input type="text" className="form-control"
                                                pub_number="pub_number" ref={node => {pub_number = node;}}
                                                placeholder = "pub_number"
                                                defaultValue={data.Article.pub_number}
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pub_publisher">Pub_publisher:</label>
                                                <input type="text" className="form-control"
                                                pub_publisher="pub_publisher" ref={node => {pub_publisher = node;}}
                                                placeholder = "pub_publisher"
                                                defaultValue={data.Article.pub_publisher}
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pub_url">Pub_URL:</label>
                                                <input type="text" className="form-control"
                                                pub_url="pub_url" ref={node => {pub_url = node;}}
                                                placeholder = "pub_url"
                                                defaultValue={data.Article.pub_url}
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="journal">Journal:</label>
                                                <input type="text" className="form-control"
                                                journal="journal" ref={node => {journal = node;}}
                                                placeholder = "journal"
                                                defaultValue={data.Article.journal}
                                                />
                                        </div>
                                        <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                        {loading&&<p>Loading...</p>}
                                        {error&& <p>Error :( Please try again...</p>}
                                    </div>
                                </div>
                            </div>
                        ) 
                    }
                        </Mutation>
                    );
                }
            }
            </Query>
        );
    }
}
export default withRouter(updateArticle);