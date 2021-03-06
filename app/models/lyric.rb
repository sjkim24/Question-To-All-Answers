class Lyric < ActiveRecord::Base
  include PgSearch

  multisearchable against: :track_title

  validates :lyric, :track_title, :artist_id, presence: true

  belongs_to :artist,
    class_name: "Artist",
    foreign_key: :artist_id,
    primary_key: :id

  has_many :annotations,
    class_name: "Annotation",
    foreign_key: :lyric_id,
    primary_key: :id,
    dependent: :destroy

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

  has_many :comments,
    class_name: "Comment",
    foreign_key: :lyric_id,
    primary_key: :id,
    dependent: :destroy

end
