class Api::StaticPagesController < Api::ApiController

  def search
    @search_results = Pgsearch
      .multisearch(params[:query])
      .page(params[:page])
  end

end
