class LyricsController < ApplicationController
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
      @lyric.artist_id = Artist.find_or_create_by(name: artist_name).id
    end

    if @lyric.save
      render :new
    else
      flash.now[:errors] = @lyric.errors.full_messages
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
    fail
    if artist_name.blank?
      @lyric.artist_id = nil
    else
      @lyric.artist_id = Artist.find_or_create_by(name: artist_name).id
    end
    if @lyric.update(lyrics_params)
      render :show
    else
      flash.now[:errors] = @lyric.errors.full_messages
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
