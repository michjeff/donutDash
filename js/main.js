$("#costumeThumb").click(function () {
   $("#challengeSlide").fadeOut(700);
   $("#donateSlide").fadeOut(700);
   $("#corporateSlide").fadeOut(700);
   $("#sponsorRunnerSlide").fadeOut(700);
   $("#costumeSlide").fadeIn(700);
   $('.thumbsContainer img').removeClass();
   $('#costumeThumb img').addClass('current');

});

$("#challengeThumb").click(function () {
   $("#costumeSlide").fadeOut(700);
   $("#donateSlide").fadeOut(700);
   $("#corporateSlide").fadeOut(700);
   $("#sponsorRunnerSlide").fadeOut(700);
   $("#challengeSlide").fadeIn(700);
   $('.thumbsContainer img').removeClass();
   $('#challengeThumb img').addClass('current');

});   
$("#donateThumb").click(function () {
   $("#costumeSlide").fadeOut(700);
   $("#challengeSlide").fadeOut(700);
   $("#corporateSlide").fadeOut(700);
   $("#sponsorRunnerSlide").fadeOut(700);
   $("#donateSlide").fadeIn(700);
   $('.thumbsContainer img').removeClass();
   $('#donateThumb img').addClass('current');
});

$("#corporateThumb").click(function () {
   $("#costumeSlide").fadeOut(700);
   $("#challengeSlide").fadeOut(700);
   $("#donateSlide").fadeOut(700);
   $("#sponsorRunnerSlide").fadeOut(700);
   $("#corporateSlide").fadeIn(700);
   $('.thumbsContainer img').removeClass();
   $('#corporateThumb img').addClass('current');
});
$("#sponsorRunnerThumb").click(function () {
   $("#costumeSlide").fadeOut(700);
   $("#challengeSlide").fadeOut(700);
   $("#donateSlide").fadeOut(700);
   $("#corporateSlide").fadeOut(700);
   $("#sponsorRunnerSlide").fadeIn(700);
   $('.thumbsContainer img').removeClass();
   $('#sponsorRunnerThumb img').addClass('current');
   // $("#costumeSlide").fadeOut(700);
   // $("#challengeSlide").fadeIn(700);

});