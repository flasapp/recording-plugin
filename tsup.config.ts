import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	clean: true,
	sourcemap: true,
	// Using css: true extracts CSS. 
	// To avoid hashing, we rely on tsup default which usually is [name].css
	// If it's still hashing, it might be due to internal tsup logic when importing from JS.
	// We can try to use noExternal to bundle it? No, we want it extracted.
	css: true,
	splitting: false,
	// This might help with naming
	name: 'recording-screen'
});
