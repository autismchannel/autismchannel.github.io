 var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

function onYouTubeIframeAPIReady() {
  var player;
  player = new YT.Player('YouTubeBackgroundVideoPlayer', {
      videoId: 'd8su5RgPlLM', // YouTube Video ID
      width: 1280,               // Player width (in px)
      height: 720,              // Player height (in px)
      playerVars: {
        playlist: 'd8su5RgPlLM',
          autoplay: 1,        // Auto-play the video on load
          autohide: 1,
          disablekb: 1, 
          controls: 0,        // Hide pause/play buttons in player
          showinfo: 0,        // Hide the video title
          modestbranding: 1,  // Hide the Youtube Logo
          loop: 1,            // Run the video in a loop
          fs: 0,              // Hide the full screen button
          autohide: 0,         // Hide video controls when playing
          rel: 0,
          enablejsapi: 1
      },
      events: {
        onReady: function(e) {
            
            e.target.setPlaybackQuality('hd1080');
        },
        onStateChange: function(e) {
          if(e && e.data === 1){
              var videoHolder = document.getElementById('home-banner-box');
              if(videoHolder && videoHolder.id){
                videoHolder.classList.remove('loading');
              }
          }else if(e && e.data === 0){
            e.target.playVideo()
          }
        }
      }
  });
}