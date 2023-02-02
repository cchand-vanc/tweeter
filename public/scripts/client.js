/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const tweetDatabase = []

  const renderTweets = function (tweetArray) {

    for (const tweet of tweetArray) {
      const renderedTweet = createTweetElement(tweet);
      $('#tweets-container').append(renderedTweet);
    }
  };

  const createTweetElement = function (tweet) {

    const userInfo = tweet.user;
    const content = tweet.content;
    const daysAgo = timeago.format(tweet.created_at);


    const $tweet = $(
      `<article class="tweet">
    
    <header class="tweet-header">
      <span class="profile-info">${userInfo.name}</span>
      <span class="handle">${userInfo.handle}</span>
    </header>

    <p class="tweet-paragraph">
    ${content.text}
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

  //Form Submission for new tweets
  $('#tweet-form').submit(function (event) {
    event.preventDefault();

    const tweetData = $('#tweet-text').val();
    const serialData = $(this).serialize();
    
  //Validation checks
  console.log('tweetData: ', tweetData)
  console.log('tweetData.length: ', tweetData.length)
  
    if (tweetData.length === 0 ) {
       alert("Hmmm I didn't quite catch that. Please type something to tweet about!")
    }

    if (tweetData.length > 140) {
       return alert("Woah there chatterbox! Your tweet cannot be more than 140 characters!")
    }

  //POST /tweets/
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: serialData
    })
    // .done(function (res) { //mentor suggested using .done
    //   console.log('res', res)
    // });
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



