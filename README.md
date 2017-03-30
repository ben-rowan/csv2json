csv2json
========

A command-line tool for parsing csv into json.

Install
-------

Usage
-----

CSV Grammar
-----------

### Header

If you pass the `-h` or `--header` flags to `csv2json` the first line of input
will be parsed as a CSV header based on the following grammar.

#### header

![header](https://raw.githubusercontent.com/ben-rowan/csv2json/master/rrd-antlr/output/header/header.png)

#### value

![value](https://raw.githubusercontent.com/ben-rowan/csv2json/master/rrd-antlr/output/header/value.png)

#### delimited_string

![delimited_string](https://raw.githubusercontent.com/ben-rowan/csv2json/master/rrd-antlr/output/header/delimited_string.png)

#### non_delimited_string

![non_delimited_string](https://raw.githubusercontent.com/ben-rowan/csv2json/master/rrd-antlr/output/header/non_delimited_string.png)

#### SEPARATOR

This can be switched to a `\t` using the `-t` or `--tab` options.

![SEPARATOR](https://raw.githubusercontent.com/ben-rowan/csv2json/master/rrd-antlr/output/header/SEPARATOR.png)

#### DELIMITER

This can be set to anything other that `SEPARATOR` or `NL` using the `-d <value>` or
`--delimiter <value>` options.

![DELIMITER](https://raw.githubusercontent.com/ben-rowan/csv2json/master/rrd-antlr/output/header/DELIMITER.png)

#### NL

This is set based on the current OS. So `\n` on Linux and macOS and `\r\n` on Windows.

![NL](https://raw.githubusercontent.com/ben-rowan/csv2json/master/rrd-antlr/output/header/NL.png)

### Body

### Number