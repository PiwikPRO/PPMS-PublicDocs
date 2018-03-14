.. highlight:: js
.. default-domain:: js

Audience Manager Form Tracker API
=================================
Form Tracker allows to gather data from all forms on your site in one place.

Supported browsers
------------------
All modern browsers (Chrome, Firefox, Safari, Edge). Internet Explorer from version 8 and above.

Private information
-------------------
Form tracker is trying to automatically detect fields containing private information and exclude them. Following fields
are always removed from tracked data:

* "password" or "hidden" inputs
* Credit card number
* Credit card validation code

Loading snippet
---------------
Add following snippet on a page to start using Audience Manager Form Tracker.

The code should be added near the top of the <head> tag and before any other script or CSS tags. PPMS configuration
additionally requires 2 changes in example code.

Website ID
``````````
Replace 'XXX-XXX-XXX-XXX-XXX' with your Piwik Website ID. Example::

    "efcd98a5-335b-48b0-ab17-bf43f1c542be"

PPMS domain
```````````
Replace 'ppms.example.com' with your PPMS tracker domain. Please note that this value is used in 3 places:

* 'https://ppms.example.com/audiences/static/widget/audience-manager.form.min.js'
* 'https://ppms.example.com/audiences/tracker/'
* 'https://ppms.example.com/audiences/static/widget/'

.. warning::
    Usually it's recommended to use **HTTPS** protocol in URLs mentioned here, but if support for **legacy IE browsers**
    (8 and 9) is required and some sites containing forms are served via **HTTP** protocol - it's necessary to use same
    protocol in these URLs as source page. Easiest way to do that would be to remove protocol from Tracker and Static
    URLs (e.g. ``//ppms.example.com/audiences/tracker/``).

Snippet
```````

Code:

.. code-block:: html

    <script>
        (function(a,d,g,h,b,c,e){a[b]=a[b]||{};a[b][c]=a[b][c]||{};a[b][c][e]=a[b][c][e]||function(){(a[b][c][e].q=a[b][c][e].q||[]).push(arguments)};var f=d.createElement(g);d=d.getElementsByTagName(g)[0];f.async=1;f.src=h;d.parentNode.insertBefore(f,d)})
        (window,document,"script","https://ppms.example.com/audiences/static/widget/audience-manager.form.min.js","ppms","am","form");

        ppms.am.form('set', 'WebsiteID', 'XXX-XXX-XXX-XXX-XXX');
        ppms.am.form('set', 'TrackerUrl', 'https://ppms.example.com/audiences/tracker/');
        ppms.am.form('set', 'StaticUrl', 'https://ppms.example.com/audiences/static/widget/');
    </script>

API function
------------

Loading snippet creates following API function:

.. function:: ppms.am.form(command, ...args)

    JavaScript API interface.

    :param string command: Command name.
    :param args: Command arguments. Number of arguments and their function depend on command.
    :returns: Nothing. All commands are prepared to be run asynchronously.


Optional configuration
----------------------
When loading snippet is added on page without any optional configuration form tracker will gather information from all
forms. It's possible to modify this behavior by adding optional rules at the end of loading snippet.

Ignore form
```````````
You can remove selected form from tracking by adding ignore rule. Form tracker won't gather any data from form using
specified ``id`` attribute. You can ignore multiple forms add new ignore rule for each one.

Code::

    ppms.am.form('ignore', 'ignored_form_id');

Ignore form fields
``````````````````
You can remove selected form fields from tracking by adding ignore field rule. Form tracker won't gather any data from
fields which are part of form using specified ``id`` attribute and input's ``name`` attribute match any name in
specified array. You can ignore multiple fields in one form by adding new name to the array. You can ignore fields from
multiple forms add new ignore fields rule for each one.

Code::

    ppms.am.form('ignore', 'selectively_ignored_form_id', ['field_name']);