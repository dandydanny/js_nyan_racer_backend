class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.integer :game
      t.integer :user
      t.integer :winner
      t.string :winning_time
      t.integer :player_id
      t.integer :game_id
      t.timestamps
    end
  end
end
