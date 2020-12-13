var trigger="";
$(".yes").click(function (){
  $(trigger).addClass("hid");
  $(".oldUser").removeClass("hid");
  trigger=".oldUser";
})

$(".no").click(function (){
  $(trigger).addClass("hid");
  $(".newUser").removeClass("hid");
    trigger=".newUser";
})
