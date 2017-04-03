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

![header](https://github.com/ben-rowan/csv2json/blob/master/grammar/output/header/header.png)

#### value

![value](https://github.com/ben-rowan/csv2json/blob/master/grammar/output/header/value.png)

#### delimited_value

![delimited_string](https://github.com/ben-rowan/csv2json/blob/master/grammar/output/header/delimited_value.png)

#### SEPARATOR

This can be switched to a `\t` using the `-t` or `--tab` options.

![SEPARATOR](https://github.com/ben-rowan/csv2json/blob/master/grammar/output/header/SEPARATOR.png)

#### DELIMITER

This can be set to anything other that `SEPARATOR` or `NL` using the `-d <value>` or
`--delimiter <value>` options.

![DELIMITER](https://github.com/ben-rowan/csv2json/blob/master/grammar/output/header/DELIMITER.png)

#### NL

This can be set the the Windows newline `\r\n` using the `-w` or `--windows-nl` options.

![NL](https://github.com/ben-rowan/csv2json/blob/master/grammar/output/header/NL.png)

#### DEL_STRING

![DEL_STRING](https://github.com/ben-rowan/csv2json/blob/master/grammar/output/header/DEL_STRING.png)

#### NON_DEL_STRING

![NON_DEL_STRING](https://github.com/ben-rowan/csv2json/blob/master/grammar/output/header/NON_DEL_STRING.png)

### Body

### Number