#!/usr/bin/env node

"use strict";

// This tool supports CSV as defined in RFC 4180 (plus some extensions)

var program = require('commander');
var fs = require('fs');
var os = require('os');


// TOKEN ----------------------------------------------------------------------

function Token(type, text)
{
    this.type = type;
    this.text = text;
}

Token.types.EOF_TYPE = 0;
Token.types.DEL_STR_TYPE = 1;
Token.types.NON_DEL_STR_TYPE = 2;
Token.types.SEPARATOR_TYPE = 3;
Token.types.NL_TYPE = 4;

Token.names = [
    'EOF',
    'DELIMITED_STRING',
    'NON_DELIMITED_STRING',
    'SEPARATOR',
    'NL'
];

Token.prototype.stringify = function ()
{
    return '<' + Token.names[this.type] + ',' + this.text + '>';
};

// LEXER ----------------------------------------------------------------------

function LexerException(msg)
{
    this.name = 'Lexer Exception';
    this.msg = msg;
}

function Lexer(input)
{
    this.i = 0;
    this.input = input;
}

Lexer.prototype.consume = function ()
{
    ++this.i;
};

Lexer.prototype.c = function ()
{
    return this.input[this.i];
};

// HEADER LEXER ---------------------------------------------------------------

function HeaderLexer(csv, separator, delimiter, nl)
{
    Lexer.call(this, csv);
    this.separator = separator;
    this.delimiter = delimiter;
    this.nl = nl;
}

HeaderLexer.prototype = Object.create(Lexer.prototype);
HeaderLexer.prototype.constructor = HeaderLexer;

HeaderLexer.prototype.isNonDelStrChar

HeaderLexer.prototype.nextToken = function ()
{
    while (typeof this.c() != 'undefined') {
        switch (this.c()) {
            case this.separator:
                break;
            case this.delimiter:
                break;
            case this.nl:
                this.consume();
                return new Token(Token.types.NL_TYPE, Token.names[Token.types.NL_TYPE]);
            case ' ': case '\t': case '\n': case '\r': this.consume(); continue;
            default:
                if () {

                }
                else {
                    throw new LexerException('Syntax error found at character (' + this.i + ').');
                }
        }
    }

    return new Token(Token.types.EOF_TYPE, Token.names[Token.types.EOF_TYPE]);
};

// PARSER ---------------------------------------------------------------------

function Parser()
{

}

// HEADER PARSER --------------------------------------------------------------

function HeaderParser()
{

}

HeaderParser.prototype = Object.create(Parser.prototype);
HeaderParser.prototype.constructor = HeaderParser;

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
