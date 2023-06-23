import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import Footer from './component/Footer';
import {
  BrowserRouter ,
  Route,
  Routes
} from "react-router-dom";
import About from './component/About';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_API;
  country = 'in';
  state = {
    progress: 0
  }
  setProgress = (progress) =>{
    this.setState({progress: progress});
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar/>
          <LoadingBar color='#f11946' progress={this.state.progress} />
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress}  key='general' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='general'/>}></Route>
            <Route exact path='business' element={<News setProgress={this.setProgress}  key='business' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='business'/>}></Route>
            <Route exact path='entertainment' element={<News setProgress={this.setProgress}  key='entertainment' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='entertainment'/>}></Route>
            <Route exact path='health' element={<News setProgress={this.setProgress}  key='health' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='health'/>}></Route>
            <Route exact path='science' element={<News setProgress={this.setProgress}  key='science' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='science'/>}></Route>
            <Route exact path='sports' element={<News setProgress={this.setProgress}  key='sports' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='sports'/>}></Route>
            <Route exact path='technology' element={<News setProgress={this.setProgress}  key='technology' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='technology'/>}></Route>
            <Route exact path='about' element={<About/>}></Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    )
  }
}
