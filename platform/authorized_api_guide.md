Authorized API guide
========================

## Introduction 
This page describes how to access Piwik PRO API which uses 
[client credentials](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)
OAuth grant type for obtaining user token. 
All data is sent and received as JSON and is compliant with [JSON API](http://jsonapi.org/) specification.

### Obtaining token

If you want to access API for the first time you need to generate your 
API credentials which then allows you to request for a token that is used for authentication during communication with authorized API.

#### Generate API Credentials

* Login to your account using your email and password.
* Go to your profile (`Menu` then `My profile`).
* On this page click on `API Credentials` tab. This page allows you to manage all your API credentials.
* Click `Generate new credentials` which will result in new popup. Fill in your custom `credentials name`.
  Name must contains at least 3 characters.
* Copy your newly generated `CLIENT ID` and `CLIENT SECRET` because they **won't be available for you after dismissing this window.**

Those credentials will be valid as long as you will not revoke them in your profile.

#### Create access token

Having generated your API Credentials, now you are ready for creating access token that will be used in 
communication with API.

Piwik PRO API tokens use [JWT](https://jwt.io/) format.

Make POST call to `https://<domain>/auth/token` with header `Content-Type: application/json` and payload: 
`{ "grant_type": "client_credentials", "client_id": "<client_id>", "client_secret": "<client_secret>" }`.

Response example:
```
{"token_type":"Bearer","expires_in":1800,"access_token":"<your_access_token>"}
```

Now, you can use obtained `<your_access_token>` for communication with Piwik PRO API.
Field `expires_in` stands for time (in seconds) for token expiration (TTL).
Since token is a Bearer type, it must be **included in every API call** within header.

```
Authorization: Bearer <your_access_token>
```
  
### Deleting API Credentials

Once you want to revoke the possibility of generating API token using given `CLIENT ID` and `CLIENT SECRET`,
go to `My profile` and click `Delete` button on selected API credentials.

## API usage example

Whatever API call you choose, first remember that you must generate 
[API credentials](#generate-api-credentials) for obtaining client id and secret.

### API usage example with curl

For sake of this examples, `https://<domain>` is a URL of your PPMS instance (e.g. `https://example.piwik.pro`) and our goal
is to perform basic operations on an app. We will:
* create an app
* get created app
* update its attributes
* remove the app

#### Generate your access token

Request example:

```
POST /auth/token
```

```
curl -X POST 'https://<domain>/auth/token' -H "Content-Type: application/json" --data '{
    "grant_type": "client_credentials",
    "client_id": "your_generated_client_id",
    "client_secret": "your_generated_client_secret"
}' 
```

Response example:
```
{
    "token_type":"Bearer",
    "expires_in":1800,
    "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJwcG1zIiwiYXVkIjoiaHR0cHM6XC9cL3Rlc3RpbmcucGl3aWsucHJvXC9zZXR5LCJzdWIiOiJkNmNkZGMxMS1iZDA1L0aW5ncyIsImlhdCI6MTUzNzI3MDQ1OSwiZXhwIjoxNTM3MzU2ODUTRhYmUtYWIyZC02YjlhNjIxZmU0ZDciLCJvcmciOiJkZWZhdWx0In0.Nec2mYFRv6manzXjq0sHQxINZvu-fbDYT8AedVHBKYvu1F9hYKaFReY8rNgfsMANw2OX8-IKpTrQb1DyRkG4nxpIEbob528_lPd7roho5mtKlE8sfS9WZE1piYOwaNDySDEUwUowgj2xBiJqSODjxBI6qVhLkynGEEeNBVh-lrUmlcjpYqUc3saHvX72L-rqbIHa_1dzGarR-dcPyns-RpKjZEILzUSYOHdM09KDti-xsG-nbKHGdP8fVEEJPyupnAfJPOLHQg_j1c5IvJSvTKVF3j4_zo6Zw5g8YkaheT9Iwph5BGHFRneXatcmbwKI8JzSDFi6CinzI-okYKRPbg"
}
```

Field `access_token` contains your token which then will be used for all API calls.
Once you generated an access token, you can use it during its lifetime (30 minutes by default)

#### Create an app

Request example:

```
POST /api/apps/v2
```

```
curl -X POST 'https://<domain>/api/apps/v2' -H "Authorization: Bearer <your_access_token>" -H "Content-Type: application/vnd.api+json" --data '{
  "data": {
    "attributes": {
      "timezone": "UTC",
      "name": "AppName",
      "urls": [
        "http://example.com"
      ],
      "currency": "USD"
    },
    "type": "ppms/app"
  }
}'

```

Note, that you have to replace: 
* `<domain>` with your PPMS instance URL,
* `<your_access_token>` with your generated access token 

Response example:
```
{
   "data":{
      "type":"ppms/app",
      "id":"b30e538d-4b05-4a75-ae25-7eb565901f38",
      "attributes":{
         "name":"AppName",
         "addedAt":"2018-09-13T12:16:30+00:00",
         "urls":[
            "http://example.com"
         ],
         "timezone":"UTC",
         "currency":"USD",
         "excludeUnknownUrls":false,
         "keepUrlFragment":true,
         "eCommerceTracking":false,
         "siteSearchTracking":true,
         "siteSearchQueryParams":[
            "q",
            "query",
            "s",
            "search",
            "searchword",
            "keyword"
         ],
         "siteSearchCategoryParams":[

         ],
         "delay":500,
         "excludedIps":[

         ],
         "excludedUrlParams":[

         ],
         "excludedUserAgents":[

         ],
         "gdpr":true,
         "gdprUserModeEnabled":false,
         "privacyCookieDomainsEnabled":false,
         "privacyCookieExpirationPeriod":31536000,
         "privacyCookieDomains":[

         ],
         "organization":"default",
         "appType":"web",
         "gdprLocationRecognition":false
      }
   }
}

```
#### Get an app

Now, when app is added, it is possible to get it.

Request example:
```
GET /api/apps/v2/<app_id>
```

```
curl 'https://<domain>/api/apps/v2/b30e538d-4b05-4a75-ae25-7eb565901f38' -H "Authorization: Bearer <your_access_token>" -H "Content-Type: application/vnd.api+json"
```


>Notice: URL contains `b30e538d-4b05-4a75-ae25-7eb565901f38`. What is it? It is unique ID of an app. 
If you want to update given resource you must specify which one. How to obtain this ID?
You can obtain ID from response's 'data/id' field when you added an app

Response example:
```
{
   "data":{
      "type":"ppms/app",
      "id":"b30e538d-4b05-4a75-ae25-7eb565901f38",
      "attributes":{
         "name":"AppName",
         "addedAt":"2018-09-13T12:16:30+00:00",
         "urls":[
            "http://example.com"
         ],
         "timezone":"UTC",
         "currency":"USD",
         "excludeUnknownUrls":false,
         "keepUrlFragment":true,
         "eCommerceTracking":false,
         "siteSearchTracking":true,
         "siteSearchQueryParams":[
            "q",
            "query",
            "s",
            "search",
            "searchword",
            "keyword"
         ],
         "siteSearchCategoryParams":[

         ],
         "delay":500,
         "excludedIps":[

         ],
         "excludedUrlParams":[

         ],
         "excludedUserAgents":[

         ],
         "gdpr":true,
         "gdprUserModeEnabled":false,
         "privacyCookieDomainsEnabled":false,
         "privacyCookieExpirationPeriod":31536000,
         "privacyCookieDomains":[

         ],
         "organization":"default",
         "appType":"web",
         "gdprLocationRecognition":false
      }
   }
}
```
 
#### Update app

Consider you added app, but afterwards you want to change its name.

Request example:
```
PATCH /api/apps/v2/<app_id>
```

```
curl -X PATCH 'https://<domain>/api/apps/v2/b30e538d-4b05-4a75-ae25-7eb565901f38' -H "Authorization: Bearer <your_access_token>" -H "Content-Type: application/vnd.api+json" -v --data '{
  "data": {
    "attributes": {
      "name": "NewAppName"
    },
    "type": "ppms/app",
    "id": "b30e538d-4b05-4a75-ae25-7eb565901f38"
  }
}'
```

This request changed app name from `AppName` to `NewAppName`. 
> Notice three things:
> * `-X PATCH` before URL. It means that this request is available using `HTTP PATCH method`
> * you have to specify also `data/id` - it's a [JSON API](http://jsonapi.org/) requirement
> * also `data/type` is required. For example, when you want to work with app resource, specify it's type as `ppms/app` 
> * you can set only parameters you want to update. For more apps attributes go to [App edit reference](https://developers.piwik.pro/en/latest/platform/authorized_api/apps/apps_api.html#operation/api_app_edit_v2)

API will return `204 No Content` status code with an empty response.

#### Delete an app

Sometimes resources are not needed anymore, so let's have a look at example on how to delete them.

Request example:

```
DELETE /api/apps/v2/<app_id>
```

```
curl -X DELETE 'https://<domain>/api/apps/v2/b30e538d-4b05-4a75-ae25-7eb565901f38' -H "Authorization: Bearer <your_access_token>" -H "Content-Type: application/vnd.api+json"
```

There is no response example. API will return `204 No Content` status code.

### API usage example with Postman

[Postman](https://www.getpostman.com/) is a multiplatform GUI application for creating API calls.
PPMS allows you to export swagger documentation and easily import it to Postman.
Depending of what you want to work with, you can import given swagger docs:
* <a href="../_static/api/platform_apps_authorized_api.json" target="_blank">Apps</a>
* <a href="../_static/api/platform_users_authorized_api.json" target="_blank">Users</a>
* <a href="../_static/api/platform_access_control_authorized_api.json" target="_blank">Access control</a> 

Simply click in Postman: `import -> Import From Link`. Then all of your paths are imported!
You have to override two things:
* replace your domain in url
* add token. Click on `Authorization` tab on chosen API call and then use Bearer Token type. 
  Paste your token and now you can call API using `SEND` button.

## FAQ

Here you can find the most common issues encountered during work with the API

### API returns `"application/json" is not a valid JSON API Content-Type header, use "application/vnd.api+json" instead"`

Remember, all API calls needs to be created with `Content-Type: application/vnd.api+json` header. 
If you use `curl` you need to use `-H "Content-Type: application/vnd.api+json"` flag. 
Postman allows configuring headers with `Header` tab.

### API returns `JWT not found`

Remember, you need to always use your API token. You need to send it all the time within `Authorization: Bearer <your_access_token>` header.
If you use `curl` you need to use `-H "Authorization: Bearer <your_access_token>"` flag.
Postman allows configuring tokens in authorization tab. Choose type `Bearer Token` and paste it there. 
Remember to keep this token secure as it allows access to sensitive data!

### API returns `Expired JWT Token`

Every token that you generated is specified by TTL - time to live. By default it's 30 minutes.
After token is expired, you need to [generate your access token](#generate-your-access-token)

### API returns `access token not authorized`

This message means, that you sent access token within proper `Authorization: Bearer` field, although it is invalid.
Make sure you set proper token.
