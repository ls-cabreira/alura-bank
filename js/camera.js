const cameraButton = document.querySelector('[data-video-botao]');
const camera = document.querySelector('[data-camera]');
const video = document.querySelector('[data-video]');
const takePicture = document.querySelector('[data-tirar-foto]');

const confirmation = document.querySelector('[data-mensagem]');
const confirmationCanvas = document.querySelector('[data-video-canvas]');
let imageURL = '';
const sendPicture = document.querySelector('[data-enviar]');

cameraButton.addEventListener('click', async () => {
    const videoStart = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

    video.srcObject = videoStart;

    cameraButton.style.display = 'none';
    camera.style.display = 'initial';
})


takePicture.addEventListener('click', () => {
    confirmationCanvas.getContext('2d').drawImage(video, 0, 0, confirmationCanvas.width, confirmationCanvas.height);
    imageURL = confirmationCanvas.toDataURL('image/jpeg');

    camera.style.display = 'none';
    confirmation.style.display = 'initial';
})

sendPicture.addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem('cadastro'));

    data.image = imageURL;

    localStorage.setItem('cadastro', JSON.stringify(data));

    window.location.href = "/pages/abrir-conta-form-3.html";
})