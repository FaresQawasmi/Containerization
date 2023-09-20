const express = require( 'express' )
const app = express()
const port = 1207
const mysql = require( 'mysql2' );
const configuration =
{
    host: "mysqldb",
    user: "root",
    password: "fares123",
    port: 3306
}

app.use( express.static( __dirname ) );
app.use( express.urlencoded( { extended: false } ) )


function insertTemp( temp )
{
    var con = mysql.createConnection( configuration );

    con.connect( function ( err )
    {
        if ( !err )
        {
            console.log( "EnterDataWebApp Connected to mysql database successfully !" );

            let sqlStatement = "CREATE DATABASE IF NOT EXISTS Data;"
            con.query( sqlStatement, function ( err, result )
            {
                if ( !err ) { console.log( "Database created successfully!" ); }
                else
                {
                    console.log( "Error creating database. \n" + err );
                }
            }
            );

            let sqlStatement1 = "CREATE TABLE IF NOT EXISTS Data.Temps (id INT NOT NULL AUTO_INCREMENT, temp INT, PRIMARY KEY (id));";
            con.query( sqlStatement1, function ( err, result )
            {
                if ( !err ) { console.log( "Table created successfully!" ); }
                else
                {
                    console.log( "Error creating table. \n" + err );
                }
            }
            );

            var sql = "INSERT INTO Data.Temps (temp) VALUES ('" + temp + "')";
            con.query( sql, function ( err, result )
            {
                if ( !err ) { console.log( "Record inserted successfully" ); }
                else
                {
                    console.log( "Error inserting record. \n" + err );
                }
            }
            );
        }
        else
        {
            console.log( "Error connecting. \n" + err );
        }
    } );
}

app.get( '/', ( req, res ) =>
{
    res.sendFile( __dirname + '/login.html' )
} );

app.get( '/EnterData', ( req, res ) =>
{
    res.sendFile( __dirname + '/EnterData.html' );
} );

app.post('/StoreData', (req, res) => {
    const temp1 = req.body.temp1;
    const temp2 = req.body.temp2;
    const temp3 = req.body.temp3;

    insertTemp(temp1);
    insertTemp(temp2);
    insertTemp(temp3);

    res.redirect('http://localhost:1209/');
});

app.listen( port, () =>
{
    console.log( `Enter Data Web App listening on port ${ port }` )
} );