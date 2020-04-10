import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";const Courses = () => (
  <Query
    query={gql`
      {
        Articles{
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
      if (error) return <p>Error :(</p>;      return data.allCourses.map(({ id, title, author, description, topic, url }) => (
        <div key={id}>
          <p>{`${title} by ${author}`}</p>
        </div>
      ));
    }}
  </Query>
);export default Courses;