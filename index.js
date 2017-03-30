#!/usr/bin/env node

"use strict";

// This tool supports CSV as defined in RFC 4180 (plus some extensions)

var program = require('commander');
var fs = require('fs');
var os = require('os');

program
  .arguments('<file>')
  .option('-t, --tab', 'Switches the separator from comma to tab')
  .option('-d, --delimiter <text delimiter>', 'Sets the symbol used to delimit text [default "]')
  .option('-h, --header', 'CSV file includes a header')
  .action(function(file) {

    fs.readFile(file, 'utf8', function(err, csv) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

    });
  })
  .parse(process.argv);
