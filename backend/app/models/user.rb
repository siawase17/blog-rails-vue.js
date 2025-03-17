class User < ApplicationRecord
  has_secure_password  # 비밀번호 해싱

  has_many :posts, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }
end
