class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :posts, dependent: :destroy

  validates :username, presence: true
  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :liked_posts

  def already_liked?(post)
    self.likes.exists?(post_id: post.id)
  end
end
