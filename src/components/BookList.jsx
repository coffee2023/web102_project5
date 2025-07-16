const getCoverURL = (coverId) =>
  coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

export default function BookList({ books }) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-card" key={book.key}>
          <img src={getCoverURL(book.cover_i)} alt={book.title} />
          <h3>{book.title}</h3>
          <p>&nbsp;
            🧝Author: {book.author_name?.[0]}</p>
          <p>📅 Published: {book.first_publish_year}</p>
        </div>
      ))}
    </div>
  );
}
