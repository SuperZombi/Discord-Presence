const fs = require('fs');
const path = require('path');
const glob = require('glob');
const esbuild = require('esbuild');

const files = glob.sync('web_dev/src/**/*.jsx');
const tempEntry = 'temp_combined.jsx';
const combinedCode = files
	.map(file => fs.readFileSync(file, 'utf8'))
	.join('\n\n');
fs.writeFileSync(tempEntry, combinedCode);

esbuild.build({
	entryPoints: [tempEntry],
	bundle: true,
	outfile: 'web/dist/main.js',
	loader: { '.jsx': 'jsx' },
	platform: 'browser',
	format: 'iife',
	globalName: 'AppBundle',
	minify: true
}).then(() => {
	fs.unlinkSync(tempEntry);
	console.log('✅ Build Done: web/dist/main.js');
}).catch((err) => {
	console.error('❌ Build Error:', err.message);
	process.exit(1);
});
