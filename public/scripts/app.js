/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
//LINE 81 creates an id for each newtweet like count. ensure text links to the likes key in data, and
// updates on the screen as you click on IDBTransaction. I.E, add the correct event listener
const data = [
  {
    user: {
      name: "Descartes",
      avatars: {
        small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088,
    likes: 0 // hardcoded initial likes count in order to use it in the litterals below.
  },

  {
    user: {
      name: "Newton",
      avatars: {
        small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227,
    likes: 0
  },

  {
    user: {
      name: "Johann von Goethe",
      avatars: {
        small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      handle: "@johann49"
    },
    content: {
      text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    created_at: 1461113796368,
    likes: 0
  }
];

$(document).ready(function() {
  renderTweets(data); //renders the tweets database
  loadTweets(); //loads the tweets database
  $(function() {
    $(".toggle").click(function() {
      $(".new-tweet").slideToggle();
      $("textarea").focus();
      $("textarea").select();
    });
  });

  function createTweetElement(obj) {
    //template for all new tweets below.
    let tweetAppend = `<article >
    <div class="userInfo">${obj.user.name}
    <img src= ${obj.user.avatars.regular}>
    <span>${obj.user.handle}</span>
    </div>
    <h2>${obj.content.text}</h2>     
    <div class="postInfo"> created on ${obj.formatDate}.
    <div class="${obj.user.name}" style="display:inline">${
      obj.likes
    } likes</div>
    <span>
    <img class="flag" src="/images/flag.png">
    <img class="like" src="/images/heart.png">
    <img class="retweet" src="/images/retweet.png">
    </span>
    </div>
    </section>`;
    return tweetAppend;
  } //createTweetElement function
  res.redirect("/urls");

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
    $.get("/tweets", function(tweetRequest) {
      renderTweets(tweetRequest);
    });
    $("textarea").val(""); //resets textarea upon new tweet submission.
  } //loadTweets function

  function validation(event) {
    let charCount = "";
    let newTweet = $("textarea").serialize();
    if (newTweet.length == 5) {
      //Starting at 5 to account for the characters "text="(see TEST line above)
      //preceding the actual content of the text area, and accurately stop at 140 chars
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
