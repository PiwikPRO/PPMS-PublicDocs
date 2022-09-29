Postman
=======

[Postman](https://www.getpostman.com/) is a multiplatform GUI application for creating API calls. Piwik PRO allows you to export Swagger documentation and easily import it to Postman. Depending of what you want to work with, you can import the following swagger docs:

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

1. In Postman, click **Import** -&gt; **Import From Link**.
2. Done. All of your paths are imported.
3. Replace your domain in the URL.
4. Add your token: In the selected API call, click **Authorization**.
5. Use the Bearer Token type.
6. Paste your token.
7. Click **SEND** to call API.
