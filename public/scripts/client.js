// <!-- link JS file and jQuery -->
//client.js and Chat.ejs are linked

//do i need to link to CHAT.ejs
//do i need to require jquery

<script type="text/javascript" src="/vendor/jquery-3.0.0.js"></script>

$(document).ready(function() {
  //form submission
  //SYNTAX REMINDER # is id, . is class
$("#submit-form").submit(function(event) {
  //avoid page reload
  event.preventDefault()

  //get the message
  let getMessage = $('input').val()

  //if the message IS NOT empty
  if(getMessage !== '') {
    //prep
    //area to append is CLASS MESSAGE
    let newMessage = "<p class ='message' >" + getMessage + "</p> ";

    //add/append the message to the box
    $('.PLACETOPUT').append(newMessage);

  //clearing the form
    $('input').val("")
  }
  db.query(
    //this needs to be an insert query are they compatible
    `QUERY`
  )
    .then((data) => {
      const favourites = data.rows;
      const templateVars = {};
      templateVars.favourites = favourites;
      res.render("favourites", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
})

});
