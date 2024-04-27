import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';


const wavesurfer = WaveSurfer.create({
  container: document.getElementById('waveform'),
  waveColor: '#e0bfb7',
  progressColor: '#95847f',
  url: '/If We Cant Be Lovers.mp3',
  width: 500,
  cursorColor: 'white',
  cursorWidth: 2,
  mediaControls: true,
  barWidth: 2,
});

const wsRegions = wavesurfer.registerPlugin(RegionsPlugin.create());
const random = (min, max) => Math.random() * (max - min) + min;
const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

let markers = [];
const zoomRange = document.getElementById('zoomRange');

zoomRange.addEventListener('input', (e) => {
  const minPxPerSec = e.target.valueAsNumber;
  wavesurfer.zoom(minPxPerSec);
});

window.randomChop = () => {
  const numMarkers = 8;
  const duration = wavesurfer.getDuration();

  markers.forEach(marker => wsRegions.clearRegions(marker));
  markers = [];

  wsRegions.enableDragSelection({
    color: 'rgba(255, 0, 0, 0.1)',
  })


  for (let i = 0; i < numMarkers; i++) {
    const randomTime = random(0, duration);
    const marker = wsRegions.addRegion({
      start: randomTime,
      barWidth: 5,
      color: randomColor(),
    });
    markers.push(marker);
  }
};

document.addEventListener('keydown', (event) => {
  const keyIndex = parseInt(event.key) - 1;
  if (keyIndex >= 0 && keyIndex < markers.length) {
    markers[keyIndex].play();
  }
});

wavesurfer.on('click', () => {
  wavesurfer.play();
});
