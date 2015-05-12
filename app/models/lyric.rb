class Lyric < ActiveRecord::Base

  belongs_to :artist,
    class_name: "Artist",
    foreign_key: :artist_id,
    primary_key: :id

  has_many :annotations,
    class_name: "Annotation",
    foreign_key: :lyric_id,
    primary_key: :id

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

end
