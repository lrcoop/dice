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
};

$(document).ready(function(){
  $('#roll-dice').on('click', function(){
    diceRoller();
    diceTotal();
    console.log(totalRoll);
    if($('#card-flips ul').children('li').hasClass('shut')){
        return false;
    } else {
        $('#card-flips ul').children('li').addClass('selectable');
    }
    $(this).addClass('diabled');


  });

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
            $('#end-val').text(endSum);
            $('.game-over').toggleClass('show');
  });


});
