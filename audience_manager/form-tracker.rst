.. highlight:: js
.. default-domain:: js

Form Tracker
============
Form Tracker gathers data submitted via forms on your page and sends it to the Audience Manager :term:`user` profile as
:term:`attributes<attribute>`.

.. note::
    Creates or updates :term:`user` :term:`custom attributes<custom attribute>` for each tracker field in the form.
    The :term:`attribute` name is generated from input tag (HTML tag's ``name`` attribute or description from its
    label). Inputs without a name are ignored.

Supported browsers
------------------
All modern browsers: Chrome, Firefox, Safari, Edge. Internet Explorer from version 8 and above.

.. todo:: Move information about supported browsers to document about PPMS in general since it's common to whole system.

Privacy by design
-----------------
PPAS follows "Privacy by design" approach to system engineering.

.. warning::
    Form tracker is trying to send its requests using secure **HTTPS** protocol, but **legacy IE browsers** (version 8
    and 9) don't have capability to send **CORS** requests using different protocol then the one used by origin page.
    That means that forms tracked on those browsers will use less secure **HTTP** protocol on pages served via **HTTP**
    protocol.

Private information
```````````````````
Form Tracker is trying to automatically detect fields containing :term:`user's<user>` private information and ignores
them regardless of the configuration. The following data is never sent to the Audience Manager:

.. todo:: Check what is legal term for ignored information's.

- Value from input with ``password`` or ``hidden`` type.
- Credit card number (heuristic detection).
- Credit card validation code (heuristic detection).

.. note::
    Heuristic detection makes best effort to automatically detect and ignore the aforementioned fields, but it does not
    guarantee success. Additionally, payment forms usually contain more fields with private information (e.g. address)
    so it is recommended to configure such forms using fields filter.

Configuration
`````````````
.. versionchanged:: 10.0
    Loading snippet changed to allow multiple initializations. Tracker will now try to merge configuration of tracked
    forms as long as ``options`` will allow it (will be identical).

.. versionchanged:: 6.3

    Tracked forms are configured using whitelist approach. All forms that should be tracked have to be added to the
    list, any unrecognized form will be ignored by the tracker.
    This approach changed from previous blacklist approach where forms had to be included on the list before tracker
    started ignoring them.

Installation
------------
This section describes how to install the Form Tracker client code on your page.

Using Tag Manager
`````````````````
`The Form Tracker tag template <https://help.piwik.pro/audience-manager/capturing-data-forms/>`_ is the recommended way to
install Form Tracker using PPAS stack.

Manual installation
```````````````````
Add the following snippet on your page to start using Form Tracker.

This code should be added near the top of the ``<head>`` tag and before any other script or CSS tags. Additionally
the snippet has to be configured this way:

- String ``XXX-XXX-XXX-XXX-XXX`` should be replaced with :term:`app ID` (e.g. ``efcd98a5-335b-48b0-ab17-bf43f1c542be``).
- String ``https://your-instance-name.piwik.pro//`` should be replaced with your PPAS instance address (please note that it's used in 3 places in the snippet).

.. versionchanged:: 10.0
.. code-block:: html

    <script>
        (function(a,d,g,h,b,c,e){a[b]=a[b]||{};a[b][c]=a[b][c]||{};if(!a[b][c][e]){a[b][c][e]=function(){(a[b][c][e].q=a[b][c][e].q||[]).push(arguments)};var f=d.createElement(g);d=d.getElementsByTagName(g)[0];f.async=1;f.src=h;d.parentNode.insertBefore(f,d)}})
        (window,document,"script","https://your-instance-name.piwik.pro/audiences/static/widget/audience-manager.form.min.js","ppms","am","form");
        ppms.am.form("create", "XXX-XXX-XXX-XXX-XXX", "your-instance-name.piwik.pro", forms_config, options);
    </script>

.. versionadded:: 6.3
.. describe:: forms_config

    **Required** ``Object<string,(boolean|{type: string, fields: Array<string>})>`` Configuration of tracked forms.
    Default configuration requires that all tracked forms are specified in this object as keys. Each key is another form
    ID.

    Value of each key can be specified in 2 ways:

    * ``true`` - All fields in form using this ID will be tracked (this behavior can be changed using :js:attr:`trackingType`
      option).
    * ``Object`` - Specifies which fields will be included or excluded from the form.

      .. attribute:: type

        **Required** ``"whitelist"|"blacklist"`` Defines type of form fields filter.

      .. attribute:: fields

        **Required** ``Array<string>`` Lists field names used by the filter. Default configuration identifies fields by
        input ``name`` attribute, but :js:attr:`useLabels` option can change this behavior.

    Example::

        {
            "tracked_form": true,
            "form_with_whitelisted_fields": {
                type: "whitelist",
                fields: ["included_field_1", "included_field_2"],
            },
            "form_with_blacklisted_fields": {
                type: "blacklist",
                fields: ["excluded_field_1", "excluded_field_2"],
            },
        }

.. versionadded:: 6.3
.. describe:: options

    **Optional** ``object`` Options that change behavior of the tracker.

    .. attribute:: useLabels

        **Optional** ``boolean`` Defines how tracker identifies form fields. When enabled tracker tries to find label of
        form field and use its text as identifier. If input doesn't have a label, tracker falls back to default
        identifier (HTML ``name`` attribute of the field). Default value: ``false``.

        Example::

            false

    .. deprecated:: 6.3
    .. attribute:: trackingType

        **Optional** ``"whitelist"|"blacklist"`` Defines what is default strategy of form configuration. Default value:
        ``"whitelist"``.

        * ``"whitelist"`` - All form IDs that are not set in ``forms_config`` are ignored by the tracker.
        * ``"blacklist"`` - All form IDs that are set in ``forms_config`` and use ``true`` value are ignored by the
          tracker. Forms defining filtered fields are tracked according to specified fields filter. All other forms are
          tracked as a whole.

        .. note:: This option is intended for backward compatibility and is planned to be removed in the future.

    Example::

        {
            useLabels: true,
        }

This code initializes the Form Tracker interface in the following ways:

    #. Creates a ``<script>`` tag that asynchronously loads Audience Manager Form Tracker library.
    #. Initializes global ``ppms.am.form`` command queue that schedules commands to be run when Form Tracker library is
       loaded.
    #. Schedules creation of Form Tracker instance (using ``ppms.am.form`` function).
