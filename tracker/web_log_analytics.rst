.. highlight:: bash
.. default-domain:: bash

Web Log Analytics
=================

Set up log import
-----------------

This step requires a little more familiarity with Bash, and around 4 to 10 hours of time depending on the volume of data.

You need to run the Log Importer tool with the correct parameters. Some of them must be present, while others are optional.

Sample command:

.. code-block:: bash

    import_logs.py --url=https://demo.piwik.pro --token-auth=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX --enable-static --enable-bots --show-progress --idsite=X --recorders=2 --recorder-max-payload-size=50 sample.log

.. option:: --url=https://demo.piwik.pro

    This is a mandatory parameter which points to the location of your Piwik instance

.. option:: --token-auth=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    Authentication token with superuser rights

.. option:: --idsite=X

    Defines the Site ID of the website. It can be either integer (eg. `1`) or UUID (eg. `99e33528-8da4-46d8-be90-a62bfb3a7bba`).

There are many other options that can be added to this script, which are described in the :ref:`Tracker-log-import-add-parameters-to-log-import`.

Once the log importer tool finishes parsing and uploading logs to your Piwik instance, you will have to wait for the archiving process to populate the Piwik reports with new data.

The time needed for this process depends on the amount of the data you’ve uploaded and in rare cases may even take a couple of days (for example, uploading years of historical data), but usually it is a matter of around an hour.

If you plan to import logs on a regular basis it is advised to setup a scheduled job using a tool such as CRON.

Exclude log lines
-----------------

There are several methods allowing you to exclude particular log lines or visitors from being tracked:

- You can exclude specific IP addresses or IP ranges from being tracked. To configure excluded IPs, log into Piwik as a superuser, then click Administration > Websites.
- Excluding lines from specific IP or IP ranges – this can be done the same way as in the default tracking method in Piwik (by adding an excluded IP or IP range in the Administration -> Websites menu)
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
- **--recorder-max-payload-size=N** The importer uses the Piwik PRO bulk tracking feature in order to boost speed. Adjust the number of pageviews (or log lines) to see what generates the best performance.

More information about log import parameters can be found using the help parameter:

.. code-block:: bash

    import_logs.py --help

Import data with server log analytics and standard JavaScript simultaneously
----------------------------------------------------------------------------

JavaScript Tracking and web server log file analytics can be used at the same time, on the condition that data is recorded for each method in a separate Piwik PRO website.

To avoid double counts of visits, follow these steps:

#. Create a new website in Piwik PRO with a name, for example, example.com (log files).
#. Record the website ID of this new website. The website ID will be used for importing log file data.
#. In the command line, force all requests from log files to be recorded in a specific website ID via the command --idsite=X.

Reprocess reports after the log import
--------------------------------------

.. note::

    Information in this section doesn't apply to Piwik PRO cloud, only to the on-premises Piwik PRO web analytics stack.

Your first run of Log Analytics will potentially import a very large amount of historical data, even months or years worth.

After this first process is completed, run this command to archive all historical reporting data:

.. code-block:: bash

    ./console core:archive --force-all-websites --force-all-periods=31557600 --force-date-last-n=1000 --piwik-domain=demo.piwik.pro

Next, place the following command into a cron to process archives of logs imported at hourly or daily intervals:

.. code-block:: bash

    ./console core:archive --piwik-domain=demo.piwik.pro

If you are planning to process a very large volume of initial data in your first run, please contact us at support@piwik.pro for help.

Technical requirements
----------------------

Technical requirements for running Web Log Analytics:

- Access to the server or server logs – for example via SSH
- Python 3.5+ – older versions (e.g. 2.6 or 2.7) are not supported. Most often you’ll want to import your data straight from the server where it is created. To do this, you’ll need to be able to run a Python script on the machine that will send the logs to Piwik PRO.
- Log Importer tool – this is a script written in Python ensuring that logs are sent to your Piwik instance.

Supported log formats:

- all default log formats for: Nginx, Apache, IIS, Tomcat
- all common log formats like: NCSA Common log format, Extended log format, W3C Extended log files, Nginx JSON
- log files of some popular Cloud Saas services: Amazon CloudFront logs, Amazon S3 logs
- streaming media server log files such as: Icecast
- log files with and without the virtual host will be imported
