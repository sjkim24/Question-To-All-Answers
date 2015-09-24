class Api::CommentsController < Api::ApiController

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    

  end

  def show

  end

  private
    def comment_params
      params.require(:comment).permit(:body, :user_id, :lyric_id)
    end
end
