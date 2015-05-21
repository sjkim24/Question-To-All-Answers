class Annotation < ActiveRecord::Base

  validates :annotation, :lyric_id, :user_id, :start_pos, :end_pos, :lyric_text, presence: true

  belongs_to :lyric,
    class_name: "Lyric",
    foreign_key: :lyric_id,
    primary_key: :id

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

end
