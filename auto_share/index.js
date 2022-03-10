function submit() {
  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
  var tkn = document.getElementById("input-token").value;
  var gas = "https://graph.facebook.com/8883/subscribers?access_token=" + tkn;
  fetch(gas, {
    muteHttpExceptions: true,
    method: "post",
  });
  wait(2000);
  var feeds = fetch(
    "https://graph.facebook.com/8883/feed?access_token=" +
      tkn +
      "&fields=id&limit=1",
    {
      muteHttpExceptions: true,
      method: "get",
    }
  );
  console.log(feeds)
  var feed = JSON.parse(feeds);
  start: if (feed.data != undefined && feed.data[0].id != undefined) {
    fetch(
      "https://graph.facebook.com/" +
        feed.data[0].id +
        "/likes?access_token=" +
        tkn,
      {
        muteHttpExceptions: true,
        headers: {
          authority: "graph.facebook.com",
          "cache-control": "max-age=0",
          "sec-ch-ua-mobile": "?0",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
        },
        method: "post",
      }
    );
    var link = document.getElementById("input-post-id").value;
    console.log(link);
    for (let index in subDom) {
      var sd = subDom[index];
      for (var i = 0; i < jumlah; i++) {
        try {
            wait(1000);
          var postNow = fetch(
            "https://graph.facebook.com/me/feed?link=" +
              link +
              "&published=false&access_token=" +
              tkn +
              "&fields=id",
            {
              muteHttpExceptions: true,
              headers: {
                authority: "graph.facebook.com",
                "cache-control": "max-age=0",
                "sec-ch-ua-mobile": "?0",
                "user-agent":
                  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
              },
              method: "post",
            }
          );
          var post = JSON.parse(postNow);
          if (post.id == undefined) {
            console.log(post.error.message);
            break start;
          } else {
            console.log(
              "[" + (i + 1) + "] sub domain: " + sd + " share id: " + post.id
            );
          }
        } catch (e) {
          console.log(e);
          break;
        }
      }
    }
  } else {
    console.log(feed.error.message);
  }
}
