import React, {Component, Fragment} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import * as d3 from "d3";
import $ from "jquery";

var neo4japi = require('./neo4jApi');

function showArticles(article_id) {
  neo4japi
    .getArticles(article_id)
    .then(article_list => {
      if (!article_list) return;

      var $list = $("#articleList").empty();
      article_list.forEach(addToList);

      function addToList(item, index) {
        $list.append($('<li>' + item + "</li>"));
      }
    }, "json");
}


/*
function renderGraph(article_id) {
    var width = 200, height = 200;
    var force = d3.layout.force()
      .charge(-200).linkDistance(30).size([width, height]);
  
    var svg = d3.select("#graph").append("svg")
      .attr("width", "20%").attr("height", "20%")
      .attr("pointer-events", "all");
  
    neo4japi
      .getGraph(article_id)
      .then(graph => {
        force.nodes(graph.nodes).links(graph.links).start();
  
        var link = svg.selectAll(".link")
          .data(graph.links).enter()
          .append("line").attr("class", "link");
  
        var node = svg.selectAll(".node")
          .data(graph.nodes).enter()
          .append("circle")
          .attr("class", d => {
            return "node " + d.label
          })
          .attr("r", 10)
          .call(force.drag);
  
        // html title attribute
        node.append("title")
          .text(d => {
            return d.title;
          });
  
        // force feed algo ticks
        force.on("tick", () => {
          link.attr("x1", d => {
            return d.source.x;
          }).attr("y1", d => {
            return d.source.y;
          }).attr("x2", d => {
            return d.target.x;
          }).attr("y2", d => {
            return d.target.y;
          });
  
          node.attr("cx", d => {
            return d.x;
          }).attr("cy", d => {
            return d.y;
          });
        });
      });
  }
*/

const ARTICLE_QUERY = gql`
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
export class article extends Component {
    render(){
        let {article_id} = this.props.match.params;
        showArticles(article_id);
        return (
            <Fragment>
                <Query query={ARTICLE_QUERY} variables={{article_id}}>{
                    ({loading, error, data}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return `Error! ${error.message}`;
                        const {title, citedBy, citations, pub_year, eprint, pub_number, pub_publisher, pub_url, journal} = data.Article;
                        return <div>
                            <h1 className="display-4 my-3">
                                <span className="text-dark">Google Scholar:</span>
                                    {title}
                            </h1>
                            <h4 className="mb-3">Scholar Details</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Article ID: {article_id}
                                    </li>
                                    <li className="list-group-item">
                                        Title: {title}
                                    </li>
                                    <li className="list-group-item">
                                        CitedBy: {citedBy}
                                    </li>
                                    <li className="list-group-item">
                                        Citations: {citations}
                                    </li>
                                </ul>
                            <h4 className="mb-3">Pub Details</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        pub_year: {pub_year}
                                    </li>
                                    <li className="list-group-item">
                                        eprint: {eprint}
                                    </li>
                                    <li className="list-group-item">
                                        pub_number: {pub_number}
                                    </li>
                                    <li className="list-group-item">
                                        pub_publisher: {pub_publisher}
                                    </li>
                                    <li className="list-group-item">
                                        pub_url: {' '}
                                        <span 
                                        className={classNames({
                                            'text-success':pub_url,
                                            'text-danger':!pub_url
                                        })}>
                                       {pub_url?pub_url:"Unavailable"}
                                        </span>
                                    </li>
                                    <li className="list-group-item">
                                        Journal : {journal}
                                    </li>
                                </ul>
                            <h4 className="mb-3">Related Articles</h4>
                                <ul className="list-group" id="articleList">
                                </ul>
                                <hr />
                                <Link to={`/update/${article_id}`} className="btn btn-primary">
                                Update
                                </Link>
                                <hr />
                                <Link to={`/delete/${article_id}`} className="btn btn-primary">
                                Delete
                                </Link>
                                <hr />
                                <Link to="/" className="btn btn-primary">
                                Back
                                </Link>
                        </div>
                        
                    }
                }
                </Query>
            </Fragment>
        );
    }
} 
export default article;