class Api::LyricsController < Api::ApiController

  def index
    @lyrics = Lyric.all

    render :index
  end

  def create
    @lyric = Lyric.new(lyrics_params)
    @lyric.user_id = current_user.id
    artist_name = params[:lyric][:artist_name]
    @lyric.artist_id = Artist.find_or_create_by(name: artist_name).id


    if @lyric.save
      render json: @lyric
    else
      render json: @lyric.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @lyric = Lyric.find(params[:id])

    render :show
  end

  def edit
    @lyric = Lyric.find(params[:id])

    render :edit
  end

  def update
    @lyric = Lyric.find(params[:id])
    artist_name = params[:lyric][:artist_name]
    @lyric.artist_id = Artist.find_or_create_by(name: artist_name).id
    if @lyric.update(lyrics_params)
      render json: @lyric
    else
      render json: @lyric.errors.full_messages, status: :unprocessable_entity
    end
  end

  #genius doesn't have delete function
  def destroy
    @lyric = Lyric.find(params[:id])
    @lyric.destroy
    render json: {}
  end

  private
    def lyrics_params
      params.require(:lyric).permit(:lyric, :track_title)
    end

end
