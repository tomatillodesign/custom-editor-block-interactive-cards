

let setCardHeight = function() {

     console.log('setCardHeight = Running');

     const cardSets = document.querySelectorAll('.interactive-cardset');
     console.log(cardSets);
     console.log('cardSets length: ' + cardSets.length);

     for(i = 0; i < cardSets.length; i++) {

          let cardHeight = cardSets[i].dataset.cardHeight;
          console.log('Card Height: ' + cardHeight);

          var flipCards = cardSets[i].querySelectorAll('.card-flip');
          console.log('Flip cards: ' + flipCards);

          for(j = 0; j < flipCards.length; j++) {

               flipCards[j].style.height = cardHeight + "px";
               console.log('Style updated: ' + flipCards[j]);

          }

     }

}

setCardHeight();
