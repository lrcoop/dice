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
    $('#card-flips').children('div').removeClass();
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
    if($('#card-flips').children('div').hasClass('shut')){
        return false;
    } else {
        $('#card-flips').children('div').addClass('selectable');
    }



  });


// Need to revisit so can unselect before ending turn
  $('#card-flips div').on('click', function(){

    if ($(this).hasClass('selectable') && !$(this).hasClass('shut')){
       // var cardVal = $(this).text();
        $(this).toggleClass('selected');

    } else {
        return false;
    }

  });
  $('#end-turn').on('click', function(){
    $('.selected').each(function(){
        var cardVal = $(this).children('span:first-child').text();
        selectedCards.push(parseInt(cardVal));

    });
    var sum = selectedCards.reduce(add, 0);

            function add(a, b) {
                return a + b;
            };
        console.log(sum);
        if (sum === totalRoll){
            $('.selected').removeClass().addClass('shut');
            selectedCards.length = 0;
            console.log(selectedCards);
            $('#roll-dice').attr('disabled', false);
            $(this).attr('disabled', true);
            $('#end-game').attr('disabled', false);
        } else {
            alert('cards flipped do not equal total sum');
            $('.selected').removeClass('selected');
            selectedCards.length = 0;
        }

    });
  $('#end-game').on('click', function(){
    $('.selectable').each(function(i){
        var unusedVal = $(this).text();
            unusedCards.push(parseInt(unusedVal));

    });

    var endSum = unusedCards.reduce(add, 0);

            function add(a, b) {
                return a + b;
            };
    alert('Game Over: You did not win.\nYour end score was: ' + endSum +'\nPress ok to reset');
    resetGame();
  });


});
