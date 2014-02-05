class Match < ActiveRecord::Base
  belongs_to :player
  belongs_to :game
  # has_many :games
  # has_many :players
end
