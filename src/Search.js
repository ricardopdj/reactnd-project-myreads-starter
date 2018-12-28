import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import Book from './Book'

class Search extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }

    state = {
        searchBooks: [],
        query: ''
    }

    // componentDidMount() {
    //     this.setState({searchBooks: []})
    // }

    clearSearch() {
        this.setState({ query: '', searchBooks: []})
    }


    search = (query) => {
        this.setState({query});

        if (query.length > 0) {
            BooksAPI
                .search(query)
                .then((searchBooks) => {
                    if (searchBooks && searchBooks.length > 0) {
                        searchBooks.map(book =>
                            (this.props.books.filter((b) => b.id === book.id)
                            .map(b => book.shelf = b.shelf))
                        )
                        this.setState({searchBooks})
                    } else {
                        this.clearSearch()
                    }
                });
        } else {
            this.clearSearch()
        }
    }

    render() {
        const { books, onMoveBook } = this.props
        const { searchBooks, query } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.search(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { searchBooks.length > 0 && searchBooks.map(book =>
                        <Book
                            key={book.id}
                            book={book}
                            onMoveBook={onMoveBook}>
                        </Book>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search