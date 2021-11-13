const express = require( "express" );
const fs = require( "fs-extra" );
const app = express();
app.use( express.json() );
const openInEditor = require( 'open-in-editor' );

const projects = require( './lib/projects' );
const stories = require( './lib/stories' );
const slides = require( './lib/slides' );
const thumbnails = require( './lib/thumbnails-server' );

const port = 6000;

app.use( function ( req, res, next ) {
	req.headers['content-type'] = "application/json";
	next();
} );

slides.modifySlidesListModule();

const editor = openInEditor.configure( {
	editor: 'code' // Important: VS Code should be installed using System Installer.
}, function ( err ) {
	console.error( 'Something went wrong: ' + err );
} );

app.get( '/api/projects', ( request, response ) => {
	let data = fs.readJsonSync( '../assets/slides-data.json' );
	response.json( data );
} );

app.post( '/api/project/create', ( request, response ) => {
	response.json( projects.create() )
} );

app.post( '/api/story/create', ( request, response ) => {
	stories.create( request );
} );

app.post( '/api/story/updateOrder', ( request, response ) => {
	response.json(slides.updateOrder( request ));
} );

app.post( '/api/slide/create', ( request, response ) => {
	slides.create( request );
} );

app.post( '/api/slide/editTS', ( request, response ) => {
	editor.open( `../app/slides/${request.body.slideId}/slide.ts` )
		.then( function () {
			console.log( `open: ${request.body.slideId}/slide.ts` );
		}, function ( err ) {
			console.error( 'Something went wrong: ' + err );
		} );
} );
app.post( '/api/slide/editTSX', ( request, response ) => {
	editor.open( `../src/slides/${request.body.slideId}.tsx` )
		.then( function () {
			console.log( `open: ${request.body.slideId}.tsx` );
		}, function ( err ) {
			console.error( 'Something went wrong: ' + err );
		} );
} );

app.post( '/api/slide/editHTML', ( request, response ) => {
	editor.open( `../app/slides/${request.body.slideId}/slide.html` )
		.then( function () {
			console.log( `open: ${request.body.slideId}/slide.html` );
		}, function ( err ) {
			console.error( 'Something went wrong: ' + err );
		} );
} );

app.post( '/api/slide/delete', ( request, response ) => {
	slides.delete( request );
} );

app.post( '/api/slide/deleteInstance', ( request, response ) => {
	slides.deleteInstance( request );
} );

app.post( '/api/slide/duplicate', ( request, response ) => {
	response.json(slides.duplicate( request ));
} );


app.post( '/api/slide/updateThumbnails', ( request, response ) => {
	thumbnails.generateSlides( request );
} );

app.listen( port, () => {
	console.log( `Example app listening at http://localhost:${port}` )
} )