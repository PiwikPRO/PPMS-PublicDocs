.. highlight:: js
.. default-domain:: js

JavaScript API
==============

This API provides access to information about :term:`users<user>` such as ID of :term:`audience` they are part of and their
:term:`attributes<attribute>`. It also allows you to update their :term:`attributes<attribute>`.

Loading snippet
---------------
Add the following snippet on your page to start using this API. It should be added just before the first API usage.

Configuration:

    - String ``XXX-XXX-XXX-XXX-XXX`` should be replaced with :term:`app ID` (e.g.
      ``efcd98a5-335b-48b0-ab17-bf43f1c542be``).
    - String ``https://your-instance-name.piwik.pro/`` should be replaced with your PPAS instance address. (please note that it's used in 2 places
      in the snippet).

Code:

.. code-block:: html

    <script>
        (function(a,d,g,h,b,c,e){a[b]=a[b]||{};a[b][c]=a[b][c]||{};a[b][c][e]=a[b][c][e]||function(){(a[b][c][e].q=a[b][c][e].q||[]).push(arguments)};var f=d.createElement(g);d=d.getElementsByTagName(g)[0];f.async=1;f.src=h;d.parentNode.insertBefore(f,d)})
        (window,document,"script","https://your-instance-name.piwik.pro/audiences/static/widget/audience-manager.api.min.js","ppms","am","api");

        ppms.am.api("create", "XXX-XXX-XXX-XXX-XXX", "your-instance-name.piwik.pro");
    </script>

This code initializes the API interface in the following ways:

    #. Creates a ``<script>`` tag that asynchronously loads the Audience Manager API library.
    #. Initializes the global ``ppms.am.api`` command queue that schedules commands to be run when the API library is loaded.
    #. Schedules ``create`` command on ``ppms.am.api`` to initialize the API object with a basic PPAS configuration.

You can use the API command queue (``ppms.am.api``) immediately after step 3.

Command queue
-------------
Executing the snippet creates the following global function:

.. function:: ppms.am.api(command, ...args)

    Audience Manager API command queue.

    :param string command: Command name.
    :param args: Command arguments. The number of arguments and their function depend on command.
    :returns: Commands are expected to be run asynchronously and return no value.
    :rtype: undefined

Commands
--------
All commands work in context of the current :term:`user`. Additionally they require communication with a PPAS server and are
asynchronous. Callback functions are used to provide response value or information about errors.

Get list of audiences user belongs to
`````````````````````````````````````
Fetches a list of :term:`audience` IDs the :term:`user` belongs to.

Code::

    ppms.am.api("getAudiences", onFulfilled, onRejected);

.. function:: onFulfilled(audience_list)

    The fulfilment handler callback (called with result).

    :param Array<string> audience_list: **Required** Array of :term:`audience` IDs the :term:`user` belongs to.

        Example::

            ["e8c6e873-955c-4771-9fd5-92c94577e9d9", "756e5920-422f-4d13-b73a-917f696ca288"]

.. function:: onRejected(error_code)

    The rejection handler callback (called with error code).

    :param string error_code: **Required** Error code.

        Example::

            "server_error"

Check user membership in the audience
`````````````````````````````````````
Checks if the :term:`user` belongs to the :term:`audience`.

Code::

    ppms.am.api("checkAudience", audience_id, onFulfilled, onRejected);

.. describe:: audience_id

    **Required** ``string`` ID of the checked :term:`audience`.

    Example::

        "52073260-5861-4a56-be5e-6628794722ee"

.. function:: onFulfilled(in_audience)

    The fulfilment handler callback (called with result).

    :param boolean in_audience: **Required** *True* when :term:`user` is part of the :term:`audience`, *false*
        otherwise.

        Example::

            true

.. function:: onRejected(error_code)

    The rejection handler callback (called with error code).

    :param string error_code: **Required** Error code.

        Example::

            "server_error"

Get user attributes
```````````````````
Fetches the :term:`user` profile :term:`attributes<attribute>`. The :term:`user` have to be identified by :term:`analytics ID`.

.. note::
    In order to secure the :term:`PII` data, no :term:`attribute` is returned by default. You need to put each
    :term:`attribute` you want to access on :term:`attribute whitelist` before it is returned by this command. In
    order to do that, go to `Audience Manager` > `Attributes` tab and `enable` :term:`attribute` for the public API
    access. It is your responsibility to make sure no :term:`user` :term:`PII` data will be available via API.

.. todo::
    Check with Data Protection Officer what are restrictions on data provided this way. Maybe we should add here link to
    legal requirements for such API? Was "no PII" rule consulted with him? I think it's common to fetch user name for
    personalization and while that information isn't PII it can become one when combined with information from other
    attributes.

Code::

    ppms.am.api("getAttributes", onFulfilled, onRejected);

.. function:: onFulfilled(attributes)

    The fulfilment handler callback (called with result).

    :param Object<string,Object<string,string>> attributes: **Required** Object containing :term:`user`
        :term:`attributes<attribute>` divided by source.

        - `analytics` - ``Object<string,string>`` Contains :term:`analytics attributes<analytics attribute>` about the
          :term:`user` (e.g. browser name, browser version, country).
        - `attributes` - ``Object<string,string>`` Contains :term:`custom attributes<custom attribute>` about the
          :term:`user` (e.g. first name, last name, email).

        Example::

            {
                "analytics": {
                    "browser_name": "chrome",
                    "country": "us"
                },
                "attributes": {
                    "first_name": "James",
                    "last_name": "Bond"
                }
            }

.. function:: onRejected(error_code)

    The rejection handler callback (called with error code).

    :param string error_code: **Required** Error code.

        Example::

            "server_error"

Update user attributes
``````````````````````
Creates or updates :term:`user` :term:`custom attributes<custom attribute>`.

.. note::
    Any :term:`attribute` can be updated this way whether it is on the :term:`attribute whitelist` or not.

Code::

    ppms.am.api("updateAttributes", attributes, options);

.. describe:: attributes

    **Required** ``Object<string,string>`` Object containing :term:`attributes<attribute>` to update:

        - key - :term:`attribute` name
        - value - :term:`attribute` value

    Example::

        {
            "favourite_color": "black",
            "drink": "Martini"
        }

.. describe:: options

    **Optional** ``object`` Object that can specify additional :term:`user` :term:`identifiers<identifier>` and callback
    functions.

     Example::

        {
            "user_id": user_id,
            "device_id": device_id,
            "email": email,
            "onFulfilled": onFulfilled,
            "onRejected": onRejected
        }

    .. attribute:: user_id

        **Optional** ``string`` If the :term:`application` lets :term:`user` sign in - it is possible to pass a unique
        permanent :term:`user ID` using this parameter. This will let the Audience Manager better identify :term:`users<user>` across
        devices (laptop, phone) and sessions.

        Example::

            "jbond"

    .. attribute:: device_id

        **Optional** ``string`` If the :term:`application` has access to :term:`device ID` - it is possible to pass this
        value using this parameter. This will let the Audience Manager better identify :term:`users<user>` across sessions.

        Example::

            "1234567890ABCDEF"

    .. attribute:: email

        **Optional** ``string`` If the :term:`application` identifies :term:`user` via his email - it is possible to pass
        this value using this parameter. This will let the Audience Manager better identify :term:`users<user>` across devices
        (laptop, phone) and sessions.

        Example::

            "j.bond@mi6.gov.uk"

    .. function:: onFulfilled()

        **Optional** The fulfilment handler callback (called with result).

    .. function:: onRejected(error_code)

        **Optional** The rejection handler callback (called with error code).

        :param string error_code: **Required** Error code.

            Example::

                "server_error"
