Public API guide
========================

This page describes how to access Piwik PRO API which uses 
[client credentials](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)
OAuth grant type for obtaining user token. 
All data is sent and received as JSON and it uses [JSON API](http://jsonapi.org/) specification.

## Obtaining token

If you want to access API for the first time you need to generate your 
API credentials which then allows you to request for a token that is used for authentication during communication with public API.

### Generate API Credentials

* Login to your account using your email and password.
* Go to your profile (`Menu` then `My profile`).
* On this page click on `API Credentials` tab. This page allows you to manage all your API credentials.
* Click `Generate new credentials` which will result in new popup. Fill in your custom `credentials name`.
  Name must contains at least 3 characters.
* Copy your newly generated `CLIENT ID` and `CLIENT SECRET` because they **won't be available for you after dismissing this window.**

### Create access token

Having generated your API Credentials, now you are ready for creating access token that will be used in communication with API.
To do so, send POST request 
```
POST /auth/token
```

Curl example:

```
curl 'https://<domain>/auth/token' -H "Content-Type: application/json" --data '{
    "grant_type": "client_credentials",
    "client_id": "your_generated_client_id",
    "client_secret": "your_generated_client_secret"
}' 
```

The example response is: 
```
{"token_type":"Bearer","expires_in":86400,"access_token":"your_access_token"}
```

Piwik PRO API tokens use [jwt](https://jwt.io/) format.

Now, you can use obtained `access_token` for communication with Piwik PRO API.
Field `expires_in` stands for time (in seconds) for token TTL.
As token is a Bearer type, it must be **included in all API calls** within header.

```
Authorization: Bearer your-token-here
```
  
## Deleting API Credentials

Once you want to revoke the possibility of generating API token using given `CLIENT ID` and `CLIENT SECRET`,
go to to `My profile` and click `Delete` button on selected API credentials.
