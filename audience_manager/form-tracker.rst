.. highlight:: js
.. default-domain:: js

Form Tracker
============
Form Tracker gathers data submitted via forms on your page and sends it to the Audience Manager :term:`user` profile as
:term:`attributes<attribute>`.

.. note::
    Creates or updates :term:`user` :term:`custom attributes<custom attribute>` for each field in the form.
    The :term:`attribute` name is generated from input tag (HTML tag's ``name`` attribute). Inputs without a name are ignored.

Supported browsers
------------------
All modern browsers: Chrome, Firefox, Safari, Edge. Internet Explorer from version 8 and above.

.. todo:: Move information about supported browsers to document about PPMS in general since it's common to whole system.

Private information
-------------------
Form Tracker is trying to automatically detect fields containing :term:`user's<user>` private information and ignores them.
The following data is never sent to the Audience Manager:

.. todo:: Check what is legal term for ignored information's.

- Value from input with ``password`` or ``hidden`` type.
- Credit card number (heuristic detection).
- Credit card validation code (heuristic detection).
- Data from ignored fields (see :ref:`AM-FT-optional-configuration`).

.. note::
    Heuristic detection makes best effort to automatically detect and ignore the aforementioned fields, but it does not
    guarantee success. Additionally, payment forms usually contain more fields with private information (e.g. address)
    so it is recommended to ignore such forms using the :ref:`AM-FT-optional-configuration`.

Installation
------------
This section describes how to install the Form Tracker client code on your page.

Using Tag Manager
`````````````````
`The Form Tracker tag template <https://help.piwik.pro/audience-manager/capturing-data-forms/>`_ is the recommended way to
install Form Tracker using PPMS stack.

Manual installation
```````````````````
Add the following snippet on your page to start using Form Tracker.

This code should be added near the top of the ``<head>`` tag and before any other script or CSS tags. Additionally
the snippet has to be configured this way:

- String ``XXX-XXX-XXX-XXX-XXX`` should be replaced with :term:`app ID` (e.g. ``efcd98a5-335b-48b0-ab17-bf43f1c542be``).
- String ``ppms.example.com`` should be replaced with your PPMS domain name (please note that it's used in 3 places in
  the snippet).

.. code-block:: html

    <script>
        (function(a,d,g,h,b,c,e){a[b]=a[b]||{};a[b][c]=a[b][c]||{};a[b][c][e]=a[b][c][e]||function(){(a[b][c][e].q=a[b][c][e].q||[]).push(arguments)};var f=d.createElement(g);d=d.getElementsByTagName(g)[0];f.async=1;f.src=h;d.parentNode.insertBefore(f,d)})
        (window,document,"script","https://ppms.example.com/audiences/static/widget/audience-manager.form.min.js","ppms","am","form");

        ppms.am.form("set", "WebsiteID", "XXX-XXX-XXX-XXX-XXX");
        ppms.am.form("set", "TrackerUrl", "https://ppms.example.com/audiences/tracker/");
        ppms.am.form("set", "StaticUrl", "https://ppms.example.com/audiences/static/widget/");
    </script>

.. note::
    Usually it is recommended to use the **HTTPS** protocol in the URLs mentioned here, but if support for **legacy IE browsers**
    (8 and 9) is required and some pages containing forms are served via **HTTP** protocol - it is necessary to use the same
    protocol in snippet URLs as the source page. The easiest way to do that would be to remove the protocol from ``TrackerUrl``
    and ``StaticUrl`` (e.g. ``//ppms.example.com/audiences/tracker/``).

.. todo::
    Update form tracker API to make it similar to AM JS API and simplify setup process to 2 parameters without
    protocol magic.

This code initializes the Form Tracker interface in the following ways:

    #. Creates a ``<script>`` tag that asynchronously loads Audience Manager Form Tracker library.
    #. Initializes global ``ppms.am.form`` command queue that schedules commands to be run when Form Tracker library is
       loaded.
    #. Schedules basic configuration of Form Tracker ``ppms.am.form``.

When the loading snippet is added on the page without any :ref:`AM-FT-optional-configuration`, the Form Tracker will gather information from
all forms submitted on the page. It is possible to modify this behavior by configuring optional rules at the end of the snippet.
You can do that by using the command queue (``ppms.am.form``) immediately after step 3 (see
:ref:`AM-FT-optional-configuration`).

Command queue
-------------
The loading snippet creates the following global function:

.. function:: ppms.am.form(command, ...args)

    Audience Manager Form Tracker command queue.

    :param string command: Command name.
    :param args: Command arguments. The number of arguments and their function depend on command.
    :returns: Commands are expected to be run asynchronously and return no value.
    :rtype: undefined

.. _AM-FT-optional-configuration:

Optional configuration
----------------------
These commands allow you to limit the scope of forms watched by the Form Tracker.

Ignore form
```````````
You can force the Form Tracker to ignore the selected form as a whole or specific fields in it. The Form Tracker will not gather any
data from fields of a form specified in this way. You can ignore multiple forms by configuring the ignore rule multiple times
(separately for each form).

Code::

    ppms.am.form("ignore", form_id, field_names);

.. describe:: form_id

    **Required** ``string`` ``id`` attribute of ignored ``<form>`` tag.

    Example::

        "payment-form"

.. describe:: field_names

    **Optional** ``Array<string>`` List of ``name`` attributes of ignored ``<input>`` or ``<textarea>`` tags in the
    ignored form. If this parameter is not provided, all fields in the form will be ignored.

    Example::

        ["street", "post-code", "city"]

    .. note:: If this parameter is empty array (``[]``) no field will be ignored.

.. note::
    This configuration may be called multiple times and its effects will be cumulative:

        - If calls specify different ``form_id`` - each form will be ignored accordingly.
        - If multiple calls specify same ``form_id``:

            - If any of the calls omit the ``field_names`` parameter - the whole form will be ignored.
            - If all calls specify the ``field_names`` - all fields specified across all calls will be ignored.
