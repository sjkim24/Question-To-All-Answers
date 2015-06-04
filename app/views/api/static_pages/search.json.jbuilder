json.total_pages @search_results.total_pages

json.search_results @search_results.map(&:searchable) do |search_result|
  if search_result.is_a? Lyric
    json.partial! "api/lyrics/lyric", lyric: search_result
  end
end
