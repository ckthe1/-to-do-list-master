const express = require('express');
const listRouter = express.Router();
const pg = require('pg');
// DB CONNECTION
const pool = pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'list_to_do',
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Postgresql connected');
});
pool.on('error', (error) => {
    console.log('Error with postgres pool', error);
});
listRouter.get('/', (req, res) => {
    console.log('GET route was hit');
    pool.query('SELECT * FROM "Do-them-loser";')
        .then((results) => {
            console.log(results.rows)
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with task select', error);
            res.sendStatus(500);
        });
});
listRouter.post('/', (req, res) => {
    console.log('post route was hit', req.body);
    let queryText = `INSERT INTO "Do-them-loser"("description", "motivation")
    VALUES($1, $2);`;

    pool.query(queryText, [req.body.description, req.body.motivation])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error with koala insert:', error);
            res.sendStatus(500);
        });
});
listRouter.put('/:id', (req, res) => {
    console.log('in put request');
    console.log('req.params', req.params);


    pool.query(`UPDATE "Do-them-loser"  SET "done"= 'yes' WHERE "id"=$1`, [req.params.id])
        .then(() => {
            res.sendStatus(204);
        }).catch((error) => {
            res.sendStatus(500);
        });
})
listRouter.delete('/:id', (req, res) => {
    console.log('/list DELETE request was hit');
    console.log('req.params', req.params);
    pool.query(`DELETE FROM "Do-them-loser" WHERE "id"=$1;`, [req.params.id])
        .then(() => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('there was an error on the task delete query', error);

            res.sendStatus(500);
        });
});
module.exports = listRouter;