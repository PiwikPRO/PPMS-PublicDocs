FAQ
===

**API returns application/json is not a valid JSON API Content-Type header, use application/vnd.api+json instead**

All API calls need to be created with this header: ``Content-Type: application/vnd.api+json``. If you use curl, you need to use this flag: ``-H "Content-Type: application/vnd.api+json"``.

Postman allows configuring headers with the header tab.

**API returns JWT not found**

You need to use your API token with every API call. Always send your API token within this header: ``Authorization: Bearer <your_access_token>``. If you use curl, you need to use this flag: ``-H "Authorization: Bearer <your_access_token>"``.

Postman allows configuring tokens in the authorization tab. Choose the Bearer Token type and paste the token there. Remember to keep your token secure because it gives access to sensitive data.

**API returns Expired JWT Token**

Every token is valid for 30 minutes. After the token expires, you can create it again.

**API returns access token not authorized**

This message means that you sent an access token within a correct Authorization: Bearer field, but the token is invalid. Check your token and try again.
