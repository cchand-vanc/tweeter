/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(document).ready(() => {
const createTweetElement = function(tweetData) {
  const userInfo = tweetData.user;
  const content = tweetData.content;
  
  //Date calculation
  const currentDate = Math.floor(Date.now());
  const dateDifference = currentDate - tweetData.created_at;
  const daysAgo = Math.floor(dateDifference / 86400000); //86400000 = num of nanoseconds in a day
  
  
  return $(
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
  }
  const $tweet = createTweetElement(tweetData);
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet);
  $('#tweets-container').append($tweet);

}
)
  


  