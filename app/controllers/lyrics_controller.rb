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
      params.require(:lyric).permit(:lyric, :artist_id)
    end

end
