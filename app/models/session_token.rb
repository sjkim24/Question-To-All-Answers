class SessionToken < ActiveRecord::Base

  belongs_to :user

  def self.generate_random_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_random_token
  end

end
