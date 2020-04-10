const graphql = require("graphql");
const sqlite3 = require('sqlite3').verbose();

//create a database if no exists
const database = new sqlite3.Database("../cs411project.db");

const createPostTable = () => {
    const  query  =  `
        CREATE TABLE IF NOT EXISTS Article (
        article_id integer PRIMARY KEY,
        title text,
        citedBy text,
        citations integer,
        pub_year integer
        eprint text,
        pub_number integer,
        pub_publisher text,
        pub_url text,
        journal text)`;

    return  database.run(query);
}

//init table - commented out for now
createPostTable();



//creacte graphql post object
const PostType = new graphql.GraphQLObjectType({
    name: "Article",
    fields: {
        article_id: { type: graphql.GraphQLID },
        title: { type: graphql.GraphQLString },
        citedBy: { type: graphql.GraphQLString },
        citations: { type: graphql.GraphQLID },
        pub_year: { type: graphql.GraphQLID },
        eprint: { type: graphql.GraphQLString },
        pub_number: { type: graphql.GraphQLID },
        pub_publisher: { type: graphql.GraphQLString },
        pub_url: { type: graphql.GraphQLString },
        journal: { type: graphql.GraphQLString }   
    }
});


/* 
query{
  Articles
  {
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
*/

// create a graphql query to select all and by id
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        //first query to select all
        Articles: {
            type: graphql.GraphQLList(PostType),
            resolve: (root, args, context, info) => {
                return new Promise((resolve, reject) => {
                    // raw SQLite query to select from table
                    database.all("SELECT * FROM Article;", function(err, rows) {  
                        if(err){
                            reject([]);
                        }
                        resolve(rows);
                    });
                });
            }
        },
        //second query to select by id
        Article:{
            type: PostType,
            args:{
                article_id:{
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }               
            },
            resolve: (root, {article_id}, context, info) => {
                return new Promise((resolve, reject) => {
                
                    database.all("SELECT * FROM Article WHERE article_id = (?);",[article_id], function(err, rows) {                           
                        if(err){
                            reject(null);
                        }
                        resolve(rows[0]);
                    });
                });
            }
        }
    }
});

/*
mutation {
  createArticle(
    title: "test title", 
    citedBy: "test citedby", 
    citations:69, 
    pub_year:1969, 
    eprint:"test eprint", 
    pub_number:420, 
    pub_publisher:"test pub_publisher", 
    pub_url:"test pub_url", 
    journal:"test journal")
  {
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
*/

//mutation type is a type of object to modify data (INSERT,DELETE,UPDATE)
var mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      //mutation for creacte
      createArticle: {
        //type of object to return after create in SQLite
        type: PostType,
        //argument of mutation creactePost to get from request
        args: {
            title: {
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            citedBy:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            citations:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLID)
            },
            pub_year:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLID)
            },
            eprint:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            pub_number:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLID)
            },
            pub_publisher:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            pub_url:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            journal:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            }
        },
        resolve: (root, {title, citedBy, citations, pub_year, eprint, pub_number, pub_publisher, pub_url, journal}) => {
            return new Promise((resolve, reject) => {
                //raw SQLite to insert a new post in post table
                database.run('INSERT INTO Article (title, citedBy, citations, pub_year, eprint, pub_number, pub_publisher, pub_url, journal) VALUES (?,?,?,?,?,?,?,?,?);', [title, citedBy, citations, pub_year, eprint, pub_number, pub_publisher, pub_url, journal], (err) => {
                    if(err) {
                        reject(null);
                    }
                    database.get("SELECT last_insert_rowid() as article_id", (err, row) => {
                        //TODO if unnecessary stuff prints delete
                        resolve({
                            article_id: row["article_id"],
                            title: title, 
                            citedBy: citedBy, 
                            citations: citations, 
                            pub_year: pub_year, 
                            eprint: eprint, 
                            pub_number: pub_number, 
                            pub_publisher: pub_publisher, 
                            pub_url: pub_url, 
                            journal: journal
                        });
                    });
                });
            })
        }
      },

      /*
        mutation {
            updateArticle(
                article_id: 10001,
                title: "updated title", 
                citedBy: "",
                citations: 100, 
                pub_year:2020, 
                eprint:"updated eprint", 
                pub_number:2019, 
                pub_publisher:"updated pub_publisher", 
                pub_url:"updated pub_url", 
                journal:"updated journal"
            )
        }
      */
      //mutation for update
      updateArticle: {
        //type of object to return afater update in SQLite
        type: graphql.GraphQLString,
        //argument of mutation creactePost to get from request
        args:{
            article_id:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLID)
            },
            title: {
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            citedBy:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            citations:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLID)
            },
            pub_year:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLID)
            },
            eprint:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            pub_number:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLID)
            },
            pub_publisher:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            pub_url:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            journal:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            }         
        },
        resolve: (root, {article_id, title, citedBy, citations, pub_year, eprint, pub_number, pub_publisher, pub_url, journal}) => {
            return new Promise((resolve, reject) => {
                //raw SQLite to update a post in post table
                database.run('UPDATE Article SET title = (?), citedBy = (?), citations = (?), pub_year = (?),eprint = (?), pub_number = (?), pub_publisher = (?), pub_url = (?), journal = (?) WHERE article_id = (?);', [title, citedBy, citations, pub_year, eprint, pub_number, pub_publisher, pub_url, journal, article_id], (err) => {
                    if(err) {
                        reject(err);
                    }
                    //TODO if unnecessary stuff prints delete
                    resolve(`Post #${article_id} updated`);
                });
            })
        }
      },
      //mutation for delete
      deleteArticle: {
         //type of object resturn after delete in SQLite
        type: graphql.GraphQLString,
        args:{
            article_id:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLID)
            }               
        },
        resolve: (root, {article_id}) => {
            return new Promise((resolve, reject) => {
                //raw query to delete from post table by article_id
                database.run('DELETE from Article WHERE article_id =(?);', [article_id], (err) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(`Post #${article_id} deleted`);                    
                });
            })
        }
      }
    }
});

//define schema with post object, queries, and mustation 
const schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType 
});

//export schema to use on index.js
module.exports = {
    schema
}