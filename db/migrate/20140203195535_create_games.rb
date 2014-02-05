class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :title
      t.integer :winner_id
      t.string :laptime
      t.timestamps
    end
  end
end
