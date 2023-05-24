export const askQuestionAPI = (text) => {
  console.error("Not Implemented");
  //   return fetch("/api/question", {
  //     method: "POST",
  //     body: JSON.stringify({ text }),
  //     signal: abortController.signal,
  //   });
};

export const imFeelingLucky = () => {
  console.error("Not Implemented");
  //   return fetch("/api/question", {
  //     method: "POST",
  //     body: JSON.stringify({ text }),
  //     signal: abortController.signal,
  //   });
};

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
