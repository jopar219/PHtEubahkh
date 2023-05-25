import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./Book.module.css";
import Spinner from "./Spinner.jsx";
import Header from "./Header";
import Container from "./Container";
import { useApi } from "../contexts/ApiContext";
import { useParams } from "react-router-dom";
import { ErrorHandlerAlert } from "../contexts/ErrorHandling";

export default () => {
  const { id: idSlug } = useParams();
  const bookId = parseInt(idSlug);

  const { getBook, loading: bookLoading } = useApi("getBook");
  const { postQuestion, loading: responseLoading} = useApi("postQuestion");
  const { getRandomQuestion, loading: randomQuestionLoading} = useApi("getRandomQuestion");
  

  const [input, setInput] = useState("");
  const [response, setResponse] = useState();

  const [book, setBook] = useState();

  useEffect(() => {
    (async () => {
      const book = await getBook(bookId);
      setBook(book);
      setInput(book.default_question);
    })();
  }, [bookId]);

  const askQuestion = useCallback(async () => {
    const response = await postQuestion(bookId, {
      question: input
    });
    setResponse(response);
  }, [input]);

  const imFeelingLucky = useCallback(async () => {
    const response = await getRandomQuestion(bookId);
    setResponse(response);
  }, []);

  const clearAnswer = useCallback(() => {
    setResponse(undefined);
  }, []);

  return (
    <>
      <Header pageName={book?.name ?? "Book"} showBackButton />
      <Container>
        <ErrorHandlerAlert />
        {
          book === undefined ? (
            <div className={styles.spinner}>
              <Spinner />
            </div>
          ) : (
            <>
              <a href={book.link}>
                <img className={styles.bookCover} src={book.cover}></img>
              </a>
              <h2 className={styles.h2}>Ask {book.name}</h2>
              <p className={styles.p}>
                This is an experiment in using AI to make a book's content more
                accessible. Ask a question and AI'll answer it in real-time:
              </p>

              {responseLoading || randomQuestionLoading ? (
                <div className={styles.spinner}>
                  <Spinner />
                </div>
              ) : response ? (
                <>
                  <div className={styles.answerBlock}>
                    <label className={styles.answerLabel}>Question:</label>
                    <p className={styles.answer}>{response.question}</p>
                  </div>
                  <div className={styles.answerBlock}>
                    <label className={styles.answerLabel}>Answer:</label>
                    <p className={styles.answer}>{response.answer}</p>
                  </div>
                  <button onClick={clearAnswer}>Ask another question</button>
                </>
              ) : (
                <>
                  <textarea
                    className={styles.textarea}
                    rows={5}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <div className={styles.buttons}>
                    <button onClick={askQuestion}>Ask question</button>
                    <button className="btn-secondary" onClick={imFeelingLucky}>
                      I'm feeling lucky
                    </button>
                  </div>
                </>
              )}
            </>
          )
        }
      </Container>
    </>
  );
};
