class Annotation < ActiveRecord::Base

  belongs_to :lyric
  belongs_to :user

end
