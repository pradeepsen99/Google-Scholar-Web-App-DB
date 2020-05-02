import gql from 'graphql-tag';

export const CREATE_ARTICLE_QUERY = gql`
    mutation createArticle($title: String!, $citedBy: String!, $citations: ID!, pub_year: ID!, eprint: String!, pub_number: ID!, pub_publisher: String!, pub_url: String!, journal: String! ){
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
export const UPDATE_ARTICLE_QUERY = gql`
    mutation updateArticle($article_id: ID!, $title: String!, $citedBy: String!, $citations: ID!, pub_year: ID!, eprint: String!, pub_number: ID!, pub_publisher: String!, pub_url: String!, journal: String!){
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
export const DELETE_ARTICLE_QUERY = gql`
    mutation deleteArticle($article_id: ID!){
        deleteArticle(
            article_id: $article_id
        )
    }
`;