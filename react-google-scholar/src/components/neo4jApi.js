var _ = require('lodash');

var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'cs411'));

function getArticles(article_id) {
    console.log('running getArticles()');
    var session = driver.session();
    return session
      .run(
        // "MATCH (article1:Article)<-[:AUTHORED]-(author:Author)-[:AUTHORED]->(article:Article) \
        // WHERE article.title = '$article_id' \
        // RETURN article1.title AS title", {article_id}
        // "MATCH (author:Author) \ 
        // RETURN author.author_name AS name \
        // LIMIT 10"
        "MATCH (author:Author) RETURN author.author_name AS name LIMIT 10"
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

exports.getArticles = getArticles;
exports.getGraph = getGraph;