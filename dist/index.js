// src/index.ts
function initRecording(options = {}) {
  const btnId = options.buttonId || "btn-recording-screen";
  const overlayId = options.overlayId || "overlay-recording-screen";
  let startButtonText = options.startButtonText || "Start Recording";
  let stopButtonText = options.stopButtonText || "Stop Recording";
  if (document.getElementById(overlayId)) {
    console.warn("Recording overlay already exists.");
    return;
  }
  document.body.innerHTML += `<div id='${overlayId}'><button id='${btnId}'>${startButtonText}</button></div>`;
  const $button = document.querySelector(`#${btnId}`);
  const $overlay = document.querySelector(`#${overlayId}`);
  if ($button && $overlay) {
    $button.classList.add("btn-recording");
    $button.classList.add("btn-recording-hidden");
    $overlay.classList.add("overlay-recording-hidden");
  }
  const handleKeyDown = function(event) {
    if (event.shiftKey && (event.key === "S" || event.key === "s" || event.keyCode === 83)) {
      console.log("Start recording");
      if ($button && $overlay) {
        $button.classList.toggle("btn-recording-show");
        $button.classList.toggle("btn-recording-hidden");
        $overlay.classList.toggle("overlay-recording-show");
        $overlay.classList.toggle("overlay-recording-hidden");
      }
    }
  };
  document.addEventListener("keydown", handleKeyDown);
  let mediaRecorder;
  let mediaStream;
  async function beginRecording() {
    console.log("\u{1F680}  --> $button:", $button);
    if ($button && $overlay) {
      $button.classList.toggle("btn-recording-show");
      $button.classList.toggle("btn-recording-hidden");
      $overlay.classList.add("overlay-recording-countdown");
      setTimeout(() => {
        console.log("finish animation");
        if (mediaRecorder) {
          mediaRecorder.start();
        }
        $button.innerText = stopButtonText;
        if ($overlay) {
          $overlay.classList.remove("overlay-recording-countdown");
          $overlay.classList.toggle("overlay-recording-show");
          $overlay.classList.toggle("overlay-recording-hidden");
        }
      }, 3e3);
    }
  }
  function cleanupMediaStream() {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      mediaStream = void 0;
    }
  }
  if ($button) {
    $button.addEventListener("click", async () => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        cleanupMediaStream();
        $button.innerText = startButtonText;
      } else {
        try {
          const media = await navigator.mediaDevices.getDisplayMedia({
            video: { frameRate: { ideal: 30 } }
          });
          mediaStream = media;
          mediaRecorder = new MediaRecorder(media, {
            mimeType: "video/webm;codecs=vp8,opus"
          });
          await beginRecording();
          const [video] = media.getVideoTracks();
          video.addEventListener("ended", () => {
            if (mediaRecorder && mediaRecorder.state === "recording") {
              mediaRecorder.stop();
              cleanupMediaStream();
            }
          });
          mediaRecorder.addEventListener("dataavailable", (e) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(e.data);
            link.download = "captura.webm";
            link.click();
          });
        } catch (err) {
          console.error("Error starting screen recording:", err);
        }
      }
    });
  }
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    if ($overlay) {
      $overlay.remove();
    }
    cleanupMediaStream();
  };
}
export {
  initRecording
};
//# sourceMappingURL=index.js.map