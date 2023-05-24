export const postQuestion = async (text) => {
  const res = await fetch("/api/question", {
    method: "POST",
    body: JSON.stringify({ text })
  });

  return res.json();
};

export const imFeelingLucky = () => {
  console.error("Not Implemented");
  //   return fetch("/api/question", {
  //     method: "POST",
  //     body: JSON.stringify({ text }),
  //     signal: abortController.signal,
  //   });
};

export const createBook = async (formData) => {
  const res = await fetch("/api/book", {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export const mock = () => {
  return new Promise((res, rej) => {
    setTimeout(
      () =>
        res(
          "Debitis non saepe natus dolorum dignissimos unde nihil vero. Eum perspiciatis culpa ea omnis. Deserunt optio dolorem atque. Velit sapiente odit dicta consequuntur volup"
        ),
      800
    );
  });
};
