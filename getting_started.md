Getting started
===============

Create API credentials and an access token
------------------------------------------

If you want to access API for the first time, you need to generate your API credentials and use them to create an access token. The token is needed to authenticate API calls.

Our API uses [client credentials](https://www.google.com/url?q=https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/&sa=D&source=editors&ust=1630060263067000&usg=AOvVaw3sSE7Kj9YdsZdt_F7kR4Dg) (OAuth grant type) for obtaining a user token. All data is sent and received as JSON and is compliant with the [JSON API](https://www.google.com/url?q=http://jsonapi.org/&sa=D&source=editors&ust=1630060263068000&usg=AOvVaw3gWYzJ3CM3WZneyuHqiwDD) specification.

### Generate API credentials

To generate API credentials, follow these steps:

1.  Log in to [Piwik PRO](https://www.google.com/url?q=https://piwik.pro/login/&sa=D&source=editors&ust=1630060263068000&usg=AOvVaw2zFTi-fgZWlr4WI6jfsozD).
2.  Go to Menu &gt; Profile.
3.  Navigate to API credentials.
4.  Click Generate new credentials.
5.  Enter Name and click OK.
6.  Copy Client ID and Client secret. They won’t be available after you close this window.

Note: Credentials are valid until they are deleted in the Profile.

### Create an access token

To create an access token, follow these steps:

1.  Piwik PRO API tokens use [JWT](https://www.google.com/url?q=https://jwt.io/&sa=D&source=editors&ust=1630060263070000&usg=AOvVaw3KCeEZp1td0_QwfpbHid37) format.
2.  Make a call:
    ```
    curl -X POST 'https://<example>/auth/token' -H "Content-Type: application/json" --data '{
        "grant_type": "client_credentials",
        "client_id": "<client_id>",
        "client_secret": "<client_secret>"
    }'
    ```
    Note: If you are the [Core plan](https://www.google.com/url?q=https://stage.piwik.pro/core-plan/&sa=D&source=editors&ust=1630060263071000&usg=AOvVaw2nqlsp6Xh-XZXAiey1Z8ZS) user, replace &lt;example&gt; with &lt;your_account_name&gt;.piwik.pro.


3.  Response example:
    ```
    {"token_type":"Bearer","expires_in":1800,"access_token":"<your_access_token>"}
    ```
4.  Now you can use &lt;your_access_token&gt; to communicate with Piwik PRO API. The token is a Bearer type, so you need to include it within the header in every API call.  
    ```
    Authorization: Bearer <your_access_token>
    ```
    Note: Every token is valid for 30 minutes. expires_in shows the expiration time in seconds.

### Delete API credentials

If you no longer want to use generated API credentials in access tokens, you need to delete them.

To delete API credentials, follow these steps:

1.  Log in to [Piwik PRO](https://www.google.com/url?q=https://piwik.pro/login/&sa=D&source=editors&ust=1630060263074000&usg=AOvVaw2AxWdP-tuJMm5bwgIOyCch).
2.  Go to Menu &gt; Profile.
3.  Navigate to API credentials.
4.  Choose credentials that you want to revoke and click X.

Examples of using API
---------------------

Note: To use any API call, you need to have API credentials (see above).

### Using API with curl

In this example, we want to perform some basic operations on a user. We'll do the following operations:

-   Invite a user
-   Get a created user
-   Change the user's language
-   Delete a user

Note: In our example, we use https://&lt;example&gt; as an account address. An account address has this format: https://example.piwik.pro.

### Generate your access token

Example of a request:

POST /auth/token
```
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

#### Invite a user

Request example:

POST /api/users/v2
```
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
#### Get a user

After inviting a user, you can get a user.

Request example:

GET /api/users/v2/&lt;user_id&gt;
```
curl 'https://<example>/api/users/v2/b30e538d-4b05-4a75-ae25-7eb565901f38' -H "Authorization: Bearer <your_access_token>"
```
Note: The URL contains b30e538d-4b05-4a75-ae25-7eb565901f38. What is it? It is a user ID. If you want to update a given resource, you need to specify which one. You'll find a user ID in the 'data/id' field in the response for adding a user.

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
#### Change the user's language

If you want to change the user's language after adding a user, you can use the following method.

Request example:

PATCH /api/users/v2/&lt;user_id&gt;
```
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
-   You also need to specify data/id. It's a [JSON API](https://www.google.com/url?q=http://jsonapi.org/&sa=D&source=editors&ust=1630060263085000&usg=AOvVaw2_e_sclz4GJt7m6MGXaLFm) requirement.
-   data/type is required. For example, when you want to work with a user resource, specify its type as ppms/user.
-   You can set only parameters you want to update. For more user attributes, go to [User edit reference](https://www.google.com/url?q=https://developers.piwik.pro/en/latest/platform/authorized_api/users/users_api.html%23operation/api_user_edit_v2&sa=D&source=editors&ust=1630060263086000&usg=AOvVaw0yoM7j6pRMx9PuxjFogbK_)

API will return 204 No Content status code with an empty response.

#### Delete a user

When you want to remove a user, you can use the following method.

Request example:

DELETE /api/users/v2/&lt;user_id&gt;
```
curl -X DELETE 'https://<example>/api/users/v2/b30e538d-4b05-4a75-ae25-7eb565901f38' -H "Authorization: Bearer <your_access_token>"
```
API will only return 204 No Content status code.

Using API with Postman
----------------------

[Postman](https://www.google.com/url?q=https://www.getpostman.com/&sa=D&source=editors&ust=1630060263088000&usg=AOvVaw1lQo0yxNdLX5HMpj8mXRUo) is a multiplatform GUI application for creating API calls. Piwik PRO allows you to export Swagger documentation and easily import it to Postman. Depending of what you want to work with, you can import the following swagger docs:

-   [Access control](https://www.google.com/url?q=https://github.com/PiwikPRO/PPMS-PublicDocs/blob/feature/PPCDEV-13485-authorized-api-doc/_static/api/platform_access_control_authorized_api.json&sa=D&source=editors&ust=1630060263089000&usg=AOvVaw3emmPpf6ETqjfL5R93qvZB)
-   [Apps](https://www.google.com/url?q=https://github.com/PiwikPRO/PPMS-PublicDocs/blob/feature/PPCDEV-13485-authorized-api-doc/_static/api/platform_apps_authorized_api.json&sa=D&source=editors&ust=1630060263089000&usg=AOvVaw1iixYjCox51M9uoZ1ficpO)
-   [Audit Log](https://www.google.com/url?q=https://github.com/PiwikPRO/PPMS-PublicDocs/blob/feature/PPCDEV-13485-authorized-api-doc/_static/api/platform_audit_log_authorized_api.json&sa=D&source=editors&ust=1630060263090000&usg=AOvVaw2wgD5SlTA74IbxjX9F_Ra3)
-   [Meta Sites](https://www.google.com/url?q=https://github.com/PiwikPRO/PPMS-PublicDocs/blob/feature/PPCDEV-13485-authorized-api-doc/_static/api/platform_meta_sites_authorized_api.json&sa=D&source=editors&ust=1630060263091000&usg=AOvVaw2i_vDuAgQva3fSrCHrKo74)
-   [Modules](https://www.google.com/url?q=https://github.com/PiwikPRO/PPMS-PublicDocs/blob/feature/PPCDEV-13485-authorized-api-doc/_static/api/platform_modules_authorized_api.json&sa=D&source=editors&ust=1630060263091000&usg=AOvVaw3vON6waazTeHVZI5Tosp-B)
-   [Tracker Settings](https://www.google.com/url?q=https://github.com/PiwikPRO/PPMS-PublicDocs/blob/feature/PPCDEV-13485-authorized-api-doc/_static/api/platform_tracker_settings_authorized_api.json&sa=D&source=editors&ust=1630060263092000&usg=AOvVaw0zCerEax3PSW5ICgIksH4e)
-   [Users](https://www.google.com/url?q=https://github.com/PiwikPRO/PPMS-PublicDocs/blob/feature/PPCDEV-13485-authorized-api-doc/_static/api/platform_users_authorized_api.json&sa=D&source=editors&ust=1630060263092000&usg=AOvVaw1cGIqKjWZbrrvWrhYbM0C7)
-   [User Groups](https://www.google.com/url?q=https://github.com/PiwikPRO/PPMS-PublicDocs/blob/feature/PPCDEV-13485-authorized-api-doc/_static/api/platform_user_groups_authorized_api.json&sa=D&source=editors&ust=1630060263093000&usg=AOvVaw1yAsakcklH15NA7U0dxT4f)

To use Postman, follow these steps:

1.  In Postman, click import -&gt; Import From Link.
2.  Done. All of your paths are imported.
3.  Now override two elements:

-   Replace your domain in the URL.
-   Add your token: In the selected API call, click Authorization. Use the Bearer Token type. Paste your token. Click SEND to call API.

FAQ
---

#### API returns "application/json" is not a valid JSON API Content-Type header, use "application/vnd.api+json" instead"

All API calls need to be created with the Content-Type: application/vnd.api+json header. If you use curl, you need to use the -H "Content-Type: application/vnd.api+json" flag. Postman allows configuring headers with the Header tab.

#### API returns JWT not found

You need to use your API token with every API call. Always send your API token within the Authorization: Bearer &lt;your_access_token&gt; header. If you use curl, you need to use the -H "Authorization: Bearer &lt;your_access_token&gt;" flag. Postman allows configuring tokens in the authorization tab. Choose the Bearer Token type and paste the token there. Remember to keep your token secure because it gives access to sensitive data.

#### API returns Expired JWT Token

Every token is valid for 30 minutes. After the token expires, you can create it again.

#### API returns access token not authorized

This message means that you sent an access token within a correct Authorization: Bearer field, but the token is invalid. Check your token and try again.