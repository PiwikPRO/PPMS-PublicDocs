Postman
=======

[Postman](https://www.getpostman.com/) is the tool that lets you build, send and test API calls. You can easily import Piwik PRO API to Postman and try it out.

Here are the Swagger docs that you can you import:

* <a href="_static/api/platform_access_control_authorized_api.json" target="_blank">Access control</a>
* <a href="_static/api/platform_apps_authorized_api.json" target="_blank">Apps</a>
* <a href="_static/api/platform_audit_log_authorized_api.json" target="_blank">Audit log</a>
* <a href="_static/api/platform_meta_sites_authorized_api.json" target="_blank">Meta Sites</a>
* <a href="_static/api/platform_modules_authorized_api.json" target="_blank">Modules</a>
* <a href="_static/api/platform_tracker_settings_authorized_api.json" target="_blank">Tracker settings</a>
* <a href="_static/api/platform_users_authorized_api.json" target="_blank">Users</a>
* <a href="_static/api/platform_user_groups_authorized_api.json" target="_blank">User Groups</a>
* And 12 more

To use Postman, follow these steps:

1. In Postman, click **Import** > **File** or **Link**.
2. Pick the file or link you want to import.
2. Done. All of your paths are imported.
3. Replace your account address in the URL. Example: ``https://example.piwik.pro``.
4. Add your token: In the selected API call, click **Authorization**.
5. Use the **Bearer Token** type.
6. Paste your token.
7. Click **Send** to call API.
