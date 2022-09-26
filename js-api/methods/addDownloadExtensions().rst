.. _addDownloadExtensions():

=======================
addDownloadExtensions()
=======================

The **addDownloadExtensions()** adds a file extension to the existing list of file extensions that should be tracked as downloads. Downloads are clicks on links to downloadable files.

Syntax
------

.. tabs::

    .. group-tab:: JS

        .. code-block:: javascript

          addDownloadExtensions(extensions)

    .. group-tab:: Angular

        .. code-block:: javascript

          addDownloadExtensions(extensions: string[])

    .. group-tab:: React

        .. code-block:: javascript

          addDownloadExtensions(extensions: string[])

Parameters
----------

| **extensions** (string | array <string>, required)
| The list of file extensions to be tracked as downloads. Can be written as string (Example: "zip|rar") or an array (Example: ["zip", "rar"]).

Examples
--------

To add a mhj|docx extensions to the existing list of file extensions:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push(["addDownloadExtensions", "mhj|docx"]);

    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.addDownloadExtensions("mhj|docx");

    .. group-tab:: Angular

        .. code-block:: javascript

    .. group-tab:: React

        .. code-block:: javascript



Notes
-----

- The list of file extensions is not persisted in a visitor's browser. You need to call it on each page load.
- We check for extensions at the end of the URL path and in query parameter values. Here are a few examples of how we detect the extension:
   - \http://example.com/path/file.zip
   - \http://example.com/path/file.zip#hello
   - \http://example.com/path/file.zip?a=102
   - \http://example.com/path/?a=file.zip
   - \http://example.com/path/?a=file.zip&b=29
- Here's the default list of file extensions tracked as downloads: 7z, aac, apk, arc, arj, asf, asx, avi, azw3, bin, csv, deb, dmg, doc, docx, epub, exe, flv, gif, gz, gzip, hqx, ibooks, jar, jpg, jpeg, js, mobi, mp2, mp3, mp4, mpg, mpeg, mov, movie, msi, msp, odb, odf, odg, ods, odt, ogg, ogv, pdf, phps, png, ppt, pptx, qt, qtm, ra, ram, rar, rpm, sea, sit, tar, tbz, tbz2, bz, bz2, tgz, torrent, txt, wav, wma, wmv, wpd, xls, xlsx, xml, z, zip.

Related methods
---------------

* trackLink()
* enableLinkTracking()
* disableLinkTracking()
* setIgnoreClasses()
* setLinkClasses()
* setDownloadClasses()
* setDownloadExtensions()
* removeDownloadExtensions()
* getConfigDownloadExtensions()
