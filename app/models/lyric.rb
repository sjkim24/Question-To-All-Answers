class Lyric < ActiveRecord::Base

  belongs_to :artist
  has_many :annotations

end
