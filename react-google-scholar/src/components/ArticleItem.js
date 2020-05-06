import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
export default function ArticleItem({Paging:{article_id,
    title, 
    citedBy, 
    citations, 
    pub_year, 
    eprint, 
    pub_number, 
    pub_publisher, 
    pub_url, 
    journal}}){
    return <div className="card card-body mb-3">
    <div className="row">
    <div className="col-md-9">
        <h4>Articles:{''}
        <span className={classNames({
            'text-success':pub_url,
            'text-danger':!pub_url
        })}
        >
        {title}</span></h4>
        <p>CitedBy: {citedBy}</p>
    </div>
    <div className="col-md-3">
        <Link to={`/article/${article_id}`} className="btn btn-primary">Article Details</Link>
    </div>
    </div>
    </div>
}