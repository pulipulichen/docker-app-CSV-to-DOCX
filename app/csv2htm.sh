#!/bin/bash
BEGIN {
  print "<html><body></br></br>The report provides overall Percentage Secured in the given subjects.</br></br></br>"
  print "<table border=1 cellspacing=1 cellpadding=1>"
}

NR==1 {
  # Header row
  print "<tr>"

  for ( i = 1; i <= NF; i++ ) {
    print "<td><b>"$i"</b></td>"
  }
  print "</tr>"
}

NR>1 {
  # Data rows
  print "<tr>"
  color="RED"
  if( $i > 80 ) {
    color="YELLOW"
  }
  if( $i > 90 ) {
    color="GREEN"
  }
  print "<td><b><FONT COLOR=\""color"\" FACE=\"verdana\" SIZE=2>"$1"</b></FONT></td><td>"$2"</td><td>"$3"</td><td>"$4"</td><td>"$5"</td>"
  print "</tr>"
}
END {
  print "</table></body></html>"
}