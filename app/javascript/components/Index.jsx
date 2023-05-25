import React, { useEffect, useState } from "react";
import styles from "./Index.module.css";
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom";
import Header from "./Header";
import Container from "./Container";
import { ErrorHandlerAlert } from "../contexts/ErrorHandling";
import { useApi } from "../contexts/ApiContext";

const Book = (props) => {
  return (
    <div className={styles.bookEntry}>
      <Link to={`book/${props.id}`}>
        <img className={styles.bookCover} src={props.cover} />
      </Link>
      <Link to={`book/${props.id}`}>
        <h2 className={styles.bookName}>{props.name}</h2>
      </Link>
    </div>
  );
};

export default () => {
  const { getBooks, loading } = useApi("getBooks");

  const [books, setBooks] = useState();

  useEffect(() => {
    (async () => {
      const books = await getBooks();
      setBooks(books);
    })();
  }, []);

  return (
    <>
      <Header
        actionButtonLink="/book/new"
        actionButtonText="Upload"
        pageName={"Books"}
      />
      <Container>
        <ErrorHandlerAlert />
        {loading ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.books}>
            {books && books.map((book) => <Book key={book.id} {...book} />)}
          </div>
        )}
      </Container>
    </>
  );
};
