$(document).ready(function () {

    var totalRoll = $('#roll-total').text();
    var cards = function (li) {
        var a = [];
        for (var i = 0; i < li.length; i++) {
            a.push(li[i].innerHTML);
        }
        console.log(a);
    },

    rollDice = function () {
        var dice = Math.floor(Math.random() * (6 - 1) + 1),

            dice2 = Math.floor(Math.random() * (6 - 1) + 1);


        return [dice, dice2];
    },

    diceRoller = function () {
        var theseDiceVals = rollDice(),
            die1 = theseDiceVals[0],
            die2 = theseDiceVals[1];
        totalRoll = theseDiceVals[0] + theseDiceVals[1];


        $('.die1').text(theseDiceVals[0]);
        $('.die2').text(theseDiceVals[1]);
        $('#roll-total').text(totalRoll);
    };
    $('#roll-dice').on('click', function () {
        diceRoller();
        $('#card-flips').addClass('select');
    });
    $('li').on('click', function () {
        if ($(this).hasClass('shut')) {
            return false;
        } else {
            var cardVal = parseInt($(this).text());
            console.log(cardVal);
            $(this).addClass('shut');
            b.push(cardVal);


            var sum = b.reduce(add, 0);

            function add(a, b) {
                return a + b;
            };
            if (sum > 10) {
                alert('exceeds max sum');
                b.length = 1;
                console.log(b);
                sum = b.reduce(add, 0);
            }
        }
        if (sum > totalRoll) {
            alert('selected does not meet total');
        } else if (sum === totalRoll) {
            alert('correct');
            b.length = 0;
            sum = b.reduce(add, 0);
        }

        console.log(sum); // 6

        //  parseInt(cardTotal);

        //  console.log(b.length, cardTotal);
        console.log(totalRoll);
    });
    cards($('li'));

    // cards($('li')).toArray();
});
