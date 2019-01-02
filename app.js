$(() => {
    let topics = ["hippo", "kangaroo", "koala", "zebra", "bear"];

    function renderButtons() {
        $(".buttons").empty();
    // loop to append buttons for every string in array when page loads
    for (let i = 0; i < topics.length; i++) {
        // create buttons here
        let animalButton = $("<button>");
        // Adding a class
        animalButton.addClass("animal-btn btn btn-primary");
        // Adding a data-attribute
        animalButton.attr("animalName", topics[i]);
        // button text
        animalButton.text(topics[i]);
        //handleButtonClick
        animalButton.on('click', displaySearchResults)
        // Adding the button to the div
        $(".buttons").append(animalButton);
    };
}

renderButtons();

// event for adding giphy buttons
$("#addAnimalButton").on("click", function (event) {

    event.preventDefault();
    // if add animal input empty
    if ($("#addAnimalInput").val() === ""){
        return;
    } else {
    // grab input from textbox
    let newAnimal = $("#addAnimalInput").val().trim();
    $("#addAnimalInput").val('');

    // Add to array
    topics.push(newAnimal);

    renderButtons();
    }
});

// function to display results

function displaySearchResults() {
    let animal = $(this).attr("animalName");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=X3lQMFVyJmL95OOJuO2fAKqWg0G8j3Se";
    // AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // After the data from AJAX request comes back
    .then(function (response) {
        let searchResults = $(".searchResults")
        searchResults.empty();

        for (let i =0; i < response.data.length; i++) {
            let gif = response.data[i];
            let gifDiv = $("<div class='gifDiv'>");
            // let animatedImgURL = gif.images.original.url;
            let animatedImgURL = gif.images.fixed_height.url;
            // let animatedImage = $("<img class='gifImg'>").attr({ src: animatedImgURL, "data-state": "animate"});
            // console.log(animatedImage);
            let stillImgURL = gif.images.fixed_height_still.url;
            let image = $("<img class='gifImg'>").attr({ src: stillImgURL, "data-still": stillImgURL, 'data-animate': animatedImgURL, "data-state": "still"});

            gifDiv.append(image);

            let rating = gif.rating;
            let pOne = $("<p>").text("Rating:" + rating);
            gifDiv.append(pOne);
            searchResults.append(gifDiv);
        }
    });
}

$(document.body).on("click", ".gifImg", function () {
    // console.log ("click");
    let state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

});