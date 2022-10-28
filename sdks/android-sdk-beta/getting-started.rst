.. _android_getting_started:

=====
Getting started
=====
Our SDK for Android lets you collect user data from mobile apps built for Android. It contains over 20 built-in methods that let you easily track screen views, goals, ecommerce orders, and more.

To get started you need to set up your account in Piwik PRO, install our library, and set up the tracker.


Set up Piwik PRO
----------------

Before you install our library for Android, you need to set up Piwik PRO. Here's what you need to do:

1. Log in to **Piwik PRO**.
2. Go to **Menu** > **Administration**.
3. Navigate to **Sites & apps**.
4. Click **Add a site or app**.
5. Type the app name and address, and click **Save**.
6. Set the time zone and currency.
7. Note the site/app ID. The ID is under the app name. Example: ``00000000-0000-0000-0000-000000000000``.
8. Note your account address. Example: ``https://example.piwik.pro``.

Install the library
-------------------

1. Add the JitPack repository to your root ``build.gradle`` file at the end of repositories:

.. code-block:: javascript

    allprojects {
    repositories {
      ...
      maven { url 'https://jitpack.io' }
    }
    }

2. Add the dependency to the application module ``build.gradle`` file:

.. code-block:: javascript

    dependencies {
    implementation 'pro.piwik:sdk-framework-android:VERSION'
    }

3. Replace ``VERSION`` with the latest release name. Example: ``1.0.3``. (Where to find it?)

Set up the tracker
------------------

To set up the Piwik PRO tracker, you have two options:

1. Extend ``PiwikApplication`` class with your Android Application class. It forces implementation of one abstract method. That approach is used in the Piwik PRO SDK demo app as below:

.. code-block:: javascript

    public class YourApplication extends PiwikApplication{
    @Override
    public TrackerConfig onCreateTrackerConfig() {
        return TrackerConfig.createDefault("https://your.piwik.pro.server.com", "01234567-89ab-cdef-0123-456789abcdef");
    }
    }

2. Manage the Tracker on your own. To configure the Tracker you will need your account address and the app ID (You can find it in Administration > Websites & apps > Installation.):

.. code-block:: javascript

    public class YourApplication extends Application {
    private Tracker tracker;
    public synchronized Tracker getTracker() {
        if (tracker == null) tracker = Piwik.getInstance(this).newTracker(new TrackerConfig("https://your.piwik.pro.server.com", "01234567-89ab-cdef-0123-456789abcdef"));
        return tracker;
    }
    }

Notes:

* We don't not recommended creating multiple Tracker instances for the same target as it may lead to over-count of metrics.
* We recommended creating and managing the tracker in the Application class to make sure there is only one instance of the tracker.
* The Tracker is thread-safe and can be shared across the application.

.. code-block:: javascript

    Tracker tracker = ((PiwikApplication) getApplication()).getTracker();

3. Now your application can use Piwik PRO SDK.
