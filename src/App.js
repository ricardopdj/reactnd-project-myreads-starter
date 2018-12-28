import React from 'react'
import * as BooksAPI from './BooksAPI'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Search from './Search'
import ListBook from './ListBook'
import './App.css'

class BooksApp extends React.Component {
    state = {
        myBooks: [],
        searchBooks: []
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

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <Search books={this.state.myBooks} onMoveBook={this.moveBook}/>
                )}/>

                <Route exact path='/' render={() => (
                    <ListBook books={this.state.myBooks} onMoveBook={this.moveBook}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
