$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const charsRemaining = 140 - ($(this).val().length);
    console.log(charsRemaining)
    
    const counter = $(this).closest('.new-tweet').find('.counter').text(charsRemaining);

    if (charsRemaining < 0) {
      $(counter).addClass('negativeChars');
    }

    if (charsRemaining >= 0) {
      $(counter).addClass('counter');
      $(counter).removeClass('negativeChars');
    }

  });
});