# Merge docs

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
