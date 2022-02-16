// DO WE HAVE to require jquery

$(document).ready(function() {
  $('submit-form').submit(() => {
    console.log('my client.js file is connected')
    $('#message').text('try me');
  })

});
