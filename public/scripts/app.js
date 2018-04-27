$(document).ready(function() {
  loadTweets(); //loads the tweets database
  $(function() {
    $(".toggle").click(function() {
      $(".new-tweet").slideToggle();
      $("textarea").focus();
      $("textarea").select();
    });
  });

  function createTweetElement(obj) {
    let likeCount = 0;

    let tweetAppend = `<article >
    <div class="userInfo">${obj.user.name}
    <img src= ${obj.user.avatars.regular}>
    <span>${obj.user.handle}</span>
    </div>
    <h2>${obj.content.text}</h2>     
    <div class="postInfo"> created on ${obj.formatDate}.
    <span>
    <img class="flag" src="/images/flag.png">
    <img class="like" src="/images/heart.png"> 
    <img class="retweet" src="/images/retweet.png">
    </span>
    </div>
    </section>`;

    return tweetAppend;
  } //createTweetElement function

  function renderTweets(arr) {
    for (let tweet of arr) {
      tweet.formatDate = moment(tweet.created_at).format("MMM Do YYYY");
      let single = createTweetElement(tweet);
      $(".oldTweets").prepend(single);
    }
  } //renderTweets function

  $("form").submit(function(event) {
    event.preventDefault();
    validation(event);
    textInput = "";
  }); //event listener

  function loadTweets() {
    $.get("/tweets", function(tweetJSON) {
      renderTweets(tweetJSON);
    });
    $("textarea").val(""); //resets textarea upon new tweet submission.
  } //loadTweets function

  function validation(event) {
    let charCount = "";
    let newTweet = $("textarea").serialize();
    console.log(newTweet);

    if (newTweet === "text=") {
      alert("no input");
    } else if (newTweet.length > 145) {
      alert("Limit exceeded");
    } else {
      $.post("/tweets", newTweet, function() {
        loadTweets();
      });
    }
  } //validation function
}); // doc ready function
