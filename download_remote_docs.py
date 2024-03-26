import requests
import os
import json

with open('remote_docs_config.json', 'r') as f:
    config = json.load(f)

for folder, data in config.items():
    url = data['url']
    filename = data['filename']

    try:
        response = requests.get(url)
        response.raise_for_status()

        os.makedirs(folder, exist_ok=True)

        with open(os.path.join(folder, filename), 'w') as f:
            f.write(response.text)

        with open(os.path.join(folder, 'index.rst'), 'a') as f:
            f.write(f'   {filename}\n')
    except Exception as e:
        print(f"Error processing: {folder}/{filename} z {url}: {e}")