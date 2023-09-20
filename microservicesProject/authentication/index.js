const express = require( 'express' )
const app = express()
const port = 1208

app.use( express.static( __dirname ) );

app.use( express.urlencoded( { extended: false } ) )

app.post( '/AutenticateEnt', ( req, res ) =>
{
    if ( req.body.email == "faresQ@atypon.com" )
    {
        if ( req.body.password == "fares!" )
        {
            res.redirect( 'http://localhost:1207/EnterData' )
        }
    }
    res.redirect( 'http://localhost:1207/' )
} );

app.post( '/AutenticateRes', ( req, res ) =>
{
    if ( req.body.email == "faresQ@atypon.com" )
    {
        if ( req.body.password == "fares!" )
        {
            res.redirect( 'http://localhost:1209/ShowResults.html' )
        }
    }
    res.redirect( 'http://localhost:1209/' )
} );

app.listen( port, () =>
{
    console.log( `Authentication Service listening on port ${ port }` )
} );