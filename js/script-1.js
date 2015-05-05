var selectedCards = [],
    unusedCards = [],
 rollDice = function () {
    var dice = Math.floor(Math.random() * (6 - 1) + 1),

        dice2 = Math.floor(Math.random() * (6 - 1) + 1);


    return [dice, dice2];
},

diceRoller = function () {
    var diceValues = rollDice(),
        die1 = diceValues[0],
        die2 = diceValues[1];
    totalRoll = diceValues[0] + diceValues[1];


    $('.die1').text(diceValues[0]);
    $('.die2').text(diceValues[1]);

    return totalRoll;
},
diceTotal = function(){
    var totalDiceSum = diceRoller();
    $('#roll-total').text(totalRoll);
},
resetGame = function(){
    selectedCards.length = 0;
    unusedCards.length = 0;
    $('#card-flips ul').children('li').removeClass();
    $('#roll-total').text('');
    $('.die1').text('');
    $('.die2').text('');
    $('#roll-dice').attr('disabled', false);
    $('#end-game').attr('disabled', true);
    $('#end-turn').attr('disabled', true);
};

$(document).ready(function(){
    // disable click until end turn or end game is clicked

  $('#roll-dice').on('click', function(){
    diceRoller();
    diceTotal();
    console.log(totalRoll);
    $(this).attr('disabled', true);
    $('#end-turn').attr('disabled', false);
    if($('#card-flips ul').children('li').hasClass('shut')){
        return false;
    } else {
        $('#card-flips ul').children('li').addClass('selectable');
    }



  });


// Need to revisit so can unselect before ending turn
  $('li').on('click', function(){

    if ($(this).hasClass('selectable') && !$(this).hasClass('shut') && !$(this).hasClass('selected')){
        var cardVal = $(this).text();

        console.log(cardVal);
        selectedCards.push(parseInt(cardVal));

        console.log(selectedCards);


        $(this).addClass('selected');

    } else {
        return false;
    }

  });
  $('#end-turn').on('click', function(){
    var sum = selectedCards.reduce(add, 0);

            function add(a, b) {
                return a + b;
            };
        console.log(sum);
        if (sum === totalRoll){
            $('li.selected').removeClass().addClass('shut');
            selectedCards.length = 0;
            console.log(selectedCards);
            $('#roll-dice').attr('disabled', false);
            $(this).attr('disabled', true);
            $('#end-game').attr('disabled', false);
        } else {
            alert('cards flipped does not math total sum');
            $('li.selected').removeClass('selected');
            selectedCards.length = 0;
        }

    });
  $('#end-game').on('click', function(){
    $('li.selectable').each(function(i){
        var unusedVal = $(this).text();
            unusedCards.push(parseInt(unusedVal));

    });
    console.log(unusedCards);
    var endSum = unusedCards.reduce(add, 0);

            function add(a, b) {
                return a + b;
            };
    alert('Game Over \nYour end score was: ' + endSum +'\nPress Ok to reset');
    resetGame();
  });


});
