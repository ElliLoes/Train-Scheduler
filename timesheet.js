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

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

});

