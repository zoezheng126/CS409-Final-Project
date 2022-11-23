import csv
import requests

API_ENDPOINT = 'http://localhost:4000/api/pokemons'

with open('pokemon.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            data = {
                    "id": row[0],
                    "identifier": row[1],
                    "species_id": row[2],
                    "height": row[3],
                    "weight": row[4],
                    "base_experience": row[5],
                    "order": row[6],
                    "is_default": row[7]}
            r = requests.post(url = API_ENDPOINT, data = data)
            line_count += 1
    print(f'Successfully added {line_count} pokemons to db.')