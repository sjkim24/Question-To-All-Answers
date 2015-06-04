class Api::StaticPagesController < Api::ApiController

  def search

    @search_results = PgSearch
      .multisearch(params[:query])
      .page(params[:page])
    render :search
  end

end
