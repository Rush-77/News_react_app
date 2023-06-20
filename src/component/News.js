import React, { Component } from 'react'
import NewsItem from './NewsItem'

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
    },
    {
      "source": {
        "id": null,
        "name": "YouTube"
      },
      "author": null,
      "title": "Spotify boss slams Harry and Meghan after podcast fallout | 9 News Australia - 9 News Australia",
      "description": "Spotify executive Bill Simmons has unleashed on the Duke and Duchess of Sussex following the fallout of their multi-million dollar podcast deal. Subscribe an...",
      "url": "https://www.youtube.com/watch?v=Je0r208hkVU",
      "urlToImage": "https://i.ytimg.com/vi/Je0r208hkVU/maxresdefault.jpg",
      "publishedAt": "2023-06-18T03:57:11Z",
      "content": null
    }
  ]

  constructor(){
    super();
    this.state = {
      articles : this.articles,
      loading : false,
      page : 1
    }
  }

  async componentDidMount(){
    console.log('inside componentDidMount' + this.state.page);
    let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=business&page=${this.state.page}&pageSize=18&apiKey=cba0f09a4f3544da9d9d821d621e6af5`;
    let data = await fetch(newsApiUrl);
    let parseData = await data.json();
    this.setState({articles : parseData.articles,totalResults: parseData.totalResults});
  }
 
  // btnClick = async (stsFlag) =>{
  //   if(stsFlag){
  //     console.log('cal ' + Math.ceil(this.state.totalResults/18) + ' page ' + this.state.page);
  //     if(this.state.page < Math.ceil(this.state.totalResults/18)){
  //       console.log('inside page1 ' + this.state.page);
  //       this.setState({page:this.state.page + 1});
  //       console.log('inside page2 ' + this.state.page);
  //     }
  //     // console.log('page' + this.state.page);
  //   }else{
  //     // console.log('flag ' + stsFlag);
  //     this.setState({page:this.state.page - 1});
  //     console.log('page' + this.state.page);
  //   }
  //   console.log('page' + this.state.page);
  //   let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=business&page=${this.state.page}&pageSize=18&apiKey=cba0f09a4f3544da9d9d821d621e6af5`;
  //   console.log(newsApiUrl);
  //   let data = await fetch(newsApiUrl);
  //   let parseData = await data.json();
  //   this.setState({articles : parseData.articles});
  // }

  nextBtnClick = async() => {
    console.log('page' + this.state.page);
    if(this.state.page < Math.ceil(this.state.totalResults/18)){
      let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=business&page=${this.state.page + 1}&pageSize=18&apiKey=cba0f09a4f3544da9d9d821d621e6af5`;
      let data = await fetch(newsApiUrl);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles : parseData.articles
      });
    }
  }
  
   prevBtnClick= async() =>{
    console.log('page' + this.state.page);
    let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=business&page=${this.state.page - 1}&pageSize=18&apiKey=cba0f09a4f3544da9d9d821d621e6af5`;
    let data = await fetch(newsApiUrl);
    let parseData = await data.json();
    this.setState({page: this.state.page - 1,articles : parseData.articles});
  }

  render() {
    return (
      <div className='container my-4'>
        <h1>Today's Business News</h1>
        <div className="row" >
          {this.state.articles.map((ele)=>{
            return <div className="col-md-4" key={ele.url}>
                    <NewsItem  className='col-md-4' title={ele.title} description={ele.description} url={ele.url} urlToImage={ele.urlToImage} />
                  </div>
          })}
        </div>
        <div className="container d-flex justify-content-between my-2">
          {/* <button type="button" className="btn btn-dark" disabled={this.state.page<= 1} onClick={() => this.btnClick(0)}>Previous</button>
          <button type="button" className="btn btn-dark" onClick={() => this.btnClick(1)}>Next</button> */}

          <button type="button" className="btn btn-dark" disabled={this.state.page<= 1} onClick={this.prevBtnClick}>Previous</button>
          <button type="button" className="btn btn-dark" disabled={this.state.page >= Math.ceil(this.state.totalResults/18)} onClick={this.nextBtnClick}>Next</button>
        </div>
      </div>
    )
  }
}

export default News
