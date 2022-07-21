.. highlight:: bash
.. default-domain:: bash
.. _data-collection-web-log-analytics:
.. _GitHub: https://github.com/PiwikPRO/log-analytics/
.. _PyPi: https://pypi.org/project/piwik-pro-log-analytics/


Web Log Analytics
=================


Log analytics is a python script, that allows you to import logs of common web servers (nginx, apache, iss and more) directly to Piwik PRO. It's a free software available under GPLv3 license, available on `GitHub`_ and `PyPi`_

Installation of the log analytics script
-----------------

You can install the script in one of two ways:

- By using Python's package manager - `pip` - this is the preferred method
- By downloading the script to your machine manually


.. tabs::

    .. group-tab:: Python package

        .. code-block:: bash

            pip install piwik-pro-log-analytics

    .. group-tab:: Python script

        .. code-block:: bash

            curl https://raw.githubusercontent.com/PiwikPRO/log-analytics/master/piwik_pro_log_analytics/import_logs.py > import_logs.py
            chmod +x import_logs.py

Set up log import
-----------------


You need to run the Log Importer tool with the correct parameters. Some of them must be present, while others are optional.


Sample command:

.. tabs::

    .. group-tab:: Python package

        .. code-block:: bash

            piwik_pro_log_analytics --url=https://demo.piwik.pro --client-id=*** --client-secret=*** --enable-static --enable-bots --show-progress --idsite=*** --recorders=2 sample.log

    .. group-tab:: Python script

        .. code-block:: bash

            ./import_logs.py --url=https://demo.piwik.pro --client-id=*** --client-secret=*** --enable-static --enable-bots --show-progress --idsite=*** --recorders=2 sample.log


.. option:: --url=https://demo.piwik.pro

    This is a mandatory parameter which points to the location of your Piwik instance

.. option:: --client-id=***

    Part of API credentials. They can be obtained from PPAS (check `how to do it <https://help.piwik.pro/support/questions/generate-api-credentials/>`_).

.. option:: --client-secret=***

    Part of API credentials. They can be obtained from PPAS (check `how to do it <https://help.piwik.pro/support/questions/generate-api-credentials/>`_).

.. option:: --idsite=***

    Defines the Site ID of the website (eg. `99e33528-8da4-46d8-be90-a62bfb3a7bba`).

There are many other options that can be added to this script, which are described in the :ref:`Tracker-log-import-add-parameters-to-log-import`.

If you plan to import logs on a regular basis it is advised to setup a scheduled job using a tool such as CRON.

Exclude log lines
-----------------

There are several methods allowing you to exclude particular log lines or visitors from being tracked:

- You can exclude specific IP addresses or IP ranges from being tracked. To configure excluded IPs, log into Piwik as a superuser, then click Administration > Websites.
- Excluding lines from specific IP or IP ranges - this can be done the same way as in the default tracking method in Piwik (by adding an excluded IP or IP range in the Administration -> Websites menu)
- You can exclude visitors based on their User Agent HTTP headers by using **--useragent-exclude**
- You can also provide a sole hostname that you would like to import from. This means that all the logs from other hosts will be ignored. The parameter allowing this is: **--hostname**
- It is also possible to exclude specific log lines where the URL path matches a particular URL path. See the option **--exclude-path**

If you need to add multiple paths or hostnames, you will need to add these parameters multiple times.

.. _Tracker-log-import-add-parameters-to-log-import:

Add parameters to log import
----------------------------

The Web Log Analytics script does not track static files (JS, CSS, images, etc.). It also excludes all bot traffic.

Use the following commands to enable tracking of these elements:

- **--enable-bots** This enables tracking of search/spam bots via Piwik. Just add a custom variable with the bot’s name. The User-agent field is examined to determine whether a log line comes from a bot or a real user.
- **--enable-static** Specifies tracking of all static files (images, JS, CSS) in Piwik PRO.
- **--enable-http-redirects** This tracks HTTP redirects as page views, with a custom title and custom variable.
- **--enable-reverse-dns** Activates reverse DNS, which is used in generating the Visitors > Providers report. NOTE: this may lead to a serious drop in performance as reverse DNS is very slow.
- **--recorders=N** Sets a specific number of threads. We recommend matching it to the number of CPU cores in the system.
- **--enable-bulk-tracking** Enables bulk tracking mode. Tracking requests will be bunched up and send using bulk request.
- **--recorder-max-payload-size=N** When importer uses the Piwik PRO bulk tracking feature in order to boost speed (option **--enable-bulk-tracking**), this option configures max number of tracking requests that bulk request can contain. Adjust the number of pageviews (or log lines) to see what generates the best performance.

More information about log import parameters can be found using the help parameter:

.. tabs::

    .. group-tab:: Python package

        .. code-block:: bash

            piwik_pro_log_analytics --help

    .. group-tab:: Python script

        .. code-block:: bash

            ./import_logs.py --help



Import data with server log analytics and standard JavaScript simultaneously
----------------------------------------------------------------------------

JavaScript Tracking Client and web server log file analytics can be used at the same time, on the condition that data is recorded for each method in a separate Piwik PRO website.

To avoid double counts of visits, follow these steps:

#. Create a new website in Piwik PRO with a name, for example, example.com (log files).
#. Record the website ID of this new website. The website ID will be used for importing log file data.
#. In the command line, force all requests from log files to be recorded in a specific website ID via the command --idsite=X.

Technical requirements
----------------------

Technical requirements for running Web Log Analytics:

- Access to the server or server logs - for example via SSH
- Python 3.6+ - older versions (e.g. 2.6, 2.7 or 3.5) are not supported. Most often you'll want to import your data straight from the server where it is created. To do this, you’ll need to be able to run a Python script on the machine that will send the logs to Piwik PRO.
- Log Analytics script - this is a script written in Python ensuring that logs are sent to your Piwik PRO instance,  available on `GitHub`_

Supported log formats:

- all default log formats for: Nginx, Apache, IIS, Tomcat
- all common log formats like: NCSA Common log format, Extended log format, W3C Extended log files, Nginx JSON
- log files of some popular Cloud Saas services: Amazon CloudFront logs, Amazon S3 logs
- streaming media server log files such as: Icecast
- log files with and without the virtual host will be imported

This script does not directly support importing logs from log aggregation tools, like Grafana Loki or ELK. If you'd like to import logs from one of those, you need to download them to the disk first.


Performance considerations & rate limiting
----------------------

The script needs CPU to read and parse the log files, but it is usually Piwik PRO server itself which will limit the import speed due to network latency.
To improve performance, you can use the **--recorders** option to specify the number of parallel threads which will import hits into Piwik PRO. By default we are using one recorder, but you can increase this value until you achieve satisfying speed.

If you are Piwik PRO Core user, please make sure, that you are not hitting rate limits, by using **--sleep-between-requests-ms** flag to slow down the import process.

