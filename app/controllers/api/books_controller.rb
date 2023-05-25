DOC_EMBEDDINGS_MODEL = "text-search-curie-doc-001"

class Api::BooksController < Api::ApiController
    ##
    # Returns all books
    def index
        books = Book.all.each.map do |book|
            {
                id: book.id,
                name: book.name,
                default_question: book.default_question,
                cover: url_for(book.cover)
            }
        end

        render json: { books: books }
    end

    def show
        book = Book.find(params["id"])

        render json: {
            id: book.id,
            name: book.name,
            default_question: book.default_question,
            cover: url_for(book.cover)
        }
    end

    ##
    # A user uploads pdf books to this endpoint,
    # The book's contents are converted to embeddings and saved to database
    def create
        openai = OpenAI::Client.new

        reader = PDF::Reader.new(params["pdf"].to_io())

        # Strategy:
        # · We first create a book model
        # · Then we iterate through all pages of the book model
        # · For each page, we generate an embedding
        # · We store the page's content and embeddings in the pages table
        #   along with a reference to the book it belongs to

        ActiveRecord::Base.transaction do

            book = Book.create(
                name: params["name"],
                cover: params["cover"],
                link: params["link"],
                default_question: params["default_question"]
            )

            puts "Processing #{reader.page_count} pages..."

            pages = reader.pages.each_with_index.map do |page, i|
                puts "Processing pages #{i}/#{reader.page_count}..."
                
                # Remove extra whitespace
                content = page.text.gsub(/(\s)\s+/, "\\1")
    
                # fetch embeddings
                response = openai.embeddings(
                    parameters: {
                        model: DOC_EMBEDDINGS_MODEL,
                        input: content
                    }
                )

                puts response
        
                embedding = response["data"][0]["embedding"]
    
                {
                    book: book,
                    content: content,
                    embedding: embedding 
                }
            end

            Page.create(pages)
        end

        render json: { message: "Created" }, status: :ok
    end


    
end
