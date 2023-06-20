import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,url,urlToImage} = this.props;
    return (
      <div>
            <div className="card m-2" >
                <img src={urlToImage?urlToImage:"https://www.aljazeera.com/wp-content/uploads/2023/06/33J2436-highres-1687063190.jpg?resize=1920%2C1440"} className="card-img-top" 
                alt="Resource not Found..!!"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={url} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read more...</a>
                </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
