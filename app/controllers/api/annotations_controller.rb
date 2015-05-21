class Api::AnnotationsController < Api::ApiController

  def index
    @annotations = Annotation.all

    render :index
  end

  def create
    @annotation = Annotation.new(anno_params)
    @annotation.user_id = current_user.id
    puts params[:annotations]
    if @annotation.save
      render json: @annotation
    else
      render json: @annotation.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @annotation = Annotation.find(params[:id])

    render :show
  end

  def update
    @annotation = Annotation.find(params[:id])

    if @annotation.update(anno_params)
      render json: @annotation
    else
      render json: @annotation.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def anno_params
      params.require(:annotation).permit(:annotation, :lyric_id, :start_pos, :end_pos, :lyric_text)
    end

end
