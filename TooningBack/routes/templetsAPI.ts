import express, { Express, Request, Response } from 'express';
import mysql, { Connection, MysqlError } from 'mysql';
import * as bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//db접속
var connection: Connection = mysql.createConnection({
    host: "database-1.c4htb3mwooue.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "abcd1234",
    database: "toon",
    port: 3306,
});

//local db
// var connection: Connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "toon",
//     port: 3305,
// });

connection.connect();

app.get('/test', (req: Request, res: Response) => {
    var sql = "SELECT convert(templets_img using utf8) as src, templets_link as url FROM toon.templets";
    connection.query(sql, (err: MysqlError | null, result: any) => {
        if (err) {
            console.error(err)
            res.status(500).end()
            return
        }
        res.status(200).json(result).end()
    });
    //res.send('Typescript Hello');
});

module.exports = app;