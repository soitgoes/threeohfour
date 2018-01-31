#!/usr/bin/env node

var bogart  = require('bogart-edge')
var program = require('commander')
var args = process.argv
var router = bogart.router()

program
  .option('-u, --url', 'Url to redirect to')
  .option('-p, --port <n>', 'Port to listen on', parseInt)
  .parse(process.argv);

console.log("Listening on port: " + program.port)

if (!program.url){
  console.log("Must supply a url")
  return;
}

router.get(/.*/, function(req) {
  return bogart.redirect(program.url)
});

var app = bogart.app();
app.use(router); // Our router
var port = program.port ? program.port : 8989;
app.start({port: port});
