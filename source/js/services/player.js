import SoundCloud from 'SC'

// Initialize soundcloud client
SC.initialize({
  client_id: '739b39925c3cc275aeb03837ff27762c'
})

// Basic player methods
let player = {
  sound: false,
  loadTrack: (track) => {
    SC.stream(`/tracks/${track}`, (sound) => {
      player.sound = sound
      player.play()
    })
  },
  play: () => player.sound.play(),
  pause: () => player.sound.pause(),
  next: () => {

  }
}

// var analyser = context.createAnalyser()
// analyser.fftSize = 64;
// var frequencyData = new Uint8Array(analyser.frequencyBinCount);

// // Get the frequency data and update the visualisation
// function update() {
//   requestAnimationFrame(update);

//   analyser.getByteFrequencyData(frequencyData);ighgth
// };

// // Hook up the audio routing...
// // player -> analyser -> speakers
// // (Do this after the player is ready to play - https://code.google.com/p/chromium/issues/detail?id=112368#c4)
// var source = context.createMediaElementSource(this);
// source.connect(analyser);
// analyser.connect(context.destination);

// Kick it off...
// update();

export default player
