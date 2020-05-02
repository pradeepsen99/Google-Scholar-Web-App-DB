var _ = require('lodash');

var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'cs411'));

// TODO: test
function neo4jCreateArticle(title, pub_year, cited_by){
  console.log('creating article node in Neo4j');
  var session = driver.session();
  return session
    .run(
      "CREATE (article:Article {title: $title, pub_year: $pub_year, cited_by: $cited_by })", {title, pub_year, cited_by}
    )
    .then(result => {
      session.close();
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

// TODO: test
function neo4jCreateAuthor(author_name, cited_by){
  console.log('creating author node in Neo4j');
  var session = driver.session();
  return session
    .run(
      "CREATE (author:Author {author_name: $author_name, cited_by: $cited_by })", {author_name, cited_by}
    )
    .then(result => {
      session.close();
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

// TODO: test
function neo4jUpdateArticle(article_id, title, pub_year, cited_by){
  console.log('updating article node in Neo4j');
  var session = driver.session();
  return session
    .run(
      "MATCH (article:Article) \
      WHERE article.article_id = $article_id \
      SET article = {title: $title, pub_year: $pub_year, cited_by: $cited_by } \
      RETURN article.article_id, article.title, article.pub_year, article.cited_by", {article_id, title, pub_year, cited_by}
    )
    .then(result => {
      session.close();
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

// TODO: test
function neo4jUpdateAuthor(author_id, author_name, cited_by){
  console.log('updating author node in Neo4j');
  var session = driver.session();
  return session
    .run(
      "MATCH (author:Author) \
      WHERE author.author_id = $author_id \
      SET author = {author_name: $author_name, cited_by: $cited_by } \
      RETURN author.author_id, author.author_name, author.cited_by", {author_id, author_name, cited_by}
    )
    .then(result => {
      session.close();
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

// TODO: test
function neo4jDeleteArticle(article_id){
  console.log('deleting article node in Neo4j');
  var session = driver.session();
  return session
    .run(
      "MATCH (article:Article) \
      WHERE article.article_id = $article_id \
      DETACH DELETE article", {article_id}
    )
    .then(result => {
      session.close();
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

// TODO: test
function neo4jDeleteAuthor(author_id){
  console.log('deleting author node in Neo4j');
  var session = driver.session();
  return session
    .run(
      "MATCH (author:Author) \
      WHERE author.author_id = $author_id \
      DETACH DELETE author", {author_id}
    )
    .then(result => {
      session.close();
    })
    .catch(error => {
      session.close();
      throw error;
    });
}


function getArticles(article_id) {
    console.log('running getArticles()');
    var session = driver.session();
    return session
      .run(
        "MATCH (article1:Article)<-[:AUTHORED]-(author:Author)-[:AUTHORED]->(article:Article) \
        WHERE article.article_id = $article_id \
        RETURN article1.title AS name", {article_id}
        // "MATCH (author:Author) \ 
        // RETURN author.author_name AS name \
        // LIMIT 10"
        //"MATCH (article:Article) RETURN article.title AS name LIMIT 10"
        )
      .then(result => {
        session.close();
  
        if (_.isEmpty(result.records)){
          console.log('result is empty for some reason');
          return null;
        }
  
        var names = [];
        result.records.forEach(res => {
            names.push(res.get('name'));
        })
        console.log(names);
        return names;
      })
      .catch(error => {
        session.close();
        throw error;
      });
}


function getGraph(article_id) {
    var session = driver.session();
    return session.run(
        "MATCH (author:Author)-[:AUTHORED]->(article:Article) \
        WHERE article.article_id = '$article_id' \
        RETURN author.author_name AS name, collect(article.title) AS title \
        LIMIT 10", {article_id})
        .then(results => {
            session.close();
            var nodes = [], rels = [], i = 0;
            results.records.forEach(res => {
                nodes.push({title: res.get('name'), label: 'author'});
                var target = i;
                i++;
  
                res.get('title').forEach(name => {
                    var article = {title: name, label: 'article'};
                    var source = _.findIndex(nodes, article);
                    if (source == -1) {
                        nodes.push(article);
                        source = i;
                        i++;
                    }
                    rels.push({source, target})
                })
            });
  
            return {nodes, links: rels};
        }
    );
}

exports.neo4jCreateArticle = neo4jCreateArticle;
exports.neo4jCreateAuthor = neo4jCreateAuthor;
exports.neo4jUpdateArticle = neo4jUpdateArticle;
exports.neo4jUpdateAuthor = neo4jUpdateAuthor;
exports.neo4jDeleteArticle = neo4jDeleteArticle;
exports.neo4jDeleteAuthor = neo4jDeleteAuthor;
exports.getArticles = getArticles;
exports.getGraph = getGraph;