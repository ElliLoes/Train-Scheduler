// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDYHZtZnbeW6dUpY1axMZow3dVM_R5XSRY",
    authDomain: "fir-bootcamp-4fbb9.firebaseapp.com",
    databaseURL: "https://fir-bootcamp-4fbb9.firebaseio.com",
    projectId: "fir-bootcamp-4fbb9",
    storageBucket: "fir-bootcamp-4fbb9.appspot.com",
    messagingSenderId: "946491661719",
    appId: "1:946491661719:web:01393934618b69c7c978d2"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding trains

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grab user input

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_removed", function (childSnapshot) {
    $("#" + childSnapshot.key).remove();
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function (childSnapshot) {

    // Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");

    var deleteButton = $("<button>").text("Remove");

    deleteButton.on("click", function () {
        childSnapshot.ref.remove();
    });

    // Create the new row
    var newRow = $('<tr id="' + childSnapshot.key + '">').append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
        $("<td>").append(deleteButton),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

});




