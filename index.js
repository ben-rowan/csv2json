#!/usr/bin/env node

"use strict";

// This tool supports CSV as defined in RFC 4180 (plus some extensions)

var program = require('commander');
var fs = require('fs');
var os = require('os');

program
  .arguments('<file>')
  .option('-t, --tab', 'switches the separator from a comma to a tab')
  .option('-d, --delimiter <value>', 'sets the symbol used to delimit text [default "]')
  .option('-h, --header', 'this CSV file includes a header')
  .option('-w, --windows-nl', 'sets the newline to "\\r\\n" instead of "\\n"')
  .action(function(file) {

    fs.readFile(file, 'utf8', function(err, csv) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

    });
  })
  .parse(process.argv);
