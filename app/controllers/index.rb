get '/' do
  erb :index
end

post '/start_race' do

  # DEBUG
  puts "--------------------------------"
  p params[:playerOne]
  p params[:playerTwo]

  # find or create user by initials
  @player = []
  @player << Player.find_or_create_by_initials(params[:playerOne])
  @player << Player.find_or_create_by_initials(params[:playerTwo])
end

post '/results' do
  # playerOne: playerOne, playerTwo: playerTwo, lapTime: lapTime, winner: player

  # create game
  binding.pry

  puts "----Received these params from JS -------------------"
  p params


  puts "----Winner----------------------"
  p params[:winner]

  winner = Player.find_or_create_by(initials: params[:winner])
  loser = Player.find_or_create_by(initials: params[:loser])

  #create game, save stuff with assoc.
  game = Game.create(winner_id: winner.id, laptime: params[:laptime])
  game.players << winner
  game.players << loser

  # find all games a player is associated to
  winner.games

  # find all players a game has (returns obj)
  game.players

  Player.find_by(id: 1)




  # Save race results in each player's Match table
  # playerOne.game.create( game_id: game.id,
  #                           winner: who_won,
  #                           winning_time: params[:lapTime]
  #                           );
  # playerTwo.game.create( game_id: game.id,
  #                           winner: who_won,
  #                           winning_time: params[:lapTime]
  #                           );
end

get '/results' do
  # Implement listing of race results by user

end

# Create the players
post '/create_players' do
  player1 = Player.create(initials: params[:player_one])
  player2 = Player.create(initials: params[:player_two])

  puts "----Players created. They are... ----------------"
  puts player1
  puts player2
  puts "=== inspecting each player var ============================="
  p player1
  p player2
end
