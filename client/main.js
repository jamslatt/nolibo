/*Template.signOut.onRendered(function() {
  $('#primaryCAC').focus();

jQuery.extend(jQuery.expr[':'], {
focusable: function (el, index, selector) {
    return $(el).is('a, button, :input, [tabindex]');
}
});

$(document).on('keypress', 'input,select', function (e) {

if (e.which == 13) {
    e.preventDefault();
    // Get all focusable elements on the page
    var $canfocus = $(':focusable');
    var index = $canfocus.index(document.activeElement) + 1;
    if (index >= $canfocus.length) index = 0;
    $canfocus.eq(index).delay(1000).focus();
}
});


$("#location").keypress(function(event) {
if (event.which == 13) {
  $('#submit').click();
}
});
})
*/
require('bootstrap');
require('jquery');
require('bootbox');

Template.signOut.onRendered(function() {
  $(document).on('keypress', function (e) {

  if (e.which == 13) {
      event.preventDefault();
  }

})
})
