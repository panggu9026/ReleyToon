import express, { Express, Request, Response } from 'express';
import mysql, { Connection, MysqlError } from 'mysql';
const app: Express = express();
import multer from "multer";
import * as bodyParser from 'body-parser';

/**
 * 파일 명 : file_manage.js
 * @author : 주민지
 * @date : 23.01.22
 * @description : base64로 인코딩된 이미지 insert 및 디코드 하여 조회 가능
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

//이미지 파일이 저장되는 경로
const upload = multer({ dest: 'uploads/images' });

let today = new Date()

//templets
app.get('/templets', (req: Request, res: Response) => {
    var templets_sql = 'SELECT rt.rt_id, templets_id, convert(templets_img using utf8) as src, ' +
        'rt.rt_title FROM toon.relay_toon rt, toon.templets t where rt.templets_templets_id=t.templets_id;'
    connection.query(templets_sql, (err: MysqlError | null, result: any) => {
        if (err) {
            console.error(err)
            res.status(500).end()
            return
        }
        res.status(200).json(result).end()
    });
});

//participating board_insert
//파일 업로드 및 디비에 base64 인코딩 된 이미지 저장
app.post("/board_insert", upload.single('fileupload'), function (req: Request, res: Response) {

    var base64 = req.body.base64
    var relay_partic_img_sql = 'insert into toon.relay_partic_img (rp_img) values (?);'

    var rp_title = req.body.title
    console.log(rp_title)
    var rp_content = req.body.contents
    var rp_date = today
    var rp_like = 0
    var rp_looks = 0
    var rp_part_id = req.body.writer
    var rp_passwd = req.body.password
    console.log(req.body.templets)
    var relay_toon_rt_id = req.body.templets
    var relay_partic_img_rp_img_id = 'SELECT max(rp_img_id) FROM toon.relay_partic_img'

    var board_insert_sql = 'insert into toon.relay_participation '
        + '(rp_title, rp_content, rp_date, rp_like, rp_looks, rp_part_id, ' +
        'rp_passwd, relay_toon_rt_id, relay_partic_img_rp_img_id) ' +
        'values (?, ?, ?, ?, ?, ?, ?, ?, (' + relay_partic_img_rp_img_id + '));'

    connection.query(relay_partic_img_sql, [base64], function () {
        connection.query(board_insert_sql, [rp_title, rp_content, rp_date, rp_like, rp_looks,
            rp_part_id, rp_passwd, relay_toon_rt_id, relay_partic_img_rp_img_id], function (err: MysqlError | null, result: any) {
                //console.log(board_insert_sql)
                if (err) {
                    console.log("somthing error" + err);
                    return
                } else {
                    res.redirect('http://localhost:4200/participating-works');
                }
            });
    });
})

//participating board_read
app.get("/board_list", function (req: Request, res: Response) {
    var board_read_sql = 'SELECT rp.rp_id, rp.rp_title, date_format(rp.rp_date, "%Y-%m-%d") as rp_date, rp.rp_looks, ' +
        'rp.rp_like, rp.rp_part_id, convert(rpi.rp_img using utf8) as rp_img, rp.relay_toon_rt_id ' +
        'FROM toon.relay_partic_img rpi, toon.relay_participation rp ' +
        'where rpi.rp_img_id = rp.relay_partic_img_rp_img_id order by rp.rp_id desc;'
    connection.query(board_read_sql, function (err: MysqlError | null, result: any) {
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            res.status(200).json(result).end()
            //res.redirect('http://localhost:4200/participating-works');
        }
    });
})

//participating board_read : respectively
app.get("/board_respect_list/:index", function (req: Request, res: Response) {
    var index = req.params.index
    console.log(index)
    var templets_id = req.body.templets
    console.log(templets_id)
    var board_read_sql = 'SELECT rp.rp_id, rp.rp_title, date_format(rp.rp_date, "%Y-%m-%d") as rp_date, rp.rp_looks, ' +
        'rp.rp_like, rp.rp_part_id, convert(rpi.rp_img using utf8) as rp_img, rp.relay_toon_rt_id ' +
        'FROM toon.relay_partic_img rpi, toon.relay_participation rp ' +
        'where rpi.rp_img_id = rp.relay_partic_img_rp_img_id and rp.relay_toon_rt_id = ? order by rp.rp_id desc;'
    connection.query(board_read_sql, [index], function (err: MysqlError | null, result: any) {
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            res.status(200).json(result).end()
            //res.redirect('http://localhost:4200/participating-works');
        }
    });
})

//participating board_detail_read
app.get("/board_detail/:index", function (req: Request, res: Response) {
    var index = req.params.index
    console.log(index)
    var board_detail_sql = 'SELECT rp.rp_id, rp.rp_title, rp.rp_content, ' +
        'date_format(rp.rp_date, "%Y-%m-%d") as rp_date, rp.rp_like, rp.rp_looks, ' +
        'rp.rp_part_id, rp.rp_passwd, convert(rpi.rp_img using utf8) as rp_img, ' +
        '(select convert(t.templets_img using utf8) as templets_img from toon.templets t, toon.relay_toon rt ' +
        'where t.templets_id=rt.templets_templets_id and rt.rt_id = rp.relay_toon_rt_id) rt_img ' +
        'FROM toon.relay_partic_img rpi, toon.relay_participation rp ' +
        'where rpi.rp_img_id = rp.relay_partic_img_rp_img_id and rp.rp_id = ?;'

    var board_looks_up_sql = 'update toon.relay_participation set rp_looks = rp_looks + 1 where rp_id=?;'
    connection.query(board_looks_up_sql, [index], function (err: MysqlError | null, result: any) {
        connection.query(board_detail_sql, [index], function (err: MysqlError | null, result: any) {
            if (err) {
                console.log("somthing error" + err);
                return
            } else {//console.log(index)
                res.status(200).json(result).end()
            }
        });
    })
})

//participating board_modify
app.post("/board_modify/:index", upload.single('fileupload'), function (req: Request, res: Response) {
    console.log(req.body)
    var title = req.body.title
    var content = req.body.contents
    //console.log(content)
    var img = req.body.base64
    var index = req.params.index
    //console.log(req.params)
    var board_modify_sql = 'update toon.relay_participation rp, toon.relay_partic_img rpi ' +
        'set rp.rp_title = ?, rp.rp_content = ?, ' +
        'rp.rp_date = date_format(now(), "%Y-%m-%d"), rpi.rp_img = ? ' +
        'where rp.relay_partic_img_rp_img_id = rpi.rp_img_id and rp.rp_id = ?;'
    connection.query(board_modify_sql, [title, content, img, index], function (err: MysqlError | null, result: any) {
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            res.redirect('http://localhost:4200/relay-participant-detail-page;item=' + index);
        }
    });
})

//participating board_delete
app.get("/board_delete/:index", function (req: Request, res: Response) {
    console.log(req.body)
    var index = req.params.index
    console.log(req.params)
    var comment_delete_sql = 'DELETE FROM toon.comment where relay_participation_rp_id = ?;'
    var board_delete_sql = 'delete from toon.relay_participation where rp_id = ?;'
    connection.query(comment_delete_sql, [index], function (err: MysqlError | null, result: any) {
        connection.query(board_delete_sql, [index], function (err: MysqlError | null, result: any) {
            if (err) {
                console.log("somthing error" + err);
                return
            } else {
                res.redirect('http://localhost:4200/participating-works');
            }
        });
    });
})

//like_button
app.post(':index/like', function (req: Request, res: Response) {
    var index = req.params.index
    console.log(req.params)
    var like_sql = 'update toon.relay_participation set rp_like = rp_like + 1 where rp_id=?;'
    connection.query(like_sql, [index], function (err: MysqlError | null, result: any) {
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            res.send('OK');
        }
    });
})

//dislike_button
app.post(':index/dislike', function (req: Request, res: Response) {
    var index = req.params.index
    console.log(req.params)
    var like_sql = 'update toon.relay_participation set rp_like = rp_like - 1 where rp_id=?;'
    connection.query(like_sql, [index], function (err: MysqlError | null, result: any) {
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            res.send('OK');
        }
    });
})


//파일 페이지 보여주기
app.get("/images", function (req: Request, res: Response) {
    //파일을 가져올 위치
    var queryString = 'SELECT convert(rp_img using utf8) as src FROM toon.relay_partic_img;'
    connection.query(queryString, function (err: MysqlError | null, result: any) {
        if (err) {
            console.log("somthing error" + err);
            return
        } else {
            //res.send(`<img src="data:${mimeType};base64,${result[0].src}" />`);
            res.send(`<img src="${result[0].src}" />`);
        }
    });
})

module.exports = app;