class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients, :dependent => :delete_all
  validates :name, presence: :true
end
