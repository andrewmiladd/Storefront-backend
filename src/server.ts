import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from 'cors';
export const app: express.Application = express();
const address: string = "0.0.0.0:3000";


app.use(cors());
app.use(bodyParser.json());
app.use('/store', routes)
app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});


