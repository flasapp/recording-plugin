interface RecordingOptions {
    startButtonText?: string;
    stopButtonText?: string;
    buttonId?: string;
    overlayId?: string;
}
declare function initRecording(options?: RecordingOptions): (() => void) | undefined;

export { initRecording };
