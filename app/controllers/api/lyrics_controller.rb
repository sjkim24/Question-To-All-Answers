class Api::LyricsController < Api::ApiController

  def index
    @lyrics = Lyric.all

    render :index
  end

  def create
    @lyric = Lyric.new(lyrics_params)
    @lyric.user_id = current_user.id
    artist_name = params[:lyric][:artist_id]
    if artist_name.blank?
      @lyric.artist_id = nil
    else
      @lyric.artist_id = Artist.where(name: artist_name)[0].id
    end

    if @lyric.save
      render json: @lyric
    else
      render json: @lyric.errors.full_messages, status: :unprocessable_entity
    end
  end

  def new
    @lyric = Lyric.new

    render :new
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
    artist_name = params[:lyric][:artist_id]
    if artist_name.blank?
      @lyric.artist_id = nil
    else
      @lyric.artist_id = Artist.where(name: artist_name)[0].id
    end
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
