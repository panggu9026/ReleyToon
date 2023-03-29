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

// var connection: Connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "toon",
//     port: 3305,
// });

connection.connect();
app.use(bodyParser.urlencoded({ extended: true }));

let today = new Date()

//comment_insert
app.post("/comment_insert/:index", function (req: Request, res: Response) {
    //console.log(req)
    console.log(req.body)
    var comment_nickname = req.body.title
    var comment_date = today
    var comment_content = req.body.contents
    var comment_pwd = req.body.password
    var index = req.params.index

    var commnet_insert_sql = 'insert into toon.comment '
        + '(comment_nickname, comment_date, comment_content, comment_pwd, relay_participation_rp_id) ' +
        'values (?, ?, ?, ?, ?);'

    connection.query(commnet_insert_sql, [comment_nickname, comment_date, comment_content, comment_pwd, index], function (err: MysqlError | null, result: any) {
        //console.log(board_insert_sql)
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            res.redirect('http://localhost:4200/relay-participant-detail-page;item=' + index);
        }
    });
})

//comment_list_count
app.get("/comment_list_count/:index", function (req: Request, res: Response) {
    var index = req.params.index
    var comment_count = 'select count(*) as count from toon.comment where relay_participation_rp_id = ?;'
    connection.query(comment_count, [index], function (err: MysqlError | null, result: any) {
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            res.status(200).json(result).end()
            //res.redirect('http://localhost:4200/participating-works');
        }
    })
})

//comment_read
app.get("/comment_list/:index", function (req: Request, res: Response) {
    var index = req.params.index
    var comment_sql = 'SELECT comment_id, comment_nickname, date_format(comment_date, "%Y-%m-%d") as comment_date, comment_pwd, comment_content ' +
        'FROM toon.comment where relay_participation_rp_id =? order by comment_id desc;'
    connection.query(comment_sql, [index], function (err: MysqlError | null, result: any) {
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            res.status(200).json(result).end()
            //res.redirect('http://localhost:4200/participating-works');
        }
    });
})

//participating board_modify
app.post("/comment_modify/:index", function (req: Request, res: Response) {
    console.log(req.body)
    var index
    var comment_id
    var comment_content
    var board_modify_sql = 'update toon.comment ' +
        'set comment_content = ?, ' +
        'comment_date = date_format(now(), "%Y-%m-%d"), ' +
        'where comment_id = ?;'
    connection.query(board_modify_sql, [comment_id, comment_content], function (err: MysqlError | null, result: any) {
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            res.redirect('http://localhost:4200/relay-participant-detail-page;item=' + index);
        }
    });
})

//participating board_delete
app.get("/comment_delete/:index", function (req: Request, res: Response) {
    var index = req.params.index
    console.log("index : " + index)
    console.log(req.body)
    var comment_id = req.body.comment_id
    console.log("comment_id : " + comment_id)
    var comment_delete_sql = 'delete from toon.comment where comment_id = ? and relay_participation_rp_id = ?;'
    connection.query(comment_delete_sql, [comment_id, index], function (err: MysqlError | null, result: any) {
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            res.redirect('http://localhost:4200/relay-participant-detail-page;item=' + index);
        }
    });
})


module.exports = app;