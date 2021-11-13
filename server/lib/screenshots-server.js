const { Cluster } = require( 'puppeteer-cluster' );
var fsx = require( 'fs-extra' );

async function generate( options, states ) {
    console.log( 'Generating Thumbnails...' );
    const cluster = await Cluster.launch( {
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 4,
        monitor: true,
    } );

    await cluster.task( async ( { page, data: data } ) => {
        await page.setViewport( {
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        } );
        await page.goto( data.url, { waitUntil: 'domcontentloaded' } );
        const screen = await page.screenshot();
        fsx.ensureDirSync( options.slidesPath );
        await fsx.writeFile(
            `${options.slidesPath}/${data.slideName
            }.jpeg`,
            screen
        );
    } );

    cluster.on( 'taskerror', ( err, data ) => {
        console.log( `  Error crawling ${data}: ${err.message}` );
    } );

    if ( options.slide ) {
        cluster.queue( {
            url: `http://localhost:${options.PORT}/${options.slide.id}`,
            slideName: options.slide.id,
        } );
    } else {
        for ( let i = 0; i < states.length; i++ ) {
            const state = states[i];
            console.log( state );

            if ( !options.force ) {
                if (
                    !fsx.existsSync(
                        `${options.slidesPath}/${state.id
                        }.jpeg`
                    )
                ) {
                    cluster.queue( {
                        url: `http://localhost:${options.PORT}/${state.id}`,
                        slideName: state.id,
                    } );
                }
            } else {
                cluster.queue( {
                    url: `http://localhost:${options.PORT}/${state.id}`,
                    slideName: state.id,
                } );
            }

        }
    }
    await cluster.idle();
    await cluster.close();
}
module.exports.generate = generate;