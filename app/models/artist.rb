class Artist < ActiveRecord::Base

  validates :name, presence: true, uniqueness: true

  has_many :lyrics,
    class_name: "Lyric",
    foreign_key: :artist_id,
    primary_key: :id

end
