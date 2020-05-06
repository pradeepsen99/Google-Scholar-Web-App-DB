import React from 'react';
import classNames from 'classnames';
export default function Authoritem({authorPub:{
    author_id,
    author_name,
    num_pubs
}}){
    return <div className="card card-body mb-3">
    <div className="col-md-9">
        <h4>Authors:
        <span className={classNames({
            'text-success':(num_pubs>100),
            'text-danger':!(num_pubs>100)
        })}
        >
        {author_name}</span></h4>
        <p>Author_ID: {author_id}</p>
        <p>Num_pubs: {num_pubs}</p>
    </div>
    </div>
}