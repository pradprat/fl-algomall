$("main").waypoint(function(direction){
    if(direction == "down"){
        $("nav").addClass("mobile-navbar");
        $('.hamburger').addClass('sticky');
    }else{
        $("nav").removeClass("mobile-navbar");
        $('.hamburger').removeClass('sticky');
    }      
},  {
offset: "60px"
});



$("#collection").on("click" , function(){
  $("html,body").animate({scrollTop: $(".section_collections").offset().top}, 900)
});


//AGM token-click
$("#token").on("click" , function(){
  $("html,body").animate({scrollTop: $(".section_tokenomics").offset().top}, 700)


});

// connect-wallet
$('.sec_btn').on('click', function(){
  alert('Feature still in production')
})



// hamburger
$('.hamburger').on('click', function(){
  $('.hamburger').toggleClass("is-active");
  $('nav ul').toggleClass('mobile-nav');
  
  // back.classList.toggle('show');

  $('nav ul').toggleClass('slideRightReturn');
});