import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import Shelf from './Shelf'

class ListBook extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }

    render() {
        const { books, onMoveBook } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Shelf
                        key={1}
                        id="shelf-1"
                        title="Currently Reading"
                        books={books.filter((book) => (book.shelf === "currentlyReading"))}
                        onMoveBook={onMoveBook}/>
                    <Shelf
                        key={2}
                        id="shelf-2"
                        title="Want to Read"
                        books={books.filter((book) => (book.shelf === "wantToRead"))}
                        onMoveBook={onMoveBook}/>
                    <Shelf
                        key={3}
                        id="shelf-3"
                        title="Read"
                        books={books.filter((book) => (book.shelf === "read"))}
                        onMoveBook={onMoveBook}/>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBook