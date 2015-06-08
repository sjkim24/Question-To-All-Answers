class Api::LyricsController < Api::ApiController

  def index
    @lyrics = Lyric.all.order(:created_at).reverse[0..9]

    render :index
  end

  def create
    @lyric = Lyric.new(lyrics_params)
    @lyric.user_id = current_user.id
    artist_name = params[:lyric][:artist_id]

    if artist_name == ""
      @lyric.artist_id = nil
    elsif @lyric.lyric == ""
      @lyric.lyric = nil
    elsif @lyric.track_title == ""
      @lyric.track_title = nil
    elsif @lyric.lyric == "" && @lyric.track_title == ""
      @lyric.lyric = nil
      @lyric.track_title = nil
    else
      @lyric.artist_id = Artist.find_or_create_by(name: artist_name).id
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

    if artist_name == ""
      @lyric.artist_id = nil
    elsif @lyric.lyric == ""
      @lyric.lyric = nil
    elsif @lyric.track_title == ""
      @lyric.track_title = nil
    elsif @lyric.lyric == "" && @lyric.track_title == ""
      @lyric.lyric = nil
      @lyric.track_title = nil
    else
      params[:lyric][:artist_id] = Artist.find_or_create_by(name: artist_name).id
    end

    if @lyric.update(lyrics_params)
      render json: @lyric
    else
      render json: @lyric.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @lyric = Lyric.find(params[:id])
    @lyric.destroy
    render json: {}
  end

  private
    def lyrics_params
      params.require(:lyric).permit(:lyric, :track_title, :artist_id, :id, :user_id)
    end

end
