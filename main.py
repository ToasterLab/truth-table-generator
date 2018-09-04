keywords = ["not", "and", "or"]

def parser (string):
    clauses = string.split("(").split(")")
    for clause in clauses:
        term = clause.split(" ")
        if keywords contains term:
