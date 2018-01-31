#!/usr/bin/env node

var program = require('commander')
var args = process.argv

program
  .option('-u, --url <url>', 'Url to redirect to')
  .option('-p, --port <n>', 'Port to listen on', parseInt)
  .parse(process.argv);

console.log("Listening on port: " + program.port)
console.log("Redirecting to:" + program.url)

if (!program.url){
  console.log("Must supply a url")
  return;
}
const express = require('express')
const app = express()

app.get('/', (req, res) => res.redirect(program.url))

var port = program.port ? program.port : 8989;
app.listen(port, () => console.log(`ThreeOhFour Redirector listening on port ${port}!`))
