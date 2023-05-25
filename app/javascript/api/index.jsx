
export class ApiError extends Error {
	constructor(message) {
		super(message);
		this.name = 'ApiError';
	}
}

export const postQuestion = async (bookId, obj) => {
  const res = await fetch(`/api/books/${bookId}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj)
  });

  if (res.ok) {
    return await res.json();
  }

  throw new ApiError("Couldn't create question");
};

export const getSimilarQuestions = async (bookId, obj) => {
  const searchParams = new URLSearchParams(obj);
  const res = await fetch(`/api/books/${bookId}/questions/similar?${searchParams}`);

  if (res.ok) {
    return await res.json();
  }

  throw new ApiError("Couldn't create question");
};


export const getRandomQuestion = async (bookId) => {
  const res = await fetch(`/api/books/${bookId}/questions/random`);

  if (res.ok) {
    return await res.json();
  }

  throw new ApiError("Couldn't create question");
};


export const createBook = async (formData) => {
  const res = await fetch("/api/books", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    return await res.json();
  }

  throw new ApiError("Couldn't create book");

}

export const getBook = async (bookId) => {
  const res = await fetch(`/api/books/${bookId}`,);

  if (res.ok) {
    return await res.json();
  }

  throw new ApiError("Couldn't get book");
}

export const getBooks = async (formData) => {
  const res = await fetch("/api/books",);

  if (res.ok) {
    const json = await res.json();
    return json.books;
  }

  throw new ApiError("Couldn't get books");

}