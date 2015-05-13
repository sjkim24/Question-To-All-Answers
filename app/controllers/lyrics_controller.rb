class LyricsController < ApplicationController

  def index
    @lyrics = Lyric.all

    render :index
  end

  def create
    @lyric = Lyric.new(lyrics_params)
    lyric = params[:lyric]
    artist_name = lyric[:artist_id]

    lyric[:artist_id] = Artist.find_or_create_by(name: artist_name).id
    lyric[:user_id] = current_user.id

    if @lyric.save
      redirect_to lyric_url(@lyric)
    else
      flash.now[:errors] = @lyric.errors.full_messages
    end
  end

  def new
    if logged_in?
      @lyric = Lyric.new
      render :new
    else
      flash[:errors] = ["You must log in to create lyrics."]
      redirect_to new_session_url
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

    if @lyric.update(lyric_params)
      redirect_to lyric_url(@lyric)
    else
      flash.now[:errors] = @lyric.errors.full_messages
      render :edit
    end
  end

  #genius doesn't have delete function
  def destroy
    @lyric = Lyric.find(params[:id])
    @lyric.destroy
    redirect_to lyrics_url
  end

  private
    def lyrics_params
      params.require(:lyric).permit(:lyric, :artist_id, :track_title, :user_id)
    end

    def has_artist?(name)
      artist_names = []
      Artist.all.each { |artist| artist_names << artist.name }
      artist_names.include?(name) ? true : false
    end

end
