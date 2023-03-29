import express, { Router, Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from "body-parser";
const router : Router = express.Router();
const request = require("request");
const app: Express = express();

/**
 * 파일 명 : 
 * @author : 주민지 
 * @date : 
 * @description :
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/templet', (req: Request, res: Response, next: NextFunction) => {
  const templetUrl = "http://localhost:5000/test";
  request(templetUrl, { json: true }, function (err : Error | null, result : any, body : any) {
    if (err) {
      console.log("실패");
    } else {
      //console.log(body);
      //res.send(body);
      res.render("templet", {
        emplist: body,
        templet_id: req.body.templet_id,
        templet_img: req.body.templet_img,
        templet_link: req.body.templet_link
      });
    }
  });
});

module.exports = router;