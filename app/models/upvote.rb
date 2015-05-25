class Upvote < ActiveRecord::Base

  validates :anno_id, :user_id, presence: true

  belongs_to :annotation,
    class_name: "Annotation",
    foreign_key: :anno_id,
    primary_key: :id

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

end
