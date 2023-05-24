import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div>
          {
            props.showBackButton &&
            (
              <a className={styles.back} onClick={() => navigate(-1)}>{"<"}</a>
            )
          }
        </div>
        <h1>{props.pageName}</h1>
        <div>
          {
            props.actionButtonLink && props.actionButtonText && (
              <Link to={props.actionButtonLink}><button>{props.actionButtonText}</button></Link>
            )
          }
        </div>
      </div>
    </div>
  );
};
