class Post < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :title, :image, :text, :longitude, :latitude, presence: true
  validates :title, length: { maximum: 20}
  validates :text, length: { maximum: 200 }
end
