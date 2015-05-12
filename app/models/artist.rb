class Artist < ActiveRecord::Base

  has_many :lyrics,
    class_name: "Lyric",
    foreign_key: :lyric_id,
    primary_key: :id

end
