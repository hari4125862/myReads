import React,{Component} from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom' ;
import {debounce} from 'lodash';

class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state={
            query:'',
            searchedBooks:[]
        }
    }

    updateQuery= debounce(query =>{
        this.setState({
            query: query
        });
        this.updateSearchedBooks(query);
    },1000);

    updateSearchedBooks=(query)=>{
        if(query){
            BooksAPI.search(query).then((searchedBooks) =>{
                if(searchedBooks.error)
                    this.setState({searchedBooks:[]});
                else if(query==this.state.query)                   
                    this.setState({searchedBooks: searchedBooks});
            })
        } else
            this.setState({searchedBooks:[]});
    }
    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                    <input type="text"
                        placeholder="Search by title or author"
                        onChange={(event)=> this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchedBooks.map(searchedBook =>(
                            <li key={searchedBook.id}>
                                <Book book={searchedBook} moveShelf={this.props.moveShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}
export default SearchPage;
