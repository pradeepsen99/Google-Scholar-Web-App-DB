import React from 'react';const Article = (props) => (
    <div className="card" style={{'width': '100%', 'marginTop': '10px'}}>
        <div className="card-body">
        <h5 className="card-title">{props.article.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">by {props.article.citedBy}</h6>
        <p className="card-text">{props.article.pub_publisher}</p>
        </div>
    </div>
);export default Article;