COMPLETIONS_MODEL = "text-davinci-003"
DOC_EMBEDDINGS_MODEL = "text-search-curie-doc-001"
COMPLETIONS_API_PARAMS = {
    # We use temperature of 0.0 because it gives the most predictable, factual answer.
    "temperature": 0.0,
    "max_tokens": 150,
    "model": COMPLETIONS_MODEL,
}

class Api::QuestionsController < Api::ApiController

    ##
    # A user submits a question about a book, we find relevant excerpts of the book
    # and send these along with the question to OpenAI for the answer
    def create
        # Strategy:
        # · Find the book by id
        # · Get the 5 most similar excerpts for that book and the user's question
        # · Build prompt and save to OpenAI
        # · Save answer and question embeddings in database
        # · Respond with a json object containin the answer

        openai = OpenAI::Client.new

        ActiveRecord::Base.transaction do
            book = Book.find(params[:book_id])

            question = params[:question]
            response = openai.embeddings(
                parameters: {
                    model: DOC_EMBEDDINGS_MODEL,
                    input: question
                }
            )

            question_embedding = response["data"][0]["embedding"]


            sections = Page
                .where(book_id: params[:book_id])
                .nearest_neighbors(
                    :embedding,
                    question_embedding,
                    distance: "cosine"
                ).first(5).pluck(:content)
            

            prompt = "With help from the following excerpts from the book `#{book.name}`:\n"
            prompt += "```\n" + sections.join("\n```\n````\n") + "\n```\n"
            prompt += "Answer the following question:\n"
            prompt += "`#{question.gsub("`", "'")}`"

            completion_params = COMPLETIONS_API_PARAMS.dup
            completion_params[:prompt] = prompt
            
            response = openai.completions(parameters: completion_params)

            puts response

            answer = response["choices"][0]["text"]

            @question = Question.create({
                book: book,
                question: question,
                answer: answer,
                embedding: question_embedding
            })

            render json: @question.to_json(except: :embedding), status: :created
        end
    end

    ##
    # GET /books/questions/similar
    # Responds with the n most similar questions
    def similar
        question = params[:question]
        response = openai.embeddings(
            parameters: {
                model: DOC_EMBEDDINGS_MODEL,
                input: question
            }
        )

        question_embedding = response["data"][0]["embedding"]

        questions = Question.where(book_id: params[:book_id]).nearest_neighbors(
            :embedding,
            question_embedding,
            distance: "cosine"
        ).first(5)

        render json: questions.to_json(except: :embedding), status: :ok
    end

    ##
    # GET /books/questions/random
    # Responds with a random question-answer
    def random
        question = Question.where(book_id: params[:book_id]).order("RANDOM()").first
        render json: question.to_json(except: :embedding), status: :ok
    end

end
