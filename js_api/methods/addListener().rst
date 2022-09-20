.. _addListener():

=============
addListener()
=============

The **addListener()** method adds automatic link tracking to an HTML element. You can use it to track links added to a document after a page load.

Syntax
------

.. tabs::

    .. group-tab:: JS

        .. code-block:: javascript

          addListener(domElement)

Parameters
----------

| **domElement** (DOM element, required)
| The element that you want to track as a link.

Examples
--------

To add a link to this element #dynamically-added-link:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push(["addListener", document.querySelector("#dynamically-added-link")]);

    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.addListener(document.querySelector("#dynamically-added-link"));
