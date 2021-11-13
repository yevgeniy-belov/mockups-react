const fs = require( "fs-extra" );
const randomize = require( 'randomatic' );


module.exports = {
	
	create() {
		let blankProject = {
			"id": randomize( 'AAAAA' ),
			"name": "New Project",
			"domainDev": "http://localhost:2000",
			"domainProd": "/slides-angular",
			"hasTS": true,
            "hasHTML": true,
			"stories": []
		};
		let data = fs.readJsonSync( '../assets/slides-data.json' );
		data.projects.push( blankProject );
		fs.writeFileSync( '../assets/slides-data.json', JSON.stringify( data, null, 4 ) );
	}
}