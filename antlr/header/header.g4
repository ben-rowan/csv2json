grammar header;

header : value (SEPARATOR value)* NL ;
value : delimited_value | NON_DEL_STRING ;
delimited_value : DELIMITER DEL_STRING DELIMITER ;
SEPARATOR: ',' ;
DELIMITER: '"' ;
NL: '\n' ;
DEL_STRING: (~(DELIMITER) | DELIMITER DELIMITER)* ;
NON_DEL_STRING: ~(DELIMITER | NL | SEPARATOR)* ;