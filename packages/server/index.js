const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
require('dotenv').config({ path: path.resolve(process.cwd(), '../../.env') }); // eslint-disable-line import/no-extraneous-dependencies

require('./src/socket/')(http);

const { SERVER_PORT } = process.env;

http.listen(SERVER_PORT, () => {
  console.log(`listening on *:${SERVER_PORT}`); // eslint-disable-line no-console
});
