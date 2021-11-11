module.exports = {
	presets: [
	  require( './node_modules/berries/tailwind-berries.config' )
	],
	mode: 'jit',
	purge: ['./src/**/*.{js,ts,jsx,tsx,html}'],
	darkMode: false, // or 'media' or 'class'
  
  };
  