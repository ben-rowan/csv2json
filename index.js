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

Token.types = {};
Token.types.EOF_TYPE = 0;
Token.types.DEL_STR_TYPE = 1;
Token.types.NON_DEL_STR_TYPE = 2;
Token.types.SEPARATOR_TYPE = 3;
Token.types.NL_TYPE = 4;
Token.types.NUMBER_TYPE = 5;

Token.names = [
    'EOF',
    'DELIMITED_STRING',
    'NON_DELIMITED_STRING',
    'SEPARATOR',
    '_NL',
    '_NUMBER'
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

LexerException.prototype.toString = function()
{
    return this.name + ': ' + this.msg;
};

function Lexer(input)
{
    this.i = 0;
    this.input = input;
}

Lexer.prototype.consume = function ()
{
    ++this.i;
};

Lexer.prototype.peek = function (n)
{
    n = n || 1;
    return this.input[this.i + n];
};

Lexer.prototype.c = function ()
{
    return this.input[this.i];
};

// CSV LEXER ---------------------------------------------------------------

function CsvLexer(csv, separator, delimiter, nl)
{
    Lexer.call(this, csv);
    this.separator = separator;
    this.delimiter = delimiter;
    this.nl = nl;
}

CsvLexer.prototype = Object.create(Lexer.prototype);
CsvLexer.prototype.constructor = CsvLexer;

// Only works correctly outside of delimiters
CsvLexer.prototype._WS = function ()
{
    while (true) {
        // Guard against collisions between these and common white space chars
        if (this.c() === this.delimiter
          || this.c() === this.separator
          || this.c() === this.nl
          || (this.c() + this.peek() === this.nl))  // Windows newline
        {
            break;
        }
        // Is white space
        else if (this.c() === ' ' || this.c() === '\t' || this.c() === '\r' || this.c() === '\n') {
            this.consume();
        }
        // Is any other character
        else {
            break;
        }
    }
};

CsvLexer.prototype._NL = function ()
{
    this.consume();
    return new Token(Token.types.NL_TYPE, Token.names[Token.types.NL_TYPE]);
};

CsvLexer.prototype._DEL_STRING = function ()
{
    var backtrackIndex = this.i;
    var delString = '';
    var insideDelString = false;

    this._WS();

    if (this.c() === this.delimiter) {
        while (true) {
            switch (this.c()) {
                case this.delimiter:
                    break;
                default:

            }
        }
    }
    else {
        this.i = backtrackIndex;
        return false;
    }
};

CsvLexer.prototype._NON_DEL_STRING = function ()
{
    var backtrackIndex = this.i;

    this.i = backtrackIndex;
    return false;
};

CsvLexer.prototype._NUMBER = function ()
{
    var backtrackIndex = this.i;

    this.i = backtrackIndex;
    return false;
};

CsvLexer.prototype.nextToken = function ()
{
    if (typeof this.c() === 'undefined') {
        return new Token(Token.types.EOF_TYPE, Token.names[Token.types.EOF_TYPE]);
    }

    if (this.c() === this.nl || this.c() + this.peek() === this.nl) {
        return this._NL();
    }
    
    var token = null;
    if ( (token = this._DEL_STRING()) !== false ) {}
    else if ( (token = this._NUMBER()) !== false ) {}
    else if ( (token = this._NON_DEL_STRING()) !== false ) {}
    else {
        throw new LexerException('Syntax error found at character (' + this.i + ').');
    }
    return token;
};

// PARSER ---------------------------------------------------------------------

function Parser()
{

}

// HEADER PARSER --------------------------------------------------------------

function CsvParser() {

}

CsvParser.prototype = Object.create(Parser.prototype);
CsvParser.prototype.constructor = CsvParser;

program
    .arguments('<file>')
    .option('-t, --tab', 'switches the separator from a comma to a tab')
    .option('-d, --delimiter <value>', 'sets the symbol used to delimit text [default "]')
    .option('-h, --header', 'this CSV file includes a header')
    .option('-w, --windows-nl', 'sets the newline to "\\r\\n" instead of "\\n"')
    .action(function (file) {

        fs.readFile(file, 'utf8', function (err, csv) {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            var lexer = new CsvLexer(csv, ',', '"', '\n');
            var token = null;
            while (true) {
                token = lexer.nextToken();
                if (token.type === Token.types.EOF_TYPE) break;
            }
            process.stdout.write('DONE!');
        });
    })
    .parse(process.argv);
