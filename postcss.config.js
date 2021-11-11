let test = require( './node_modules/berries/postcss-test-plugin' );

module.exports = {
  plugins: [
    require( 'postcss-import' ),
    require( 'postcss-simple-vars' ),
    require( 'postcss-mixins' ),
    require( 'postcss-nesting' ),
    require( 'postcss-extend' ),
    require( 'tailwindcss' ),
    require( 'autoprefixer' ),
    // test(),
  ]
}