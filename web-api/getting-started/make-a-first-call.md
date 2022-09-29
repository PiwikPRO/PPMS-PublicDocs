Make a first call
=================

In this example, we want to perform some basic operations on a user. We'll do the following operations:

-   Invite a user
-   Get a created user
-   Change the user's language
-   Delete a user

Note: In our example, we use https://&lt;example&gt; as an account address. An account address has this format: https://example.piwik.pro.

## Generate your access token

Example of a request:

POST /auth/token
```shell
curl -X POST 'https://<example>/auth/token' -H "Content-Type: application/json" --data '{
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
Note: access_token contains your token. You'll need it for all API calls. Every token is valid for 30 minutes.

## Invite a user

Request example:

POST /api/users/v2
```shell
curl -X POST 'https://<example>/api/users/v2' -H "Authorization: Bearer <your_access_token>" -H "Content-Type: application/vnd.api+json" --data '{
  "data": {
    "type": "ppms/user",
    "attributes": {
      "email": "user@example.com",
      "language": "en-US"
    }
  }
}'
```
Replace in your request the following fields:

-   &lt;example&gt; with your account address. Example: example.piwik.pro.
-   &lt;your_access_token&gt; with your generated access token

Example of a response:
```
{
  "data": {
    "id": "b30e538d-4b05-4a75-ae25-7eb565901f38",
    "type": "ppms/user",
    "attributes": {
      "email": "user@example.com",
      "role": "USER",
      "addedAt": "2021-08-02T12:16:30+00:00",
      "language": "en-US"
    }
  }
}
```
## Get a user

After inviting a user, you can get a user.

Request example:

GET /api/users/v2/&lt;user_id&gt;
```shell
curl 'https://<example>/api/users/v2/b30e538d-4b05-4a75-ae25-7eb565901f38' -H "Authorization: Bearer <your_access_token>"
```
Note: The URL contains b30e538d-4b05-4a75-ae25-7eb565901f38. What is it? It is a user ID. If you want to update a given resource, you need to specify which one. You'll find a user ID in the `data/id` field in the response for adding a user.

Response example:
```
{
  "data": {
    "id": "b30e538d-4b05-4a75-ae25-7eb565901f38",
    "type": "ppms/user",
    "attributes": {
      "email": "user@example.com",
      "role": "USER",
      "addedAt": "2021-08-02T12:16:30+00:00",
      "language": "en-US"
    }
  }
}
```
## Change the user's language

If you want to change the user's language after adding a user, you can use the following method.

Request example:

PATCH /api/users/v2/&lt;user_id&gt;
```shell
curl -X PATCH 'https://<example>/api/users/v2/b30e538d-4b05-4a75-ae25-7eb565901f38' -H "Authorization: Bearer <your_access_token>" -H "Content-Type: application/vnd.api+json" -v --data '{
  "data": {
    "type": "ppms/user",
    "id": "b30e538d-4b05-4a75-ae25-7eb565901f38",
    "attributes": {
      "language": "de-DE"
    }
  }
}'
```
This request changed the user's language name from en-US to de-DE.

Here are some things to know:

-   We use -X PATCH before the URL. It means that this request is available using HTTP PATCH method.
-   You also need to specify data/id. It's a [JSON API](http://jsonapi.org/) requirement.
-   data/type is required. For example, when you want to work with a user resource, specify its type as ppms/user.
-   You can set only parameters you want to update. For more user attributes, go to [User edit reference](https://developers.piwik.pro/en/latest/platform/authorized_api/users/users_api.html#operation/api_user_edit_v2)

API will return 204 No Content status code with an empty response.

## Delete a user

When you want to remove a user, you can use the following method.

Request example:

DELETE /api/users/v2/&lt;user_id&gt;
```shell
curl -X DELETE 'https://<example>/api/users/v2/b30e538d-4b05-4a75-ae25-7eb565901f38' -H "Authorization: Bearer <your_access_token>"
```
API will only return 204 No Content status code.
