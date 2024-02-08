
const photo1 = document.getElementById("photo");
const video1 = document.getElementById("video");
const showVideoButton1 = document.getElementById("showVideoButton");

showVideoButton1.addEventListener("click", function () {
    // Hide the photo
    photo1.style.display = "none";
    // Show the video
    video1.style.display = "block";
    // Start playing the video
    video1.play();
});