import React, { useCallback, useRef, useState } from "react";
import Spinner from "./Spinner";
import Header from "./Header";
import { useDropzone } from "react-dropzone";
import styles from "./Upload.module.css";
import Container from "./Container";
import { useApi } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const { createBook, loading } = useApi("createBook");

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      maxFiles: 1,
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const upload = useCallback(
    async (e) => {
      e.preventDefault();

      const formData = new FormData(formRef.current);
      formData.append("file", acceptedFiles[0], "book.pdf");

      await createBook(formData);

      return navigate("/");
    },
    [acceptedFiles]
  );

  return (
    <>
      <Header showBackButton pageName={"Upload"} />
      <Container>
        {loading ? (
          <Spinner />
        ) : (
          <form ref={formRef} onSubmit={upload}>
            <section className={styles.container}>
              <div
                {...getRootProps({
                  className: styles.dropzone,
                })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the book here ...</p>
                ) : (
                  <p>
                    Drag 'n' drop some book pdf's here, or click to select files
                  </p>
                )}
              </div>
              {!!acceptedFiles.length && (
                <aside>
                  <h4>Files to upload</h4>
                  <ul>{acceptedFileItems}</ul>
                </aside>
              )}
            </section>
            <div className={styles.buttons}>
              <input
                type="submit"
                disabled={!acceptedFileItems.length}
                value="Upload!"
              />
            </div>
          </form>
        )}
      </Container>
    </>
  );
};
