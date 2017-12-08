$('.card').click(function(evt){
  if ($('.selected').length < 2 && $(evt.target).hasClass("selected") === false) {
    $(evt.target).toggleClass("selected");
  }
});
