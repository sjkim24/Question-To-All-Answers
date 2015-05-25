class Api::UpvotesController < Api::ApiController

  def index
    @upvotes = Upvote.all

    render :index
  end

  def create
    @upvote = Upvote.new(upvotes_params)

    if @upvote.save
      render json: @upvote
    else
      render json: @upvote.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @upvote = Upvote.find(params[:id])

    render json: @upvote
  end

  def update
    @upvote = Upvote.find(params[:id])

    if @upvote.update(upvotes_params)

      render json: @upvote
    else
      render json: @upvote.errors.full_messages, status: :unprocessable_entity
    end

  end

  private
    def upvotes_params
      params.require(:upvote).permit(:anno_id, :user_id, :upvoted)
    end

end
