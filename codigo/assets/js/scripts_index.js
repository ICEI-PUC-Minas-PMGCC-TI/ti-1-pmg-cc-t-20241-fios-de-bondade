var big_wrapper;
var hamburger_menu;

function declare() {
  big_wrapper = document.querySelector(".big-wrapper");
  hamburger_menu = document.querySelector(".hamburger-menu");
}

declare();

function events() {
  hamburger_menu.addEventListener("click", () => {
    big_wrapper.classList.toggle("active");
  });
}

events();

$(document).ready(function() {
  $('#btnAdicionar').click(function() {
    $('#sidenavCollapse').collapse('toggle');
  });
});