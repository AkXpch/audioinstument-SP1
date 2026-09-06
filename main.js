

//find my test button
const testButton = document.getElementById("test-button");

// find key button
const key = document.getElementById("key-test");

// find our intro modal
const introModal = document.getElementById("intro-modal");
//console.log(introModal) // console.log() use to print information into brow
//find modal close button
const introModalCloseButton = document.getElementById("intro-modal-close");


// create valuable use to manage mouse bottom down
//is the mouse button held?
let mouseButtonDown = false;
// update our variable based on the mouse being held down
// addEventListener = watch for something happening, then run this function
window.addEventListener("mousedown", function(){ 
    mouseButtonDown = true;

});
window.addEventListener("mouseup", function(){
    mouseButtonDown = false;
});


/////Modal
// browser load html > browser load js > js open modal > user press modal(button) > modal closes > audio init
//user can also close modal with esc key
///show modal on page load
introModal.showModal();

introModalCloseButton.addEventListener("click", function closeIntroModal(){
    //close our modal
    introModal.close()
});
//when dialog closes by whatever means, load audio system
introModal.addEventListener("close", toneInit);




///// Tone

//create instuent and connect to audio
//const synth = new Tone.Synth(); - for one note at a time
const synth = new Tone.PolySynth(); // multiple note at a time

function toneInit() {
    
    //connect Synth to audio output
    synth.connect(Tone.Destination);

}

// do something when we click that button
testButton.addEventListener("click",playNote);

function playNote(e){
    //find the element that the event(e) ran on #target is build-in fucntion
    let keyPressed = e.target;
    console.log(keyPressed);

    // find the data-note attribute of that elements #data-..... is build-in fuction
    // eg. data-pizza -> let pizza = keyPressed.dataset.pizza
    let note = keyPressed.dataset.note;
    //console.log(note);
    //play the note for the right amount of time

    //if mouse button is held previously play note
    if(mouseButtonDown === true) {// == convert the type before compare so 5 == "5" is true 
                                //but === stricter! it compare without convert the type, so 5 === "5" is false
    
    synth.triggerAttack(note);
    }
}

function playImageNote(e){
    //find the element that the event(e) ran on #target is build-in fucntion
    let keyPressed = e.target;
    //console.log(keyPressed);

    // find the data-note attribute of that elements #data-..... is build-in fuction
    let note = keyPressed.dataset.note;
    //console.log(note);
    //play the note for the right amount of time
    //if mouse button is held previously play note

    synth.triggerAttack(note);
}

function endNote(e){
    let keyPressed = e.target;
    console.log(keyPressed)

    let note = keyPressed.dataset.note;

    synth.triggerRelease(note); // triggerRelease is Tone.js fuctions
}

// Check if the note move when move across keys
testButton.addEventListener("mousedown", playNote);
testButton.addEventListener("mouseenter", playNote);
testButton.addEventListener("mouseup", endNote);
testButton.addEventListener("mouseleave", endNote);

key.addEventListener("mousedown", playNote);
key.addEventListener("mouseenter", playNote);
key.addEventListener("mouseup", endNote);
key.addEventListener("mouseleave", endNote);

// Audio file playback
const playBackButton = document.getElementById("playback-button");
const audioTrack = document.getElementById("audio-track");

function playPauseAudio() {
    if(audioTrack.paused === true){
        audioTrack.play();
    }else {
        audioTrack.pause();
    }

}
playBackButton.addEventListener("click", playPauseAudio);


// Random location button - to randomly choose start time in the track.
// set the variable
const randomButton = document.getElementById("random-location");

function randomLocation() {
    let trackLength = audioTrack.duration; // trackLength = the actual length of whatever audio file is loaded
    audioTrack.currentTime = trackLength * Math.random(); // random from 0 to 1
}
randomButton.addEventListener("click", randomLocation);

// set variable for picture
const greenhousePainting = document.getElementById("greenhouse-painting");

// changing the pitch of the sound based on where your mouse is.
function pitchBend(e){
    //console.log(e,layerX);
    synth.set({
        detune: e.layerX
    });

}