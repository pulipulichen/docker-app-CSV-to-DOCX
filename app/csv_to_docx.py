import csv
from docx import Document
import sys

def csv_to_table(csv_file, docx_file):
    document = Document()
    table = document.add_table(rows=1, cols=0)
    with open(csv_file, 'r') as file:
        print(csv_file)
        csv_reader = csv.reader(file)
        for row in csv_reader:
            table_row = table.add_row()
            for cell in row:
                table_row.cells.append(cell.strip())
            # table.add_row().cells = [cell.strip() for cell in row]
    
    document.save(docx_file)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python csv_to_docx.py <csv_file> <docx_file>")
        sys.exit(1)
    
    csv_file = sys.argv[1]
    docx_file = sys.argv[2]
    csv_to_table(csv_file, docx_file)