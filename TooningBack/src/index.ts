import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as bodyParser from 'body-parser';
//import connectionOptions from "./config/ormconfig";

/**
 * 파일 명 : index.js
 * @author : 주민지
 * @date : 22.12.27
 * @description : server 연결 파일
 */

const app: Express = express();
const port = 5000;

//CORS 설정
const allowedOrigins = ['http://localhost:4200'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(morgan("dev"));
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//html에서 가져온 name값을 사용할 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }));

//
var test = require("../routes/templetsAPI");
app.use("/", test);

// 이미지 파일 업로드 및 참가작 CRUD API
var file = require("../routes/file_manage");
app.use("/", file);

// 댓글 CRUD API
var comments = require("../routes/comments");
app.use("/", comments);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});