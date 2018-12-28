import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }

    render() {
        const { id, title, books, onMoveBook } = this.props

        return (
            <div className="bookshelf" key={id}>
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book =>
                            <Book key={book.id} book={book} onMoveBook={onMoveBook}/>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf