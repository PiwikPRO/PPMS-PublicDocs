.. _android getting started:

=====
Getting started
=====
Our SDK for Android lets you collect user data from mobile apps built for Android. It contains over 30 built-in methods that let you easily track screen views, goals, ecommerce orders, and more.

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

To install the library, follow these steps:

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

Note: Replace ``VERSION`` with the latest release name. Example: ``1.1.8``. (`Where to find it? <https://jitpack.io/#pro.piwik/sdk-framework-android>`_)

Set up the tracker
------------------

To set up the Piwik PRO tracker, you can use two methods: (1) create and manege the tracker in the Application class or (2) manage the tracker on your own.

Method #1
+++++++++

We recommend using this method for most cases. It forces the implementation of just one abstract method.

To set up the Piwik PRO tracker, follow these steps:

1. Extend ``PiwikApplication`` class with your Android Application class. Use your account address (Example: ``https://example.piwik.pro/``) and the site/app ID (`Where to find it? <https://help.piwik.pro/support/questions/find-website-id/>`_)

.. code-block:: javascript

    public class YourApplication extends PiwikApplication{
        @Override
        public TrackerConfig onCreateTrackerConfig() {
            return TrackerConfig.createDefault("account-address", "site-id");
        }
    }

Tip: See `our demo app <https://github.com/PiwikPRO/piwik-pro-sdk-demo-android>`_ where we used this method.

2. Share the ``Tracker`` instance across your app. The ``Tracker`` is now thread-safe.

.. code-block:: javascript

    Tracker tracker = ((PiwikApplication) getApplication()).getTracker();

3. Done! Now your app can use Piwik PRO SDK.

4. We recommend using the ``TrackHelper`` class to track events. For tracking each event with ``TrackHelper``, you will need to pass the ``Tracker`` instance.

.. code-block:: javascript

    Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
    TrackHelper.track().screen("Main screen").with(tracker);

Note: The ``TrackerHelper`` class has methods for all common actions, which can be chained to facilitate the correct order and use. Combine it with the IDE autocompletion, and using the SDK will be more convenient.

Method #2
+++++++++

To set up the Piwik PRO tracker, follow these steps:

1. Manage the tracker on your own. Use your account address (Example: ``https://example.piwik.pro/``) and the site/app ID (`Where to find it? <https://help.piwik.pro/support/questions/find-website-id/>`_).

.. code-block:: javascript

    public class YourApplication extends Application {
        private Tracker tracker;
        public synchronized Tracker getTracker() {
            if (tracker == null) tracker = Piwik.getInstance(this).newTracker(new TrackerConfig(""account-address", "site-id", "Default Tracker"));
            return tracker;
        }
    }


Note: We recommend using just one tracker instance for your app. Otherwise, you can end up with over-counted metrics.

2. Share the ``Tracker`` instance across your app. The ``Tracker`` is now thread-safe.

.. code-block:: javascript

    Tracker tracker = ((YourApplication) getApplication()).getTracker();

3. Done! Now your app can use Piwik PRO SDK.

4. We recommend using the ``TrackHelper`` class to track events. For tracking each event with ``TrackHelper``, you will need to pass the ``Tracker`` instance.

.. code-block:: javascript

    Tracker tracker = ((YourApplication) getApplication()).getTracker();
    TrackHelper.track().screen("Main screen").with(tracker);

Note: The ``TrackerHelper`` class has methods for all common actions, which can be chained to facilitate the correct order and use. Combine it with the IDE autocompletion, and using the SDK will be more convenient.

Kotlin
------

Our SDK is written in Java, but it can also be used in Kotlin. If you refer to any of our SDK methods in Kotlin, it'll be automatically shown as a Kotlin syntax.

Here's an example of the **track().screen()** method in both languages:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

            Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
            TrackHelper.track().screen("path").title("title").with(tracker);


    .. group-tab:: Kotlin

        .. code-block:: javascript

            val tracker: Tracker = (application as PiwikApplication).tracker
            TrackHelper.track().screen("path").title("title").with(tracker)

Tip: For more on calling Java from Kotlin, `see this article <https://kotlinlang.org/docs/java-interop.html>`_.
