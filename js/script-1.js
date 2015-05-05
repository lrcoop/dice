var selectedCards = [],
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
    $('#card-flips ul').children('li').addClass('selectable');

  });
  $('li').on('click', function(){

    if ($(this).hasClass('selectable') && !$(this).hasClass('shut')){
        var cardVal = $(this).text();

        console.log(cardVal);
        selectedCards.push(parseInt(cardVal));

        console.log(selectedCards);


        $(this).addClass('shut');
        var sum = selectedCards.reduce(add, 0);

            function add(a, b) {
                return a + b;
            };
        console.log(sum);
    } else {
        return false;
    }

  });

});
