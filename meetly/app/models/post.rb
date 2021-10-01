class Post < ApplicationRecord
  belongs_to :user
  with_options presence: true do
    validates :title
    validates :lyrics
  end
end
