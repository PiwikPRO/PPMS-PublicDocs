# Merge docs

```
sudo npm install -g swagger-cli openapi-merge-cli
```

Used library: https://www.npmjs.com/package/openapi-merge-cli

```bash 
npx openapi-merge-cli
python3 -m http.server 8000
```

Enter http://0.0.0.0:8000/#/

Changes to documents itself:

- added custom tag for each service (could be categorized in any other way)

```bash
cat public_v2.yaml | yq -Y '(.paths[][] | select(type=="object") )  += {tags: ["Access Control"]}' 

openapi_tag(){
  CONTENT=$(cat $1 | yq -Y "(.paths[][] | select(type==\"object\") )  += {tags: [\"$2\"]}")
  echo $CONTENT > $1
}

```

```
cd merged_docs && python3 merge_docs.py
```

## Docusaurus

OpenApi
https://github.com/cloud-annotations/docusaurus-openapi#readme

Docusaurus + Stoplight Elements
https://github.com/stoplightio/elements/discussions/1777
```
cd docusaurus-piwik
npm install
npx docusaurus start
```

```
# First we select the elements to modify
(
  .paths[][] |
  select(type == "object") |
  select(has("responses")) | 
  .responses |
  select(has("500") | not)
)
# Then each of them is modified 
+= {
  "500":{
    description: "Unexpected error",
    content: {
      "application/json": {
        schema: {
          "$ref": "#components/schemas/ProviderError"
        }
      }
    }
  }
}
# The fully modified document is returned
```
