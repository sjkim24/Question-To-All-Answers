class User < ActiveRecord::Base
  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true}
  has_attached_file :image, default_url: "default.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :annotations,
    class_name: "Annotation",
    foreign_key: :user_id,
    primary_key: :id

  has_many :lyrics,
    class_name: "Lyric",
    foreign_key: :user_id,
    primary_key: :id

  has_many :upvotes,
    class_name: "Upvote",
    foreign_key: :user_id,
    primary_key: :id

  has_many :comments,
    class_name: "Comment",
    foriegn_key: :user_id,
    primary_key: :id,
    dependent: :destroy


  def self.generate_random_token
    SecureRandom.urlsafe_base64(16)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user: nil
  end

  def reset_session_token!
    self.session_token = self.class.generate_random_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_random_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

end
