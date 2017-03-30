csv2json
========

A command-line tool for parsing csv into json.

> **NOTE:** _this project is currently a work in progress and will not function as
> described below._

Install
-------

Usage
-----

```text
  Usage: csv2json [options] <file>

  Options:

    -h, --help               output usage information
    -t, --tab                switches the separator from a comma to a tab
    -d, --delimiter <value>  sets the symbol used to delimit text [default "]
    -h, --header             this CSV file includes a header
    -w, --windows-nl         sets the newline to "\r\n" instead of "\n"
```

CSV Grammar
-----------

### Header

If you pass the `-h` or `--header` flags to `csv2json` the first line of input
will be parsed as a CSV header as defined by the following grammar.

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

This can be set the the Windows newline `\r\n` using the `-w` or `--windows-nl` options.

![NL](https://raw.githubusercontent.com/ben-rowan/csv2json/master/rrd-antlr/output/header/NL.png)

### Body

### Number