/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Modifications Copyright (C) 2017 Anki, Inc.
 */


import express from 'express';
import serveStatic from 'serve-static';


let server;


/**
 * Starts the express log server.
 * @param {Function} done A callback to invoke once the server is up.
 */
export function start(done) {
  const app = express();
  app.use(serveStatic('./'));
  server = app.listen(8080, done);
}

/**
 * Stops the log server and deletes the logs.
 */
export function stop() {
  server.close();
}
