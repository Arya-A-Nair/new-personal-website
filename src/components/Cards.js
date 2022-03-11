import React from 'react'

const Cards = ({data}) => {
    if(data.id%2===0){
        return (
        <a href={data.link} target="_blank" rel="noreferrer">
            <div className="tile odd">
                <div className="title">{data.title}</div>
                <div className="text">{data.text}</div>
            </div>
        </a>
        )
    }
    else{
        return (
            <a href={data.link} target="_blank" rel="noreferrer">
                <div className="tile even">
                    <div className="title">{data.title}</div>
                    <div className="text">{data.text}</div>
                </div>
            </a>
            )
    }
}

export default Cards;
