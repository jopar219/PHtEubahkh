import React, { useCallback, useRef } from "react";
import Header from "./Header";
import { useDropzone } from "react-dropzone";
import styles from "./Upload.module.css";
import Container from "./Container";
import { createBook } from "../api";

export default () => {
  const formRef = useRef();

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

  const upload = useCallback(async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append("file", acceptedFiles[0], "book.pdf");

    const result = await createBook(formData);

  }, [acceptedFiles]);


  return (
    <>
      <Header showBackButton pageName={"Upload"} />
      <Container>
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
      </Container>
    </>
  );
};
