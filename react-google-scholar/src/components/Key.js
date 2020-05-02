import React from 'react';

export default function Key(){
    return (
        <div className="my-3">
            <p>
                <span className="px-3 mr-2 bg-success" /> = With a pub_url
            </p>
            <p>
                <span className="px-3 mr-2 bg-danger" /> = Without a pub_url
            </p>
        </div>
    )
}