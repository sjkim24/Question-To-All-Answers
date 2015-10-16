class Api::CommentsController < Api::ApiController

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @comment = Comment.find(params[:id])

    render json: @comment
  end

  def update
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors_full_messages, status: :unporcessable_entity
    end
  end

  private
    def comment_params
      params.require(:comment).permit(:body, :user_id, :lyric_id)
    end
end
