import React, { useState } from "react";
import styles from "./Index.module.css";
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom";
import Header from "./Header";
import Container from "./Container";

export default () => {

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header
        actionButtonLink="/book/new"
        actionButtonText="Upload"
        pageName={"Books"}
      />
      <Container>
        {loading ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <Link to="/book/123">
          <img
            className={styles.bookCover}
            src="images/book.2a513df7cb86.png"
          ></img>
        </Link>
        )}
      </Container>
    </>)
  ;
};
