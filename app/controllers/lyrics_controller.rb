class LyricsController < ApplicationController

  def index
    @lyrics = Lyric.all
    render :index
  end

  def create
    @lyric = Lyric.new(lyrics_params)
    if @lyric.save
      redirect_to lyric_url(@lyric)
    else
      flash.now[:errors] = @lyric.errors.full_messages
  end

  def new
  end

  def show
  end

  def edit
  end

  def update
  end

  #genius doesn't have delete function
  def delete
  end

  private
    def lyrics_params
      params.require(:lyric).permit(:lyric, :artist_id)
    end

end
