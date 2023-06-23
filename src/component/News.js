import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  
   articles = [
    {
      "source": {
        "id": "al-jazeera-english",
        "name": "Al Jazeera English"
      },
      "author": "Al Jazeera",
      "title": "Russia-Ukraine war: List of key events, day 480 - Al Jazeera English",
      "description": "as the war enters its 480th day, these are the main developments.",
      "url": "https://www.aljazeera.com/news/2023/6/18/russia-ukraine-war-list-of-key-events-day-480",
      "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2023/06/33J2436-highres-1687063190.jpg?resize=1920%2C1440",
      "publishedAt": "2023-06-18T04:53:49Z",
      "content": "This is the situation as it stands on Sunday, June 18, 2023.\r\nFighting\r\n<ul><li>Ukrainian forces advanced in southern sectors of their counteroffensive, according to Ukrainian military officials, whi… [+2371 chars]"
    },
    {
      "source": {
        "id": "cbs-news",
        "name": "CBS News"
      },
      "author": "Patrick Damp, Lauren Linder",
      "title": "WVU's Bob Huggins resigns as head basketball coach following DUI arrest - CBS Pittsburgh",
      "description": "West Virginia University Men's Basketball Coach Bob Huggins announced his resignation and intent to retire less than 24 hours after Pittsburgh police charged him with DUI, a last straw after coming under fire for multiple recent incidents.",
      "url": "https://www.cbsnews.com/pittsburgh/news/wvu-basketball-head-coach-bob-huggins-resigns-arrested-pittsburgh-dui/",
      "urlToImage": "https://assets2.cbsnewsstatic.com/hub/i/r/2023/05/09/1c51e055-9771-4dc4-b121-d7f2295cbbd2/thumbnail/1200x630g2/cb88ec935f8f6f33aaf54d9356fd151b/gettyimages-1473967167-594x594.jpg?v=23da2bed74e9783333cf303fba619e89",
      "publishedAt": "2023-06-18T04:17:00Z",
      "content": "PITTSBURGH (KDKA) - West Virginia University Men's Basketball Coach Bob Huggins announced his resignation and intent to retire less than 24 hours after Pittsburgh police charged him with DUI, a last … [+4950 chars]"
    }
  ]

  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 9
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }

  constructor(){
    super();
    this.state = {
      articles : this.articles,
      loading : true,
      page : 1,
      totalResults: 0,
      length: 9,
      scroll :true
    }
  }

  async updatePage(){
    // this.setState({loading:true});
    this.props.setProgress(10);
    let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
    let data = await fetch(newsApiUrl);
    this.props.setProgress(70);
    let parseData = await data.json();
    this.setState({articles : parseData.articles?parseData.articles:this.articles,totalResults: parseData.totalResults,loading:false});
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updatePage();
  }

  nextBtnClick = async() => {
    this.setState({page: this.state.page + 1});
    this.updatePage();
  }
  
   prevBtnClick= async() =>{
    this.setState({page: this.state.page - 1});
    this.updatePage();
  }

  fetchData = async() =>{
    this.setState({page: this.state.page + 1});
    let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&page=${this.state.page+1}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
    console.log('fetchData url '+ newsApiUrl );
    let data = await fetch(newsApiUrl);
    let parseData = await data.json();
    this.setState({articles : this.state.articles.concat(parseData.articles?parseData.articles:this.state.articles),totalResults: parseData.totalResults,loading:false,length: this.state.length+this.props.pageSize});
    if(this.state.length >= this.state.totalResults){
      this.state.scroll = false;
    }
    
  }

  render() {
    return (
      <>
        <h1 className='text-center text-capitalize'>Today's {this.props.category} News</h1>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.length } //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.scroll}
          loader={<Spinner/>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          <div className="container">
            <div className="row" >
              { this.state.articles.map((ele)=>{
                return <div className="col-md-4" key={ele.url}>
                        <NewsItem  className='col-md-4' title={ele.title} source={ele.source} description={ele.description} url={ele.url} urlToImage={ele.urlToImage} publishedAt={new Date(ele.publishedAt).toUTCString()} author={ele.author} />
                      </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-2">
          <button type="button" className="btn btn-dark" disabled={this.state.page<= 1} onClick={this.prevBtnClick}>Previous</button>
          <button type="button" className="btn btn-dark" disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.nextBtnClick}>Next</button>
        </div> */}
      </>
    )
  }
}

export default News
