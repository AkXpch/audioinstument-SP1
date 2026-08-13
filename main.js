

//find my test button
const testButton = document.getElementById("test-button");
// find our intro modal
const introModal = document.getElementById("intro-modal");
//console.log(introModal) // console.log() use to print information into brow
//find modal close button
const introModalCloseButton = document.getElementById("intro-modal-close");



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
const synth = new Tone.Synth();

function toneInit() {
    //connect Synth to audio output
    synth.connect(Tone.Destination);

}

// do something when we click that button
testButton.addEventListener("click",playTestNote);

function playTestNote(){
    synth.triggerAttackRelease("C4", "8n");
}

