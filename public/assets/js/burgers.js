$(function() {
  $(".changeDevoured").on("click", function(e) {
    e.preventDefault();
    var id = $(this).data("id");
    var changeDevoured = $(this).data("devour");

    var changeDevouredState = {
      devoured: changeDevoured
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: changeDevouredState
    }).then(
      function() {
        console.log("devoured state is ", changeDevoured);


        //built in refresh method
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    if ($("input #burger_name_input.val") == "") {
      alert("Please fill in a Burger Name");
    } else {

    var newBurger = {
      burger_name: $("#burger_name_input").val().trim(),
      devoured: 1
    };


    //ajax post to api/burgers
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        //refresh page method
        location.reload();
      }
    );
  }
  });

});
