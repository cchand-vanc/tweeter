/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


  const renderTweets = function(tweetArray) {
    
    
    for (const tweet of tweetArray) {
      console.log('tweetArray', tweetArray)
      console.log('tweet', tweet)
      const renderedTweet = createTweetElement(tweet);
      $('#tweets-container').append(renderedTweet);
    }
  };

  const createTweetElement = function (tweet) {

    const userInfo = tweet.user;
    const content = tweet.content;

    //Date calculation
    const currentDate = Math.floor(Date.now());
    const dateDifference = currentDate - tweet.created_at;
    const daysAgo = Math.floor(dateDifference / 86400000); //86400000 = num of nanoseconds in a day


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
      <span class="date-written">${daysAgo} days ago</span>
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

  $(document).ready(() => {
    renderTweets(tweetData)
 }
);

