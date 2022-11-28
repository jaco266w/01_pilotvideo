let canvas = document.getElementById("decoyVideo"),
  ctx = canvas.getContext("2d"),
  video = document.getElementById("mainVideo");

setCanvasDimension();
paintStaticVideo();

video.addEventListener("play", function () {
  let video = this; //cache
  (function loop() {
    if (!video.paused && !video.ended) {
      ctx.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
      setTimeout(loop, 1000 / 30); // drawing at 30fps
    }
  })();
});

video.addEventListener("seeked", () => {
  paintStaticVideo();
});

window.addEventListener("resize", () => {
  setCanvasDimension();
  if (video.paused) {
    paintStaticVideo();
  }
});

function setCanvasDimension() {
  canvas.height = video.offsetHeight;
  canvas.width = video.offsetWidth;
}

function paintStaticVideo() {
  ctx.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
}