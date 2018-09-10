import React from 'react'
import SearchPage from './SearchPage.js';
import MainPage from './MainPage.js';
 import * as BooksAPI from './BooksAPI'
 import {Route} from 'react-router-dom';
import './App.css'
import './BooksAPI.js'




class BooksApp extends React.Component {
 state={
   books:[]
 }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books: books})
    }
  
  )
  }

  moveShelf=(book,shelf)=>{
    BooksAPI.update(book,shelf);
    BooksAPI.getAll().then((books)=>{
      this.setState({books: books})
    }
  
  )
  }

  render() {
    return (
      <div className="app">

      <Route exact path="/" render={()=>(
          <MainPage      
          books={this.state.books}
          moveShelf={this.moveShelf}
          />
      )}/>


       <Route exact path="/search" render={()=>(
          <SearchPage
          moveShelf={this.moveShelf}

    />
      )}/>
    

     
      </div>
    );
  }
}

export default BooksApp
