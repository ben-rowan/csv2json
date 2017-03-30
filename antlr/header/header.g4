grammar header;

header : value (SEPARATOR value)* NL ;
value : delimited_string | non_delimited_string ;
delimited_string : DELIMITER ~(DELIMITER)* DELIMITER ;
non_delimited_string: ~(DELIMITER | NL | SEPARATOR)* ;
SEPARATOR: ',' ;
DELIMITER: '"' ;
NL: '\n' ;