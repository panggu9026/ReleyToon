import express, { Express, Request, Response } from 'express';
import mysql, { Connection, MysqlError } from 'mysql';
const app: Express = express();
import * as bodyParser from 'body-parser';

/**
 * 파일 명 : commnets.js
 * @author : 주민지
 * @date : 23.01.27
 * @description : 댓글 기능 API
 */

var connection: Connection = mysql.createConnection({
    host: "database-1.c4htb3mwooue.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "abcd1234",
    database: "toon",
    port: 3306,
});

app.get('/userlogin', (req: Request, res: Response) => {
    var templets_sql = 'SELECT user_no, user_pwd FROM toon.users ;'
    connection.query(templets_sql, (err: MysqlError | null, result: any) => {
        if (err) {
            console.error(err)
            res.status(500).end()
            return
        }
        res.status(200).json(result).end()
    });
});

connection.connect();
app.use(bodyParser.urlencoded({ extended: true }));