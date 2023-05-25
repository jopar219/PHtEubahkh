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

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [defaultQuestion, setDefaultQuestion] = useState("");

  const {
    acceptedFiles: acceptedFilesPdf,
    getRootProps: getRootPropsPdf,
    getInputProps: getInputPropsPdf,
    isDragActivePdf,
  } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const {
    acceptedFiles: acceptedFilesCover,
    getRootProps: getRootPropsCover,
    getInputProps: getInputPropsCover,
    isDragActiveCover,
  } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    maxFiles: 1,
  });

  const acceptedFilePdfItems = acceptedFilesPdf.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const acceptedFileCoverItems = acceptedFilesCover.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const upload = useCallback(
    async (e) => {
      e.preventDefault();

      const formData = new FormData(formRef.current);
      formData.append("name", name);
      formData.append("link", link);
      formData.append("default_question", defaultQuestion);
      formData.append("pdf", acceptedFilesPdf[0], "book.pdf");
      formData.append(
        "cover",
        acceptedFilesCover[0],
        acceptedFilesCover[0].name
      );

      await createBook(formData);

      return navigate("/");
    },
    [name, link, defaultQuestion, acceptedFilesPdf, acceptedFilesCover]
  );

  return (
    <>
      <Header showBackButton pageName={"Upload"} />
      <Container>
        {loading ? (<div className={styles.flexCol}>
            <p>Processing... This could take a few minues...</p>
            <Spinner />
          </div>
        ) : (
          <form ref={formRef} onSubmit={upload}>
            <div className={styles.flexCol}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <input
                type="text"
                placeholder="Default Question"
                value={defaultQuestion}
                onChange={(e) => setDefaultQuestion(e.target.value)}
              />
              <label htmlFor="image">Cover Photo</label>
              <section className={styles.container}>
                <div
                  {...getRootPropsCover({
                    className: styles.dropzone,
                  })}
                >
                  <input name="image" {...getInputPropsCover()} />
                  {isDragActiveCover ? (
                    <p>Drop the cover image here ...</p>
                  ) : (
                    <p>
                      Drag 'n' drop the cover image here, or click to select
                      files
                    </p>
                  )}
                </div>
                {!!acceptedFilesCover.length && (
                  <aside>
                    <h4>Files to upload</h4>
                    <ul>{acceptedFileCoverItems}</ul>
                  </aside>
                )}
              </section>
              <label htmlFor="pdf">Book PDF</label>
              <section className={styles.container}>
                <div
                  {...getRootPropsPdf({
                    className: styles.dropzone,
                  })}
                >
                  <input name="pdf" {...getInputPropsPdf()} />
                  {isDragActivePdf ? (
                    <p>Drop the book here ...</p>
                  ) : (
                    <p>
                      Drag 'n' drop some book pdf's here, or click to select
                      files
                    </p>
                  )}
                </div>
                {!!acceptedFilesPdf.length && (
                  <aside>
                    <h4>Files to upload</h4>
                    <ul>{acceptedFilePdfItems}</ul>
                  </aside>
                )}
              </section>
              <div className={styles.buttons}>
                <input
                  type="submit"
                  disabled={!acceptedFilePdfItems.length}
                  value="Upload!"
                />
              </div>
            </div>
          </form>
        )}
      </Container>
    </>
  );
};
