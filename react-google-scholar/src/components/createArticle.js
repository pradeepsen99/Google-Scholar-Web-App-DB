import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Mutation} from 'react-apollo';
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

    render(){
      let title, citedBy, citations, pub_year, eprint, pub_number, pub_publisher, pub_url, journal;
      let input = {
        title: '',
        citedBy: '',
        citations: '',
        pub_year: '',
        eprint: '',
        pub_number: '',
        pub_publisher: '',
        pub_url: '',
        journal: ''
      }
      console.log(input);
      return(
        <Mutation
          mutation={CREATE_ARTICLE_QUERY}
          key = {{title, citedBy, citations, pub_year, eprint, pub_number, pub_publisher, pub_url, journal}}
          
          onCompleted={() => window.location.reload()}
        >
        {(createArticle, {data, loading, error}) => (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Create Article</h3>
              </div>
                <div className="panel-body">
                  <h4><Link to="/" className="btn btn-primary">Back</Link></h4>
                    <form onSubmit={e=>{
                      input = {
                        title: title.value,
                        citedBy: citedBy.value,
                        citations: citations.value,
                        pub_year: pub_year.value,
                        eprint: eprint.value,
                        pub_number: pub_number.value,
                        pub_publisher: pub_publisher.value,
                        pub_url:pub_url.value,
                        journal: journal.value
                      };
                      console.log(input);
                      console.log(data);
                      e.preventDefault();
                      createArticle({variables: {title: title.value,
                        citedBy: citedBy.value,
                        citations: citations.value,
                        pub_year: pub_year.value,
                        eprint: eprint.value,
                        pub_number: pub_number.value,
                        pub_publisher: pub_publisher.value,
                        pub_url:pub_url.value,
                        journal: journal.value,
                        }});
                      // createArticle({variables:{input}});
                    }}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control"
                            title="title" ref={node => {title = node;}}
                            placeholder = "title"
                            defaultValue={''}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="citedBy">CitedBy:</label>
                            <input type="text" className="form-control"
                            citedBy="citedBy" ref={node => {citedBy = node;}}
                            placeholder = "citedBy"
                            defaultValue={''}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="citations">Citations:</label>
                            <input type="text" className="form-control"
                            citations="citations" ref={node => {citations = node;}}
                            placeholder = "citations"
                            defaultValue={''}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pub_year">Pub_year:</label>
                            <input type="text" className="form-control"
                            pub_year="pub_year" ref={node => {pub_year = node;}}
                            placeholder = "pub_year"
                            defaultValue={''}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eprint">Eprint:</label>
                            <input type="text" className="form-control"
                            eprint="eprint" ref={node => {eprint = node;}}
                            placeholder = "eprint"
                            defaultValue={''}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pub_number">Pub_number:</label>
                            <input type="text" className="form-control"
                            pub_number="pub_number" ref={node => {pub_number = node;}}
                            placeholder = "pub_number"
                            defaultValue={''}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pub_publisher">Pub_publisher:</label>
                            <input type="text" className="form-control"
                            pub_publisher="pub_publisher" ref={node => {pub_publisher = node;}}
                            placeholder = "pub_publisher"
                            defaultValue={''}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pub_url">Pub_URL:</label>
                            <input type="text" className="form-control"
                            pub_url="pub_url" ref={node => {pub_url = node;}}
                            placeholder = "pub_url"
                            defaultValue={''}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="journal">Journal:</label>
                            <input type="text" className="form-control"
                            journal="journal" ref={node => {journal = node;}}
                            placeholder = "journal"
                            defaultValue={''}
                            />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {loading&&<p>Loading...</p>}
                    {error&&<p>Error:( Please try again</p>}
                </div>
            </div>
          </div>
        )

        }
        </Mutation>
      )
    }
}
export default withRouter(createArticle);