const fs = require( "fs-extra" );
const randomize = require( 'randomatic' );
const thumbnails = require( './thumbnails-server' );


module.exports = {

	modifySlidesListModule() {
		let slidesData = fs.readJsonSync( '../assets/slides-data.json', 'utf8' );
		let slidesList = [];
		slidesData.projects.forEach( project => {
			project.stories.forEach( story => {
				story.slides.forEach( slide => {
					slidesList.push( slide.id );
				} );
			} );
		} );

		let slidesDataContent =
			`
import type { RouteObject } from 'react-router-dom';
${slidesList.map( function ( component ) {
				return `\nimport ${component} from './${component}';`
			} )
				.filter( ( value, index, self ) => self.indexOf( value ) === index )
				.join( "" )}

export function SlidesRoutes() {		
	
	let routes: RouteObject[] =[${slidesList.map( function ( component ) {
		return `\n		{ path: "${component}", element: <${component} /> },`
		} ).join( "" )}
	];

	return routes;
}

`;
		fs.writeFileSync( '../src/slides/RoutesList.tsx', slidesDataContent );

	},

	create( request ) {
		let projectId = request.body.params.projectId;
		let storyId = request.body.params.storyId;
		let slideId = randomize( 'AAAAAAAAAA' );
		let slide = {
			"id": slideId,
		}

		let data = fs.readJsonSync( '../assets/slides-data.json' );

		data.projects.forEach( project => {
			if ( project.id === projectId ) {
				project.stories.forEach( story => {
					if ( story.id === storyId ) {
						story.slides.splice( story.slides.length, 0, slide );
						fs.writeFileSync( '../assets/slides-data.json', JSON.stringify( data, null, 4 ) );
						module.exports.write( slideId );
						module.exports.modifySlidesListModule();
					}
				} )
			}
		} );
		let opt = {
			slide: slideId,
			force: true,
			PORT: 2000,
			slidesPath: '../assets/thumbnails',
		};
		thumbnails.generate( opt );
	},

	write( id, content ) {
		let tsxContent = '';
		if ( content !== undefined ) {
			tsxContent = content;
		} else {
			tsxContent = `
function ${id}() {
	return (
		<div className='absolute inset-0 flex bg-content'>
			<div className='m-auto text-3xl text-center'>
				<h1>Hello there!</h1>
				<br />
				I'm a new slide :)
			</div>
		</div>
	);
}

export default ${id};
`;
		}

		fs.writeFileSync( `../src/slides/${id}.tsx`, tsxContent );
	},

	delete( request ) {
		let projectId = request.body.params.projectId;
		let storyId = request.body.params.storyId;
		let slideId = request.body.params.slideId;

		let data = fs.readJsonSync( '../assets/slides-data.json' );

		data.projects.forEach( project => {
			if ( project.id === projectId ) {
				project.stories.forEach( story => {
					if ( story.id === storyId ) {
						story.slides.forEach( function ( slide, index, object ) {
							if ( slide.id === slideId ) {
								object.splice( index, 1 );
								fs.removeSync( `../src/slides/${slideId}.tsx` );
								fs.writeFileSync( '../assets/slides-data.json', JSON.stringify( data, null, 4 ) );
								module.exports.modifySlidesListModule();
							}
						} );
					}
				} );
			}
		} )
	},

	deleteInstance( request ) {
		let projectId = request.body.params.projectId;
		let storyId = request.body.params.storyId;
		let slideId = request.body.params.slideId;

		let data = fs.readJsonSync( '../assets/slides-data.json' );

		data.projects.forEach( project => {
			if ( project.id === projectId ) {
				project.stories.forEach( story => {
					if ( story.id === storyId ) {
						story.slides.forEach( function ( slide, index, object ) {
							if ( slide.id === slideId ) {
								object.splice( index, 1 );
								fs.writeFileSync( '../assets/slides-data.json', JSON.stringify( data, null, 4 ) );
							}
						} );
					}
				} );
			}
		} )
	},
	arrayMove(arr, fromIndex, toIndex) {
		var element = arr[fromIndex];
		arr.splice(fromIndex, 1);
		arr.splice(toIndex, 0, element);
	},

	updateOrder( request ) {
		let projectId = request.body.params.projectId;
		let storyId = request.body.params.storyId;
		let previousIndex = request.body.params.previousIndex;
		let currentIndex = request.body.params.currentIndex;

		let data = fs.readJsonSync( '../assets/slides-data.json' );

		data.projects.forEach( project => {
			if ( project.id === projectId ) {
				project.stories.forEach( story => {
					if ( story.id === storyId ) {
						module.exports.arrayMove( story.slides, previousIndex, currentIndex, );
						
						
					}
				} );
			}
			fs.writeFileSync( '../assets/slides-data.json', JSON.stringify( data, null, 4 ) );
		} )
	},

	duplicate( request ) {
		let projectId = request.body.params.projectId;
		let storyId = request.body.params.storyId;
		let slideId = request.body.params.slideId;
		let newSlideId = randomize( 'AAAAAAAAAA' );

		let data = fs.readJsonSync( '../assets/slides-data.json' );

		data.projects.forEach( project => {
			if ( project.id === projectId ) {
				project.stories.forEach( story => {
					if ( story.id === storyId ) {
						const selectedSlideIndex = story.slides.findIndex( slide => slide.id === slideId );
						console.log( selectedSlideIndex );
						story.slides.splice( selectedSlideIndex + 1, 0, {
							"id": newSlideId,
						} );
						fs.writeFileSync( '../assets/slides-data.json', JSON.stringify( data, null, 4 ) );
						story.slides.forEach( function ( slide, index, object ) {
							if ( slide.id === slideId ) {
								let re = new RegExp( `${slideId}`, 'g' );
								let content = fs.readFileSync( `../src/slides/${slideId}.tsx`, "utf-8" ).replace( re, newSlideId );
								module.exports.write( newSlideId, content );
							}
						} );
					}
				} );
			}
			module.exports.modifySlidesListModule();
		} )

		let opt = {
			slide: newSlideId,
			force: true,
			PORT: 2000,
			slidesPath: '../assets/thumbnails',
		};
		thumbnails.generate( opt );
		return newSlideId;
	}
}