.. highlight:: js
.. default-domain:: js

JavaScript API
==============

This API provides access to information about :term:`user` such as ID of :term:`audience` he is part of and his
:term:`attributes<attribute>`. It also allows to update his :term:`attributes<attribute>`.

Loading snippet
---------------
Add following snippet on your page to start using this API.

This code should be added just before you want to use the API. Additionally snippet has to be configured this way:

- String ``XXX-XXX-XXX-XXX-XXX`` should be replaced with :term:`app ID` (e.g. ``efcd98a5-335b-48b0-ab17-bf43f1c542be``).
- String ``ppms.example.com`` should be replaced with your PPMS domain name (please note that it's used in 2 places in
  the snippet).

.. code-block:: html

    <script>
        (function(a,d,g,h,b,c,e){a[b]=a[b]||{};a[b][c]=a[b][c]||{};a[b][c][e]=a[b][c][e]||function(){(a[b][c][e].q=a[b][c][e].q||[]).push(arguments)};var f=d.createElement(g);d=d.getElementsByTagName(g)[0];f.async=1;f.src=h;d.parentNode.insertBefore(f,d)})
        (window,document,"script","https://ppms.example.com/audiences/static/widget/audience-manager.api.min.js","ppms","am","api");

        ppms.am.api("create", "XXX-XXX-XXX-XXX-XXX", "ppms.example.com");
    </script>

This code initializes API interface in following ways:

    #. Creates a ``<script>`` tag that asynchronously loads Audience Manager API library.
    #. Initializes global ``ppms.am.api`` command queue that schedules commands to be run when API library is loaded.
    #. Schedules create API command on ``ppms.am.api``.

You can use the API command queue (``ppms.am.api``) immediately after step 3.

Command queue
-------------
Loading snippet creates following global function:

.. function:: ppms.am.api(command, ...args)

    Audience Manager API command queue.

    :param string command: Command name.
    :param args: Command arguments. Number of arguments and their function depend on command.
    :returns: Commands are expected to be run asynchronously and return no value.
    :rtype: undefined

Commands
--------
All commands work in context of current :term:`user`. Additionally they require communication with PPMS server and are
asynchronous. Callback functions are used to provide response value or information about error.

Get list of audiences user belongs to
`````````````````````````````````````
Gets list of :term:`audience` IDs :term:`user` belongs to.

Code::

    ppms.am.api("getAudiences", onFulfilled, onRejected);

.. function:: onFulfilled(audience_list)

    Function executed on success.

    :param Array<string> audience_list: Array of :term:`audience` IDs :term:`user` belongs to.

        Example::

            ["e8c6e873-955c-4771-9fd5-92c94577e9d9", "756e5920-422f-4d13-b73a-917f696ca288"]

.. function:: onRejected(error_code)

    Function executed on error.

    :param string error_code: Error code.

        Example::

            "server_error"

Check user membership in the audience
`````````````````````````````````````
Checks if :term:`user` belongs to specific :term:`audience`.

Code::

    ppms.am.api("checkAudience", audience_id, onFulfilled, onRejected);

.. data:: audience_id

    ID of checked :term:`audience`.

    Example::

        "52073260-5861-4a56-be5e-6628794722ee"

.. function:: onFulfilled(in_audience)

    Function executed on success.

    :param boolean in_audience: *True* when :term:`user` is part of the :term:`audience`, *false* otherwise.

        Example::

            true

.. function:: onRejected(error_code)

    Function executed on error.

    :param string error_code: Error code.

        Example::

            "server_error"

Get user attributes
```````````````````
Gets :term:`user` profile :term:`attributes<attribute>`. :term:`User` has to be identified by :term:`analytics ID`.

.. note::
    In order to secure the :term:`PII` data, no :term:`attribute` is returned by default. You need to put each
    :term:`attribute` you want to access on :term:`attribute whitelist` before it'll be returned by this command. In
    order to do that, go to `Audience Manager` > `Attributes` tab and `enable` :term:`attribute` for the public API
    access. It's your responsibility to make sure no :term:`user` :term:`PII` data will be available via API.

.. todo::
    Check with Data Protection Officer what are restrictions on data provided this way. Maybe we should add here link to
    legal requirements for such API? Was "no PII" rule consulted with him? I think it's common to fetch user name for
    personalization and while that information isn't PII it can become one when combined with information from other
    attributes.

Code::

    ppms.am.api("getAttributes", onFulfilled, onRejected);

.. function:: onFulfilled(attributes)

    Function executed on success.

    :param Object<string,Object<string,string>> attributes: Object containing :term:`user` :term:`attributes<attribute>`
        divided by source.

        - `analytics` - ``Object<string,string>`` Contains :term:`analytics attributes<analytics attribute>` about the
          :term:`user` (e.g. browser name, browser version, country).
        - `attributes` - ``Object<string,string>`` Contains :term:`custom attributes<custom attribute>` about the
          :term:`user` (e.g. first name, last name, email).

        .. todo::
            Check if we can change label of custom attributes from ``attribute`` to ``custom`` (``field_type`` in HTTPS
            API and name of container in JS API).

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

    Function executed on error.

    :param string error_code: Error code.

        Example::

            "server_error"

Update user attributes
``````````````````````
Creates or updates :term:`user` :term:`custom attributes<custom attribute>`.

.. note::
    Any :term:`attribute` can be updated this way whenever it is on :term:`attribute whitelist` or not.

Code::

    ppms.am.api("updateAttributes", attributes, options);

.. data:: attributes

    Object containing :term:`attributes<attribute>` to update. Its keys and values should be a ``string`` type.

    Example::

        {
            "favourite_color": "black",
            "drink": "Martini"
        }

.. data:: options

    **Optional** Object that can specify additional :term:`user` :term:`identifiers<identifier>` and callback functions.

     Example::

        {
            "user_id": user_id,
            "device_id": device_id,
            "email": email,
            "onFulfilled": onFulfilled,
            "onRejected": onRejected
        }

    .. attribute:: user_id

        If :term:`application` lets :term:`user` to sign in - it's possible to pass unique permanent :term:`user ID`
        using this option. This will let Audience Manager better identify :term:`user` across devices (laptop, phone)
        and sessions.

        Example::

            "jbond"

    .. attribute:: device_id

        If :term:`application` has access to :term:`device ID` - it's possible to pass this value using this option.
        This will let Audience Manager better identify :term:`user` across sessions.

        Example::

            "1234567890ABCDEF"

    .. attribute:: email

        If :term:`application` identifies :term:`user` via his email - it's possible to pass this value using this
        option. This will let Audience Manager better identify :term:`user` across devices (laptop, phone) and sessions.

        Example::

            "j.bond@mi6.gov.uk"

    .. function:: onFulfilled()

        Function executed on success.

    .. function:: onRejected(error_code)

        Function executed on error.

        :param string error_code: Error code.

            Example::

                "server_error"
