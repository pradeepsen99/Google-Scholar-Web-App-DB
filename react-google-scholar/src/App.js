import React from 'react';
import './App.css';
import Articles from "./components/Articles"
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import article from './components/a';
import createArticle from './components/createArticle';
import deleteArticle from './components/deleteArticle';
import updateArticle from './components/updateArticle';
import Trends from './components/Trends';
import Articles2 from './Pagination/page2';
import Articles3 from './Pagination/page3';
import Articles4 from './Pagination/page4';
import Articles5 from './Pagination/page5';
import Articles6 from './Pagination/page6';
import Articles7 from './Pagination/page7';
import Articles8 from './Pagination/page8';
import Articles9 from './Pagination/page9';
import Articles10 from './Pagination/page10';
import Articles11 from './Pagination/page11';
import Search from './components/search';
import authorPub from './components/authorpub';
const client = new ApolloClient({
  introspection: true,
  uri: "http://localhost:4000/graphql"
});


const App = () => (
  <ApolloProvider client={client}>
  <Router>
    <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
  <a class="navbar-brand" href="/">Team Ace: Google Scholar Project</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/create">Create</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/trends">Trends</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/search">Search</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/authorpub">AuthorPub</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0" >
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <Link to='./search' className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</Link>
       </form>
      </div>
    </nav>

   
        <Route exact path="/" component={Articles} />
        <Route exact path="/article/:article_id" component={article} />
        <Route exact path="/create" component={createArticle} />
        <Route exact path="/trends" component={Trends} />
        <Route exact path="/delete/:article_id" component={deleteArticle} />
        <Route exact path="/update/:article_id" component={updateArticle} />
        <Route exact path="/page2" component={Articles2} />
        <Route exact path="/page3" component={Articles3} />
        <Route exact path="/page4" component={Articles4} />
        <Route exact path="/page5" component={Articles5} />
        <Route exact path="/page6" component={Articles6} />
        <Route exact path="/page7" component={Articles7} />
        <Route exact path="/page8" component={Articles8} />
        <Route exact path="/page9" component={Articles9} />
        <Route exact path="/page10" component={Articles10} />
        <Route exact path="/page11" component={Articles11} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/authorpub" component={authorPub} />
        
    </div>
    </Router>
  </ApolloProvider>
);

export default App;

