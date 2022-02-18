//do i need to link to CHAT.ejs


$(() => {
  console.log("client.js OO")
  // //form submission
  // //SYNTAX REMINDER # is id, . is class
  // const renderMessages = function(messages) {
  //   //loops through message
  //   for (const message of messages) {
  //     //calls createMessageElement for each tweet
  //     $(".messageContainer").prepend(createMessageElement(message));
  //     //takes return value and prepends it to each message container div
  //   }
  // };


  // const createMessageElement = function(message) {
  //   const clean = function(string) {
  //     //creating function to nullify script in textarea
  //     let div = document.createElement("div");
  //     div.appendChild(document.createTextNode(string));
  //     return div.innerHTML;
  //   };
  //   const $message = `
  //   <article class="message">
  //         <header class="messageHeader">
  //           <address>${message.user}</address>
  //         </header>
  //         <div class="textInMessage">
  //           <h5>
  //           ${clean(message.content)}
  //           </h5>
  //         </div>
  //       </article>
  //   `;

  //   return $message;
  // };


  $("#messageForm").submit(function(event) {
    event.preventDefault();
    //stopping the default call

    const messageFormData = $(this).serialize();
    const idFromURL = window.location.href;
    const splitArray = idFromURL.split("/");
    const id = splitArray[4];
    // console.log(splitArray)
    // console.log(idFromURL)
    // console.log(id)
    //serializing form input
    $.post(`/messages/${id}/chat`, messageFormData).then((response) => {
      // loadMessages();
      window.location.reload();
       //calling loadMessages
      // $(".form-control").trigger("reset");
      //resetting the form so input clears
    });
  });

  // const loadMessages = function() {
  //   console.log("loadmessage");
  //   $.ajax({
  //     url: "/messages/2/chat",
  //     success: function(response) {
  //       console.log(response)
  //       // renderMessages(response)
  //     }
  //   })
  //   // $.get("/2/chat").then((response) => {
  //   //   //sending to renderMessages
  //   //   renderMessages(response);
  //   // });
  // };
  // loadMessages();
  // //calling loadMessages

});
