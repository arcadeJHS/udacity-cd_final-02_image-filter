if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express from 'express';
import bodyParser from 'body-parser';
import { IndexRouter } from './controllers/index.router';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  let ALLOWED_ORIGINS = ["http://ailuropodarts.wtf", "http://d5n930n193m31.cloudfront.net", "http://udagram-piazza-frontend.s3-website.us-east-2.amazonaws.com", "http://localhost:8100"];
  app.use(function(req, res, next) {
    let origin = req.headers.origin;
    // res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    // res.header("Access-Control-Allow-Origin", "*");
    let theOrigin = (ALLOWED_ORIGINS.indexOf(origin) >= 0) ? origin : ALLOWED_ORIGINS[0];
    res.header("Access-Control-Allow-Origin", theOrigin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use('/', IndexRouter);
  
  app.get('/', async ( req, res ) => {
    res.send(`image filter API`);
  });
    
  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();