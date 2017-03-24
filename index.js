#!/usr/bin/env node

"use strict";

// This tool supports CSV as defined in RFC 4180 (plus some extensions)

var program = require('commander');
var fs = require('fs');
var os = require('os');

var util = {
  // Output is truncated to length of shortest array
  createObj: function(keys, values) {
    var obj = {};
    for (var i = 0; i < keys.length && i < values.length; i++) {
      obj[keys[i]] = values[i];
    }
    return obj;
  },
  isNumeric: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
};

program
  .arguments('<file>')
  .option('-t, --tab', 'Switches the separator from comma to tab')
  .option('-d, --delimiter <text delimiter>', 'Sets the symbol used to delimit text [default "]')
  .option('-h, --header', 'CSV file includes a header')
  .action(function(file) {

    var csv2json = {
      i: 0,
      csv: '',
      json: [],
      header: [],
      hasHeader: false,
      curVal: '',
      curVals: [],
      withinDelimiter: false,
      separator: program.tab ? '\t' : ',',
      delimiter: program.delimiter || '"',
      eol: os.EOL,
      setCSV: function(csv) {
        this.csv = csv;
        return this;
      },
      munch: function(n) {
        var n = n || 1;
        this.i += n;
      },
      peek: function(n) {
        var n = n || 1;
        return this.csv[this.i + n];
      },
      wind: function() {
        while (this.csv[this.i] == ' ') {
          this.munch();
        }
      },
      toJSON: function() {
        while (this.i < this.csv.length) {
          var c = this.csv[this.i];

          if (typeof c == 'undefined') {  // end of string
            break;
          }
          else if (this.withinDelimiter) {
            switch (c) {
              case this.delimiter:
                if (this.peek() == this.delimiter) {  // escaped delimiter
                  this.munch(2);
                  this.curVal += this.delimiter;
                }
                else {
                  this.munch();
                  this.wind();
                  this.withinDelimiter = false;
                }
                break;
              case this.separator:
              case this.eol:
              default:
                this.curVal += c;
                this.munch();
            }
          }
          else {
            switch (c) {
              case this.separator:
                if (util.isNumeric(this.curVal)) {
                  this.curVal = parseFloat(this.curVal);
                }
                this.curVals.push(this.curVal);
                this.curVal = '';
                this.munch();
                break;
              case this.delimiter:
                this.curVal = '';  // Discard any white space up to this point
                this.munch();
                this.withinDelimiter = true;
                break;
              case this.eol:
                if (util.isNumeric(this.curVal)) {
                  this.curVal = parseFloat(this.curVal);
                }
                this.curVals.push(this.curVal);
                this.curVal = '';
                if (program.header) {
                  if (this.hasHeader) {
                    var obj = util.createObj(this.header, this.curVals);
                    this.json.push(obj);
                  }
                  else {
                    this.header = this.curVals;
                    this.hasHeader = true;
                  }
                }
                else {
                  this.json.push(this.curVals);
                }
                this.curVals = [];
                this.munch();
                this.wind();
                break;
              default:
                this.curVal += c;
                this.munch();
            }
          }
        }
        return JSON.stringify(this.json);
      }
    };

    fs.readFile(file, 'utf8', function(err, csv) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var json = csv2json.setCSV(csv).toJSON();
      process.stdout.write(json);
    });
  })
  .parse(process.argv);
