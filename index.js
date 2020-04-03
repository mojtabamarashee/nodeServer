let mode = 'SERVER';
var jalaali = require('jalaali-js');
const Http = require('http');
fs = require('fs');
path = require('path');
var compression = require('compression');
readline = require('readline');
os = require('os');
//var numeral = require('numeral');
const express = require('express');
var MongoClient = require('mongodb').MongoClient;
let fast =
  'http://www.tsetmc.com/tsev2/data/instinfofast.aspx?i=778253364357513&c=57+';
//gloabl
const port = 52013;
const app = express();
app.use(compression());
app.use(express.static('.'));
let dbo, client;

async function main() {
  if (mode == 'LOCAL') mongoUrl = 'mongodb://localhost:27017';
  if (mode == 'SERVER')
    mongoUrl =
      'mongodb://filterbo_database:11111aaaaa@localhost:27017/filterbo_database';

  // mongoUrl =
  //   'mongodb://filterbo_database:11111aaaaa@filterbourse.ir:27017/filterbo_database';
  if (mode == 'POPULATE_DB')
    mongoUrl =
      'mongodb://filterbo_database:11111aaaaa@filterbourse.ir:27017/filterbo_database';

  await ConnectToDB();

  //var row = await dbo
  //  .collection('allRows')
  //  .find()
  //  .toArray()
  //  .forEach(v => {
  //    v.hist = [1];
  //    v.ctHist = [1];
  //  });

  if (mode == 'SERVER') {
    console.log('mode = ', mode);
    html = fs.readFileSync('symbol/index.html');

    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/main/index.html');
    });

    app.get('/parTree', async (req, res) => {
      var row = await dbo
        .collection('allRows')
        .find({arzeshBourse: {$exists: true}})
        .toArray();
      res.send({arzesh: row[0].arzeshBourse + row[0].arzeshFara});
    });

    app.get('/hist/:inscode', async (req, res) => {
      console.log('req = ', req);
      var row = await dbo
        .collection('allRows')
        .find({inscode: req.params.inscode})
        .toArray();
      res.send(row[0]);
    });

    app.get('/api/names', async (req, res) => {
      console.log('req = ', req);
      var row = await dbo
        .collection('allRows')
        .find()
        .toArray();
      let names = row.map(v => v.name);
      res.send(names);
    });

    app.get('/api/allRows', async (req, res) => {
      var row = await dbo
        .collection('allRows')
        .find()
        .toArray();
      res.send(row);
    });

    app.get('/:name', async (req, res) => {
      var row = await dbo
        .collection('allRows')
        .find({name: req.params.name})
        .toArray();
      res.send(
        '<script>var inscode ="' +
          row[0].inscode +
          '"; console.log("inscode = ", inscode);</script>' +
          html.toString(),
      );
    });
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`),
    );
  }
}
main();

async function ConnectToDB() {
  let mongoUrl =
    'mongodb://filterbo_database:11111aaaaa@filterbourse.ir:27017/filterbo_database';
  console.log('mongoUrl = ', mongoUrl);
  return new Promise((res, rej) => {
    MongoClient.connect(
      mongoUrl,
      async (err, clt) => {
        console.log('err = ', err);
        dbo = await clt.db('filterbo_database');
        console.log('dbo = ');
        client = clt;
        res(1);
      },
    );
  });
}
