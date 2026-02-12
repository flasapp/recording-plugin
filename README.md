# @flasap/recording-screen

A simple and lightweight npm package to record the screen with a customizable button and overlay. Compatible with TypeScript and JavaScript (ESM & CommonJS).

## Installation

```bash
npm install @flasap/recording-screen
```

## Usage

### TypeScript / Modern JavaScript (ESM)

```typescript
import { initRecording } from '@flasap/recording-screen';

// Initialize the recording button and overlay
const stopRecording = initRecording({
  startButtonText: 'Start Recording',
  stopButtonText: 'Stop Recording',
  buttonId: 'my-record-btn', // optional
  overlayId: 'my-overlay'    // optional
});

// To cleanup/remove the button and listeners later if needed:
// stopRecording();
```

### CommonJS (Node.js / Older bundlers)

```javascript
const { initRecording } = require('@flasap/recording-screen');

initRecording();
```

### Browser (via CDN or script tag)

If you are using a bundler (Vite, Webpack, Parcel), just import it as shown above. The package includes a CSS file that is automatically imported if your bundler supports it.

If your bundler requires manual CSS import:
```javascript
import '@flasap/recording-screen/style.css';
```

## Shortcuts

- **Shift + S**: Toggle the recording button visibility.

## API

### `initRecording(options?)`

Initializes the recording interface (button and overlay) and sets up event listeners.

**Options Object:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `startButtonText` | `string` | `'Start Recording'` | Text for the start button. |
| `stopButtonText` | `string` | `'Stop Recording'` | Text for the stop button. |
| `buttonId` | `string` | `'btn-recording-screen'` | ID attribute for the button element. |
| `overlayId` | `string` | `'overlay-recording-screen'` | ID attribute for the overlay container. |

**Returns:**
A cleanup function `() => void` that removes event listeners and DOM elements created by the library.

## Development & Publishing

### Build

```bash
npm run build
```

### Publish

Since this is a scoped package (`@flasap/...`), it is **private** by default. To publish it publicly:

```bash
npm publish --access public
```

## License

ISC
