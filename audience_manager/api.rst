.. highlight:: js
.. default-domain:: js

Audience Manager JavaScript API
===============================
This API provides JavaScript access to multiple resources.

Loading snippet
---------------
Add following snippet on a page to start using Audience Manager JS API.

The code should be added near the top of the <head> tag and before any other script or CSS tags. PPMS configuration
additionally requires 2 changes in example code.

App ID
``````
Replace 'XXX-XXX-XXX-XXX-XXX' with your Piwik App ID (previously Website ID). Example::

    "efcd98a5-335b-48b0-ab17-bf43f1c542be"

PPMS domain
```````````
Replace 'ppms.example.com' with your PPMS Tracker domain. Please note that this value is used in 2 places:

* 'https://ppms.example.com/audiences/static/widget/audience-manager.api.min.js'
* 'ppms.example.com'

Snippet
```````

Code:

.. code-block:: html

    <script>
        (function(a,d,g,h,b,c,e){a[b]=a[b]||{};a[b][c]=a[b][c]||{};a[b][c][e]=a[b][c][e]||function(){(a[b][c][e].q=a[b][c][e].q||[]).push(arguments)};var f=d.createElement(g);d=d.getElementsByTagName(g)[0];f.async=1;f.src=h;d.parentNode.insertBefore(f,d)})
        (window,document,"script","https://ppms.example.com/audiences/static/widget/audience-manager.api.min.js","ppms","am","api");

        ppms.am.api('create', 'XXX-XXX-XXX-XXX-XXX', 'ppms.example.com');
    </script>

API function
------------

Loading snippet creates following API function:

.. function:: ppms.am.api(command, ...args)

    JavaScript API interface.

    :param string command: Command name.
    :param args: Command arguments. Number of arguments and their function depend on command.
    :returns: Nothing. All commands are prepared to be run asynchronously.


Commands
--------
Following commands work in context of current browser user profile. Additionally these commands require communication
with server so they are asynchronous. Callback functions are used to provide response or error information.

List audiences
``````````````
Gets list of user audiences.

Code::

    ppms.am.api('getAudiences', onFulfilled, onRejected);

.. function:: onFulfilled(audience_list)

    Function executed on success.

    :param Array<string> audience_list: Array of audience IDs user belongs to. Example::

        ['e8c6e873-955c-4771-9fd5-92c94577e9d9', '756e5920-422f-4d13-b73a-917f696ca288']

.. function:: onRejected(error)

    Function executed on error.

    :param string error: Error code. Example::

        'server_error'

Check audience
``````````````
Checks if user is part of specific audience.

Code::

    ppms.am.api('checkAudience', audience_id, onFulfilled, onRejected);

.. data:: audience_id

    ID of checked audience. Example::

        '52073260-5861-4a56-be5e-6628794722ee'

.. function:: onFulfilled(in_audience)

    Function executed on success.

    :param boolean in_audience: True when user is part of audience, false otherwise.

.. function:: onRejected(error)

    Function executed on error.

    :param string error: Error code. Example::

        'server_error'

Get attributes
``````````````
Gets user attributes.

.. warning::

    Only white-listed attributes are available this way.

Code::

    ppms.am.api('getAttributes', onFulfilled, onRejected);

.. function:: onFulfilled(attributes)

    Function executed on success.

    :param Object<string,Object<string,string>> attributes: Object containing all white-listed attributes. It's divided
        on by categories. 'analytics' object contain analytical data about the user (e.g. browser name and version,
        country, etc.). 'attributes' object contain data from other sources (e.g. Audience Manager Form Tracker, data
        merged via CSV import etc.). Example::

            {
                "analytics": {
                    "browser_name": "chrome",
                    "country": "us",
                },
                "attributes": {
                    "first_name": "James",
                    "last_name": "Bond"
                }
            }

.. function:: onRejected(error)

    Function executed on error.

    :param string error: Error code. Example::

        'server_error'

Update attributes
`````````````````
Updates user attributes.

Code::

    ppms.am.api('updateAttributes', attributes, options);

.. data:: attributes

    Object containing attributes to update. Every key and value should be a string. Example::

        {
            "favourite_color": "black",
            "drink: "Martini"
        }

.. data:: options

    **Optional** object that lets execute command with extra parameters. Example::

        {
            "user_id": user_id,
            "device_id": device_id,
            "email": email,
            "onFulfilled": onFulfilled,
            "onRejected": onRejected
        }

    .. attribute:: user_id

        If application lets user login this option will let Audience Managed better identify user across sessions. It's
        value should be unique user identifier provided by the App. It may be user handle or internal user ID. Example::

            "jbond"

    .. attribute:: device_id

        If application has access to device id this option will let Audience Managed better identify user across
        sessions. Example::

            "007"

    .. attribute:: email

        If application can track user by his email this option will let Audience Managed better identify user across
        sessions. Example::

            "j.bond@mi6.gov.uk"

    .. function:: onFulfilled()

        Function executed on success.

    .. function:: onRejected(error)

        Function executed on error.

        :param string error: Error code. Example::

            'server_error'