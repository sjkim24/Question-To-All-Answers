class Annotation < ActiveRecord::Base

  belongs_to :lyric,
    class_name: "Lyric",
    foreign_key: :lyric_id,
    primary_key: :id

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

end
