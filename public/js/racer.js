$(document).ready(function() {
  console.log("Starting Racer.js..............................")
  $('#countdown').css("font-size", ($(document).height() / 2) + "px" );
  $('.racer_table td').css("height", $('.racer_table td').width())


  // Setting up local var for player names
  var playerOne
  var playerTwo

  // Detect keyboard input
  var race = function(){
    $(document).on('keyup', function(event) {
      if(event.keyCode === 65) { //a
        advancePlayer("1");
      }
      if(event.keyCode === 74) { //j
        advancePlayer("2");
      }
    });
  }

  // Advance a player in DOM
  var advancePlayer = function(player) {
    active = $("#player" + player + "_strip>td.active");
    active.removeClass("active");
    active.addClass("trail");
    active.next().addClass("active");

    var winner, loser;

    // Check which player won
    if ($("#player" + player + "_strip>td:last").hasClass("active")) {
      var endingTime = $.now()
      console.log(player);

      if(player === "1"){
        winner = playerOne;
        loser = playerTwo;
      } else if(player === "2") {
        winner = playerTwo;
        loser = playerOne;
      }

      console.log("winner is ==============");
      console.log(winner);

      // maybe send id instead of name?

      lapTime = (endingTime - startingTime) / 1000;

      // Record the results in DB using AJAX post
      $.ajax({
        type: "POST",
        url: "/results",
        // data: {playerOne: playerOne, playerTwo: playerTwo, lapTime: lapTime, winner: winner},
        data: {winner: winner, laptime: lapTime, loser: loser},
        success: function(e){
          console.log(e);
          var r = confirm("Player " + player + " wins!\n\nWith a finsh time of " + lapTime + " seconds\n\nPlay again?\n");
          if(r === true){
            // window.location.reload();
          } else {}
        },
        error: function(e){
          console.log("---------Error posting race result-----------")
          // window.location.reload();
        }
      });
    }
  }

  var time = 3;

  function initializaPlay() {


    // Countdown timer
    var timeOut = setTimeout(initializaPlay, 1000);
      $('#countdown').html(time);

      if(time === 0){
        $('#countdown').html("");
        clearTimeout(timeOut);
        startingTime = $.now();
        console.log(startingTime);

        race();
      }
    time--;
  }



  // Create players
  // playerOne = prompt("Enter initials for Player 1");
  // playerTwo = prompt("Enter initials for Player 2");

  // Do this when submit button is clicked
  $( "#start_race" ).click(function(event) {
    event.preventDefault();
    // console.log($("form").serialize());
    // console.log($("form").serializeArray());
    // console.log($('#p1').val());

    // assign player names to local var to display later
    playerOne = $('#p1').val()
    playerTwo = $('#p2').val()

    console.log(playerOne);
    console.log(playerTwo);

    console.log("start_race clicked................")
    initializaPlay();

    debugger;

    // send user info to rubyland
    // $.ajax({
    //   type: "POST",
    //   url: "/start_race",
    //   data: $("form").serialize(),
    //   success: function(response){
    //     console.log(response);
    //     console.log("Start initializePlay()...................")
    //     initializaPlay();
    //   },
    //   error: function(response){
    //     console.log("NOOOOOOOO....... unable to create player");
    //   }
    // })
  });

});

// Set countdown clock and grid size
$(window).resize(function() {
  $('#countdown').css("font-size", ($(document).height() / 2) + "px" );
  $('.racer_table td').css("height", $('.racer_table td').width())
});




