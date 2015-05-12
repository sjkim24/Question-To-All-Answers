class User < ActiveRecord::Base
  validates :username, :email, :password_digest, presence: true
  validates :username, :email, uniqueness: true

  attr_reader :password
  after_initialize: ensure_session_token

  has_many :session_tokens

  def self.generate_random_token
    SecureRandom.urlsafe_base64(16)
  end

  def self.bind_by_credentials(username, password)
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
    BCrypt::Password(self.password_digest).is_password?(password)
  end

end
