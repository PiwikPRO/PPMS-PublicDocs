import requests
import os
import json

# Otwórz i przeczytaj plik konfiguracyjny
with open('remote_docs_config.json', 'r') as f:
    config = json.load(f)

# Dla każdej pary (folder, {url, filename}) w pliku konfiguracyjnym
for folder, data in config.items():
    url = data['url']
    filename = data['filename']

    try:
        # Pobierz plik .md z danego URL
        response = requests.get(url)
        response.raise_for_status()  # Rzuć wyjątek, jeśli odpowiedź to błąd HTTP

        # Sprawdź, czy folder istnieje, jeśli nie - utwórz go
        os.makedirs(folder, exist_ok=True)

        # Zapisz pobrany plik .md w odpowiednim folderze pod określoną nazwą pliku
        with open(os.path.join(folder, filename), 'w') as f:
            f.write(response.text)
    except Exception as e:
        print(f"Błąd podczas przetwarzania {folder}/{filename} z {url}: {e}")