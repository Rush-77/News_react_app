import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  render() {
    return (
      <div className='container my-4'>
        <h1>Today's News</h1>
        <div className="row">
            <NewsItem className='col-md-4'/>
            <NewsItem className='col-md-4'/>
            <NewsItem className='col-md-4'/>
        </div>
      </div>
    )
  }
}

export default News
