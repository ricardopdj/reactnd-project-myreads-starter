import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import Book from './Book'

class Search extends Component {
    static propTypes = {
        searchedBooks: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired,
        onSearch: PropTypes.func.isRequired,
        onClearSearch: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    componentDidMount() {
        this.props.onClearSearch();
    }

    updateQuery = (query) => {
        this.setState({query});
        this.props.onSearch(this.state.query);
    }

    onMoveBook = (book, shelf) => {
        book.shelf = shelf;
        this.props.onMoveBook(book, shelf);
    }

    render() {
        const { searchedBooks } = this.props
        const { query } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { searchedBooks.length > 0 && searchedBooks.map(book =>
                        <Book
                            key={book.id}
                            book={book}
                            onMoveBook={this.onMoveBook}>
                        </Book>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search