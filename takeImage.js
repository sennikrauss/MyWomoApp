let takePicBtn = document.querySelector('#takePic');
let videoPlayer = document.querySelector('#player');
let canvasElement = document.querySelector('#canvas');
let clickForPic = document.querySelector('#clickPic');
let imagePickerArea = document.querySelector('#image-picker-area');
let cameraArea = document.querySelector('#camera-area');
let choosePicArea = document.querySelector('#pick-image');
let choosePicBtn = document.querySelector('#choosePic');
const inputPic = document.querySelector('#pic');

takePicBtn.addEventListener('click', initializeMedia);
choosePicBtn.addEventListener('click', ()=>{
  choosePicArea.style.display="block";
  cameraArea.style.display='none';
  videoPlayer.style.display='none';
  clickForPic.style.display="none";
});

function initializeMedia() {
  imagePickerArea.style.display = 'block';

  if(!('mediaDevices' in navigator)) {
    navigator.mediaDevices = {};
  }
  if(!('getUserMedia' in navigator.mediaDevices)) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      if(!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented'));
      }

      return new Promise( (resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
      })
    }
  }

  navigator.mediaDevices.getUserMedia({video: true})
    .then( stream => {

      cameraArea.style.display = 'block';
      choosePicArea.style.display = 'none';
      clickForPic.style.display="block";
      videoPlayer.srcObject = stream;
      videoPlayer.style.display = 'block';

    })
    .catch( err => {
      imagePickerArea.style.display = 'block';
    });
}

clickForPic.addEventListener('click', event => {
  event.preventDefault(); // nicht absenden und neu laden
  canvasElement.style.display = 'block';
  videoPlayer.style.display = 'none';
  clickForPic.style.display = 'none';
  let context = canvasElement.getContext('2d');
  context.drawImage(videoPlayer, 0, 0, canvasElement.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvasElement.width));
  videoPlayer.srcObject.getVideoTracks().forEach(track => {
    track.stop();
  })

  //const imageURI = canvasElement.toDataURL("image/jpg");

  canvasElement.toBlob( (blob) => {
    const file = new File( [ blob ], "mycanvas.png" );
    const dT = new DataTransfer();
    dT.items.add( file );
    inputPic.files = dT.files;
  });
});

