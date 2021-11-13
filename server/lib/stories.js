const fs = require( "fs-extra" );
const randomize = require( 'randomatic' );
const slides = require( '../lib/slides' );
const thumbnails = require( './thumbnails-server' );


module.exports = {

	create( request ) {
		let storyId = randomize( 'AAAAAAAAAA' );
		let slideId = randomize( 'AAAAAAAAAA' );
		let blankStory = {
			"id": storyId,
			"name": "New Story",
			"slides": [{
				"id": slideId,
			}]
		};
		let data = fs.readJsonSync( '../assets/slides-data.json' );
		for ( let i = 0; i < data.projects.length; i++ ) {
			let project = data.projects[i];
			if ( project.id === request.body.body ) {
				project.stories.unshift( blankStory );
				slides.write( slideId );
			}

			fs.writeFileSync( '../assets/slides-data.json', JSON.stringify( data, null, 4 ) );
		}
		slides.modifySlidesListModule();
		let opt = {
			slide: slideId,
			force: true,
			PORT: 2000,
			slidesPath: '../assets/thumbnails',
		};
		thumbnails.generate( opt );

	}
}