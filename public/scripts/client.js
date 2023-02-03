/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {


  const tweetDatabase = []

  const renderTweets = function (tweetArray) {
    $('#tweets-container').empty();

    for (const tweet of tweetArray) {
      const renderedTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(renderedTweet);
    }
  };

  const escape = function (string) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {

    const userInfo = tweet.user;
    const content = tweet.content;

    const safeContent = escape(content.text);
    const daysAgo = timeago.format(tweet.created_at);


    const $tweet = $(
      `<article class="tweet">
      
      <header class="tweet-header">
      <div class="face-and-name">
      <span class="profile-avatar">
      <img src="${userInfo.avatars}"></img>
      </span>
      <span class="profile-info">${userInfo.name}</span>
      </div>
      <span class="handle">${userInfo.handle}</span>
      </header>
      
    <p class="tweet-paragraph">
    ${safeContent}
    </p>

    <footer>
      <span class="date-written">${daysAgo}</span>
      <span class="action-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
    </article>`
    )

    return $tweet;
  };

  renderTweets(tweetDatabase)

  //STRETCH: Tweet button slides tweet box into view
  const $newTweet = $(`<section class="new-tweet">
<h2>Compose Tweet</h2>
<div class="validation-error"></div>
<form method="post" action="/tweets/" id="tweet-form">
  <textarea name="text" id="tweet-text" placeholder="What are you humming about?"></textarea>
  <div class="button-counter">
    <button type="submit">Tweet</button>
    <output name="counter" class="counter" for="tweet-text">140</output>
  </div>
</form>
</section>`);
  $('.new-tweet').prepend($newTweet);
  $newTweet.slideUp();

  $('.write-new-tweet').click(function () {
    $newTweet.slideDown("slow");
    $('#tweet-text').focus();
  })
  

  //Form Submission for new tweets
  $('#tweet-form').submit(function (event) {
    event.preventDefault();

    const tweetData = $('#tweet-text').val();
    const serialData = $(this).serialize();

    //Validation checks - these should probably be their own function
    const $validationError = $('.validation-error');
    $validationError.slideUp();

    if (tweetData.length === 0) {
      $('.validation-error').empty();
      $validationError.text(`Cat got your tongue? 🐱 Write a tweet!`)
      $validationError.slideDown();
    }

    if (tweetData.length > 140) {
      $('.validation-error').empty();
      $validationError.text(`Woah there chatterbox! 📣 Your tweet is too long!`);
      return $validationError.slideDown();
    }

    if (tweetData.length > 0 && tweetData.length <= 140) {
      $validationError.slideUp();
    }

    //POST /tweets/
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: serialData,
      success: () => {
        loadTweets();
        $("#tweet-text").val("");
        $(".counter").val("140");
      }
    });
  });

  const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: '/tweets/',
      success: function (response) {
        return renderTweets(response)
      },
      error: function (error) {
        console.log('Error', error)
      }
    })
  }
  loadTweets()

});



