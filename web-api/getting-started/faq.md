FAQ
===

**API returns "application/json" is not a valid JSON API Content-Type header, use "application/vnd.api+json" instead"**

All API calls need to be created with the Content-Type: application/vnd.api+json header. If you use curl, you need to use the -H "Content-Type: application/vnd.api+json" flag. Postman allows configuring headers with the Header tab.

**API returns JWT not found**

You need to use your API token with every API call. Always send your API token within the Authorization: Bearer &lt;your_access_token&gt; header. If you use curl, you need to use the -H "Authorization: Bearer &lt;your_access_token&gt;" flag. Postman allows configuring tokens in the authorization tab. Choose the Bearer Token type and paste the token there. Remember to keep your token secure because it gives access to sensitive data.

**API returns Expired JWT Token**

Every token is valid for 30 minutes. After the token expires, you can create it again.

**API returns access token not authorized**

This message means that you sent an access token within a correct Authorization: Bearer field, but the token is invalid. Check your token and try again.
