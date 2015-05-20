class Api::ArtistsController < Api::ApiController

  def create
    # @annotation = Annotation.new
  end

  def new
  end

  def show
  end

  def edit

  end

  def update
  end

  def destroy
  end

  private
    def anno_params
      params.require(:annotation).permit(:annotation, :lyric_id, :lyric_text, :user_id, :start_post, :end_post)
    end

end
