import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from "react-router-dom";
import Search from './Search'
import ListBook from './ListBook'
import './App.css'

class BooksApp extends React.Component {
    state = {
        myBooks: [],
        searchedBooks: [],
    }
    componentDidMount() {
        this.getBooks()
    }

    getBooks = () => {
        BooksAPI
            .getAll()
            .then((myBooks) => {
                this.setState({myBooks})
            })
    }

    moveBook = (book, shelf) => {
        BooksAPI
            .update(book, shelf)
            .then((response) => {
                this.getBooks()
            });
    }

    search = (query) => {
        if (query.length > 0) {
            BooksAPI
                .search(query)
                .then((searchedBooks) => {
                    if (searchedBooks && searchedBooks.length > 0) {
                        searchedBooks.map(book =>
                            (this.state.myBooks.filter((b) => b.id === book.id)
                            .map(b => book.shelf = b.shelf))
                        )
                        this.setState({searchedBooks})
                    } else {
                        this.clearSearch()
                    }
                });
        } else {
            this.clearSearch();
        }
    }

    clearSearch = () => {
        this.setState({ query: '', searchedBooks: []})
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <Search searchedBooks={this.state.searchedBooks} onMoveBook={this.moveBook} onSearch={this.search} onClearSearch={this.clearSearch}/>
                )}/>

                <Route exact path='/' render={() => (
                    <ListBook books={this.state.myBooks} onMoveBook={this.moveBook}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
