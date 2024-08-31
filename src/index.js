// import { generateHash } from './lib/utils.js'
//Generate Hash for id button
// const myHash = generateHash()
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Generate Id button
var btnId = 'btn-recording-screen';
var overlayId = 'overlay-recording-screen';
var startButtonText = 'Start Recording';
var stopButtonText = 'Stop Recording';
document.body.innerHTML += "<div id='".concat(overlayId, "'><button id='").concat(btnId, "'>").concat(startButtonText, "</button></div>");
var $button = document.querySelector("#".concat(btnId));
var $overlay = document.querySelector("#".concat(overlayId));
//Set initial classes
if ($button && $overlay) {
    $button.classList.add('btn-recording');
    $button.classList.add('btn-recording-hidden');
    $overlay.classList.add('overlay-recording-hidden');
}
document.onkeydown = function (event) {
    //keyCode = 82, R
    //keyCode = 83, S
    if (event.shiftKey && event.keyCode === 83) { // Keyboard combination Shift + S
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
var mediaRecorder;
var mediaStream;
if ($button) {
    $button.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var media, video;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(mediaRecorder && mediaRecorder.state === 'recording')) return [3 /*break*/, 1];
                    //If it is recording, stop the recording.
                    mediaRecorder.stop();
                    cleanupMediaStream();
                    $button.innerText = startButtonText;
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, navigator.mediaDevices.getDisplayMedia({
                        video: { frameRate: { ideal: 30 } }
                    })];
                case 2:
                    media = _a.sent();
                    mediaStream = media; // Store the media stream to use it later
                    mediaRecorder = new MediaRecorder(media, {
                        mimeType: 'video/webm;codecs=vp8,opus'
                    });
                    //here should put the animation 3,2,1
                    return [4 /*yield*/, beginRecording()];
                case 3:
                    //here should put the animation 3,2,1
                    _a.sent();
                    video = media.getVideoTracks()[0];
                    video.addEventListener("ended", function () {
                        if (mediaRecorder && mediaRecorder.state === 'recording') {
                            mediaRecorder.stop();
                            cleanupMediaStream();
                        }
                    });
                    mediaRecorder.addEventListener("dataavailable", function (e) {
                        var link = document.createElement("a");
                        link.href = URL.createObjectURL(e.data);
                        link.download = "captura.webm";
                        link.click();
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
function cleanupMediaStream() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(function (track) { return track.stop(); });
        mediaStream = undefined;
    }
}
function beginRecording() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("🚀  --> $button:", $button);
            if ($button && $overlay) {
                $button.classList.toggle('btn-recording-show');
                $button.classList.toggle('btn-recording-hidden');
                // $overlay.innerHTML += `<div class='overlay-recording-countdown'></div>`
                $overlay.classList.add('overlay-recording-countdown');
                setTimeout(function () {
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
            return [2 /*return*/];
        });
    });
}
