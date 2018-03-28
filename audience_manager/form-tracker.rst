.. highlight:: js
.. default-domain:: js

Form Tracker
============
Form Tracker gathers data submitted via forms on your page and sends it to the Audience Manager :term:`user` profile as
:term:`attributes<attribute>`.

.. note::
    Creates or updates :term:`user` :term:`custom attribute` for each field in the form. :term:`Attribute` name is taken
    from ``<input>`` or ``<textarea>`` tag ``name`` attribute. Form elements without ``name`` attribute are not tracked.

Supported browsers
------------------
All modern browsers: Chrome, Firefox, Safari, Edge. Internet Explorer from version 8 and above.

.. todo:: Move information about supported browsers to document about PPMS in general since it's common to whole system.

Private information
-------------------
Form Tracker is trying to automatically detect fields containing :term:`user` private information and ignores them.
Following data is never send to Audience Manager:

.. todo:: Check what is legal term for ignored information's.

- Value from input with ``password`` or ``hidden`` type.
- Credit card number (heuristic detection).
- Credit card validation code (heuristic detection).
- Data from ignored fields (see :ref:`AM-FT-optional-configuration`).

.. note::

    Heuristic detection makes best effort to automatically detect and ignore mentioned field types, but it doesn't
    guarantee success. Additionally payment forms usually contain more fields with private information (e.g. address)
    so it's recommended to ignore such forms using :ref:`AM-FT-optional-configuration`.

Installation
------------
This section describes how to install Form Tracker client code on your page.

Tag Manager installation
````````````````````````
This is recommended way to install Form Tracker using PPMS stack. Tag Manager allows access to all Form Tracker options
using friendly UI and will make sure that it's configuration is up to date.

.. todo:: Get access to TM on testing.piwik.pro and write instructions.

Manual installation
```````````````````
Add following snippet on your page to start using Form Tracker.

This code should be added near the top of the ``<head>`` tag and before any other script or CSS tags. Additionally
snippet has to be configured this way:

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
    Usually it's recommended to use **HTTPS** protocol in URLs mentioned here, but if support for **legacy IE browsers**
    (8 and 9) is required and some pages containing forms are served via **HTTP** protocol - it's necessary to use same
    protocol in snippet URLs as the source page. Easiest way to do that would be to remove protocol from ``TrackerUrl``
    and ``StaticUrl`` (e.g. ``//ppms.example.com/audiences/tracker/``).

.. todo::
    Update form tracker API to make it similar to AM JS API and simplify setup process to 2 parameters without
    protocol magic.

This code initializes Form Tracker interface in following ways:

    #. Creates a ``<script>`` tag that asynchronously loads Audience Manager Form Tracker library.
    #. Initializes global ``ppms.am.form`` command queue that schedules commands to be run when Form Tracker library is
       loaded.
    #. Schedules basic configuration of Form Tracker ``ppms.am.form``.

When loading snippet is added on the page without any further configuration, Form Tracker will gather information from
all submitted forms. It's possible to modify this behavior by configuring optional rules at the end of loading snippet.
You can do that by using command queue (``ppms.am.form``) immediately after step 3 (see
:ref:`AM-FT-optional-configuration`).

Command queue
-------------
Loading snippet creates following global function:

.. function:: ppms.am.form(command, ...args)

    Audience Manager Form Tracker command queue.

    :param string command: Command name.
    :param args: Command arguments. Number of arguments and their function depend on command.
    :returns: Commands are expected to be run asynchronously and return no value.
    :rtype: undefined

.. _AM-FT-optional-configuration:

Optional configuration
----------------------
These commands allow to limit scope of forms watched by the Form Tracker.

Ignore form
```````````
You can force Form Tracker to ignore selected form as a whole or specific fields in it. Form Tracker won't gather any
data from fields of a form specified this way. You can ignore multiple forms by configuring ignore rule multiple times
(for each form).

Code::

    ppms.am.form("ignore", form_id, field_names);

.. data:: form_id

    ``id`` attribute of ignored ``<form>`` tag.

    Example::

        "payment-form"

.. data:: field_names

    **Optional** Array of ``name`` attributes of ignored ``<input>`` or ``<textarea>`` tags in the form. If this
    parameter isn't provided, all fields in the form will be ignored.

    Example::

        ["street", "post-code", "city"]

    .. note::

        If this parameter is empty array (``[]``) no field will be ignored.

.. note::

    This configuration may be called multiple times and it's effects will be cumulative:

        - If calls specify different ``form_id`` - each form will be ignored accordingly.
        - If multiple calls specify same ``form_id``:

            - If any of the calls ommit ``field_names`` parameter - whole form will be ignored.
            - If all calls specify ``field_names`` - all fields specified accross all calls will be ignored.
