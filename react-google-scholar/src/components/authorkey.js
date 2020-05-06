import React from 'react';

export default function AuthorKey(){
    return (
        <div className="my-3">
            <p>
                <span className="px-3 mr-2 bg-success" /> = Num_pub is greater than 100
            </p>
            <p>
                <span className="px-3 mr-2 bg-danger" /> = Num_pub is less than 100
            </p>
        </div>
    )
}