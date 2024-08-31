// import { generateHash } from './lib/utils.js'
//Generate Hash for id button
// const myHash = generateHash()

// Generate Id button
const btnId: string = 'btn-recording-screen';
const overlayId: string = 'overlay-recording-screen';

let startButtonText: string = 'Start Recording';
let stopButtonText: string = 'Stop Recording';
document.body.innerHTML += `<div id='${overlayId}'><button id='${btnId}'>${startButtonText}</button></div>`;
const $button: HTMLButtonElement | null = document.querySelector(`#${btnId}`);
const $overlay: HTMLElement | null = document.querySelector(`#${overlayId}`);
//Set initial classes
if ($button && $overlay) {
    $button.classList.add('btn-recording');
    $button.classList.add('btn-recording-hidden');
    $overlay.classList.add('overlay-recording-hidden');
}

document.onkeydown = function (event: KeyboardEvent) {
    //keyCode = 82, R
    //keyCode = 83, S
    if (event.shiftKey && event.keyCode === 83) {// Keyboard combination Shift + S
        console.log("Start recording");
        //Toggle button classes
        if ($button && $overlay) {
            $button.classList.toggle('btn-recording-show');
            $button.classList.toggle('btn-recording-hidden');
            //Toggle Overlay classes
            $overlay.classList.toggle('overlay-recording-show');
            $overlay.classList.toggle('overlay-recording-hidden');
        }
    }
};

let mediaRecorder: MediaRecorder | undefined;
let mediaStream: MediaStream | undefined;

if ($button) {
    $button.addEventListener('click', async () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            //If it is recording, stop the recording.
            mediaRecorder.stop();
            cleanupMediaStream();
            $button.innerText = startButtonText;
        } else {
            //If it is not recording, start the recording.
            const media: MediaStream = await navigator.mediaDevices.getDisplayMedia({
                video: { frameRate: { ideal: 30 } }
            });
            mediaStream = media; // Store the media stream to use it later

            mediaRecorder = new MediaRecorder(media, {
                mimeType: 'video/webm;codecs=vp8,opus'
            });
            //here should put the animation 3,2,1
            await beginRecording();

            const [video] = media.getVideoTracks();
            video.addEventListener("ended", () => {
                if (mediaRecorder && mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                    cleanupMediaStream();
                }
            });

            mediaRecorder.addEventListener("dataavailable", (e: BlobEvent) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(e.data);
                link.download = "captura.webm";
                link.click();
            });
        }
    });
}

function cleanupMediaStream() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = undefined;
    }
}

async function beginRecording() {
    console.log("🚀  --> $button:", $button);
    if ($button && $overlay) {
        $button.classList.toggle('btn-recording-show');
        $button.classList.toggle('btn-recording-hidden');
        // $overlay.innerHTML += `<div class='overlay-recording-countdown'></div>`
        $overlay.classList.add('overlay-recording-countdown');
        setTimeout(() => {
            // $overlay.innerHTML = `<button id='${btnId}'>${startButtonText}</button>`
            console.log("finish animation");
            if (mediaRecorder) {
                mediaRecorder.start();
            }
            $button.innerText = stopButtonText;
            if ($overlay) {
                $overlay.classList.remove('overlay-recording-countdown');
                $overlay.classList.toggle('overlay-recording-show');
                $overlay.classList.toggle('overlay-recording-hidden');
            }
        }, 3000);
    }
}
