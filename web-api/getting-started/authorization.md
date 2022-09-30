Authorization
=============

If you want to access API for the first time, you need to generate your API credentials and use them to create an access token. The token is needed to authenticate API calls.

Our API uses [client credentials](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/) (OAuth grant type) for obtaining a user token. All data is sent and received as JSON and is compliant with the [JSON API](http://jsonapi.org/) specification.

## Create API keys

To create API keyes, follow these steps:

1. Log in to [Piwik PRO](https://piwik.pro/login/).
2. Go to **Menu** &gt; **Profile**.
3. Navigate to **API keys**.
4. Click **Create a key**.
5. Enter **Name** and click **OK**.
6. Copy **Client ID** and **Client secret**. They won’t be available after you close this window.

Note: Credentials are valid until they are deleted in **Profile**.

## Create an access token

To create an access token, follow these steps:

1. Piwik PRO API tokens use [JWT](https://jwt.io/) format.
2. Make a call:
  ```shell
        curl -X POST 'https://<example>/auth/token' -H "Content-Type: application/json" --data '{
        "grant_type": "client_credentials",
        "client_id": "<client_id>",
        "client_secret": "<client_secret>"
        }'
  ```
  Note: If you are the [Core plan](https://piwik.pro/core-plan/) user, replace &lt;example&gt; with &lt;your_account_name&gt;.piwik.pro.

3. Response example:
  ```
    {"token_type":"Bearer","expires_in":1800,"access_token":"<your_access_token>"}
  ```
4. Now you can use &lt;your_access_token&gt; to communicate with Piwik PRO API. The token is a Bearer type, so you need to include it within the header in every API call.  
  ```
    Authorization: Bearer <your_access_token>
  ```
  Note: Every token is valid for 30 minutes. expires_in shows the expiration time in seconds.

## Delete API keys

If you no longer want to use generated API credentials in access tokens, you need to delete them.

To delete API credentials, follow these steps:

1. Log in to [Piwik PRO](https://piwik.pro/login/).
2. Go to **Menu** &gt; **Profile**.
3. Navigate to **API keys**.
4. Choose credentials that you want to revoke and click **X**.
