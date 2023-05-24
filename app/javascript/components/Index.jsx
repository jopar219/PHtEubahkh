import React, { useState, useRef, useCallback } from "react";
import styles from "./Index.module.css";
import Spinner from "./Spinner.jsx";

import * as api from "../api";

export default () => {
  const [input, setInput] = useState(
    "What is The Minimalist Entrepreneur about?"
  );
  const [response, setResponse] = useState();

  const [loading, setLoading] = useState(false);

  const askQuestion = useCallback(async () => {
    setLoading(true);
    const response = await api.mock(input);
    setLoading(false);
    setResponse(response);
  }, [input]);

  const imFeelingLucky = useCallback(async () => {
    setLoading(true);
    const response = await api.mock();
    setLoading(false);
    setResponse(response);
  }, []);

  const clearResponse = useCallback(() => {
    setResponse(undefined);
  }, []);

  return (
    <div className={styles.container}>
      <a href="https://www.amazon.com/Minimalist-Entrepreneur-Great-Founders-More/dp/0593192397">
        <img
          className={styles.bookCover}
          src="images/book.2a513df7cb86.png"
        ></img>
      </a>
      <h1 className={styles.h1}>Ask My Book</h1>
      <p className={styles.p}>
        This is an experiment in using AI to make a book's content more
        accessible. Ask a question and AI'll answer it in real-time:
      </p>

      {loading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : response ? (
        <>
          <div className={styles.answerBlock}>
            <label className={styles.answerLabel}>Answer:</label>
            <p className={styles.response}>{response}</p>
          </div>
          <button onClick={clearResponse}>Ask another question</button>
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
    </div>
  );
};
