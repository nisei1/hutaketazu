class Post < ApplicationRecord
  belongs_to :user
  with_options presence: true do
    validates :title
    validates :lyrics
  end
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
end
