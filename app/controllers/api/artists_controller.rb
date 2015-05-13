class Api::ArtistsController < Api::ApiController
  def show
    @artist = Artist.find(params[:id])

    render :show
  end

end
