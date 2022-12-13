Piwik PRO SDK for Android
========================

## SDK configuration

### Server
* You need a Piwik PRO account on the cloud or an on-premises setup which your mobile app will communicate with. For details, please visit the [Piwik PRO website](https://piwik.pro).
* Create a new website (or app) in the Piwik PRO web interface.
* Copy and note the Website ID from "Administration > Websites & apps > Installation" and your server address.

### Client
#### Including the library

Add the JitPack repository to your root `build.gradle` file at the end of repositories:

```groovy
  allprojects {
    repositories {
      ...
      maven { url 'https://jitpack.io' }
    }
  }
```

Then add the dependency to the application module `build.gradle` file:

```groovy
  dependencies {
      implementation 'pro.piwik:sdk-framework-android:VERSION'
  }
```

Replace `VERSION` with the latest release name, e.g. ``1.0.3``.

#### Configuration

In order to set up the Piwik PRO tracker, you have two options:

1\. Extend ``PiwikApplication`` class with your Android ``Application`` class. It forces implementation of one abstract method. That approach is used in the [Piwik PRO SDK demo app](https://github.com/PiwikPRO/piwik-pro-sdk-demo-android) as below:

```java
public class YourApplication extends PiwikApplication{
    @Override
    public TrackerConfig onCreateTrackerConfig() {
        return TrackerConfig.createDefault("https://your.piwik.pro.server.com", "01234567-89ab-cdef-0123-456789abcdef");
    }
}
```

2\. Manage the ``Tracker`` on your own. To configure the `Tracker` you will need a server address and website ID (you can find it in "Administration > Websites & apps > Installation"):

```java
public class YourApplication extends Application {
    private Tracker tracker;
    public synchronized Tracker getTracker() {
        if (tracker == null) tracker = Piwik.getInstance(this).newTracker(new TrackerConfig("https://your.piwik.pro.server.com", "01234567-89ab-cdef-0123-456789abcdef", "Default Tracker"));
        return tracker;
    }
}
```

It is not recommended to create multiple `Tracker` instances for the same target as it may lead to over-count of metrics. It is highly recommended to create and manage the tracker in the Application class (to make sure there is only one instance of the tracker). The `Tracker` is thread-safe and can be shared across the application.


```java
Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
```

The application is ready to use Piwik PRO SDK.

#### Using Piwik PRO SDK with the Kotlin programming language

The Piwik PRO SDK is written in the Java programming language. Nevertheless calling Piwik PRO SDK interface elements in classes written in Kotlin will not be an issue as the code written in Java can be called from Kotlin in a natural way.
When we edit a Kotlin class file and type in a reference to the Piwik PRO SDK component, a Kotlin syntax interface will be shown in the code completion.

Example of using the method to track a view in Java:
```java
Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
TrackHelper.track().screen("your_activity_path").title("Title").with(tracker);
```
Same example in Kotlin:
```java
val tracker: Tracker = (application as PiwikApplication).tracker
TrackHelper.track().screen("your_activity_path").title("Title").with(tracker)
```

For more on using existing Java code in Kotlin files, see the documentation ["Calling Java from Kotlin﻿"](https://kotlinlang.org/docs/java-interop.html).

## Using Piwik PRO SDK

It is recommended to use ``TrackerHelper`` class. It has methods for all common actions, which can be chained in a way that facilitates the correct order and use. Combine it with IDE autocompletion and using the SDK will be more convenient.

For tracking each event with ``TrackHelper``, you will need to pass ``Tracker`` instance. The way of getting the correct ``Tracker`` instance depends on the configuration option (see section above):

1\. Your Android ``Application`` class extend ``PiwikApplication`` class
```java
Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
```

2\. You manage the ``Tracker`` yourself
```java
Tracker tracker = ((YourApplication) getApplication()).getTracker();
```

In further examples we will assume usage of the first option.

### Data anonymization

Anonymization is the feature that allows tracking a user's activity for aggregated data analysis even if the user doesn't consent to track the data. If a user does not agree to be tracked, he will not be identified as the same person across multiple sessions.

Personal data will not be tracked during the session ([user ID](#user-id), [email](#user-email-address) and [device ID](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en)).
If the anonymization is enabled, a new [visitor ID](#visitor-id) will be created each time the application starts.

Anonymization is enabled by default.

You can turn the anonymization on and off using the ``setAnonymizationState`` method:

```java
((PiwikApplication) getApplication()).getTracker().setAnonymizationState(false);
```

You can also check the anonymization status using the ``isAnonymizationOn`` method:

```java
((PiwikApplication) getApplication()).getTracker().isAnonymizationOn();
```

### Tracking screen views
*Requires Analytics*

During a valid tracking session, you can track screen views which represent the content the user is viewing in the application. To send a visit on the screen, set the screen path and title on the tracker. This path is internally translated by the SDK to an HTTP URL as the Piwik PRO server uses URLs for tracking views. Additionally, Piwik PRO SDK uses prefixes which are inserted in a generated URL for various types of action(s). For tracking screen views it will use a prefix _screen_ by default, however, automatic prefixing can be disabled with the ``tracker.setPrefixing(false)`` option.

```java
public class YourActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
        TrackHelper.track().screen("your_activity_path").title("Title").with(tracker);
    }
}

```
* A path (required) – each screen should be mapped to the URL path

* A title (optional) – the title of the action being tracked.

To automatically use the activity-stack as a path and activity title as a name, use the overloaded screen method:
```java
public class YourActivity extends Activity {
   ...
   TrackHelper.track().screen(YourActivity).with(tracker);
   ...
}
```
* An activity (required) – current instance of android ``Activity`` class.

In order to bind the tracker to your applications, use the ``screens`` method. This method will automatically track all open application activities(views) keeping the activity-stack as a path and activity title as the name:

```java
TrackHelper.track().screens(getApplication()).with(tracker);
```

Alternatively, it is also possible to define a list of views that will be sent with a single event:
```java
TrackHelper.track().screens(Arrays.asList("android_test/test1", "android_test/test2")).with(tracker);
```


### Tracking custom events
*Requires Analytics*

To collect data about the user's interaction with the interactive components of the application, like a button presses or the use of a particular item in the game - use ``event`` method.

```java
TrackHelper.track().event("category", "action").path("/main/actionScreen").name("label").value(1000f).with(tracker);
```
The ``track`` method allows the specification of the following parameters:

* A category (required) – this String defines the event category. You may define event categories based on the class of user actions (e.g. clicks, gestures, voice commands), or you may define them based on the features available in your application (e.g. play, pause, fast forward, etc.).

* An action (required) – this String defines the specific event action within the category specified. In the example, we are effectively saying that the category of the event is user clicks, and the action is a button click.

* A name (optional) – this String defines a label associated with the event. For example, if you have multiple button controls on a screen, you may use the label to specify the specific view control identifier that was clicked.

* A value (optional) – this Float defines a numerical value associated with the event. For example, if you were tracking "Buy" button clicks, you may log the number of items being purchased or their total cost.

* A path (optional) – the path under which this event occurred.

For more resources, please visit:
* [Custom Events Overview](https://help.piwik.pro/support/getting-started/custom-event/)
* [Ultimate guide to event tracking](https://piwik.pro/blog/event-tracking-ultimate-guide/).

### Tracking exceptions
*Requires Analytics*

Caught exceptions are errors in your app for which you've defined an exception handling code, such as the occasional timeout of a network connection during a request for data. Exceptions are tracked on the server in a similar way as screen views. 

If you provide cought exception to the ``exception`` method, URL will contain the package name, activity path, method name and line number where crash occurred.
Measure a caught exception by setting the exception field values on the tracker and sending the hit, as with this example:

```java
try {
   // perform action
} catch(Exception ex) {
   TrackHelper.track().exception(ex).description("Content download error").with(tracker);
}
```

* An exception (optional) – Caught exception instance.

* A description (optional) – additional information about the issue.

Bear in mind that Piwik is not a crash tracker therefore use this sparingly.

### Tracking social interactions
*Requires Analytics*

Social interactions such as likes, shares and comments in various social networks can be tracked as below.

```java
 TrackHelper.track().socialInteraction("Like", "Facebook").with(tracker);
```
* An interaction (required) – defines the social interaction, e.g. "Like".

* A network (required) – defines social network associated with interaction, e.g. "Facebook"


### Tracking deep links and campaigns
*Requires Analytics*

Tracking [campaigns](https://help.piwik.pro/support/reports/campaign-report/) URLs configured with the online [Campaign URL Builder tool](https://piwik.pro/url-builder-tool/), allow you to measure how different campaigns (for example with Facebook ads or direct emails) bring traffic to your application. For this purpose you may use a deep link with the campaign parameters. You can track these URLs from the application via the ``campaign`` method:

```java
    TrackHelper.track().campaign("https://www.example.com?pk_campaign=Email-SummerDeals&pk_keyword=LearnMore");
```

* A URL (required) – the campaign URL. HTTPS, HTTP and FTP are valid, however, the URL must contain campaign name and keyword parameters.

The information contained in the campaign URL or the deep link will be tracked when the first screen event is triggered.


### Tracking downloads
*Requires Analytics*

You can track the installations initiated by your application. 

```java
    TrackHelper.track().sendDownload("http://your.server.com/bonusmap.zip").with(getTracker());
```

* A URL (required) – the URL of the downloaded content.

No prefixes are used for tracking downloads, but each event of this type use an additional parameter ``download`` whose value equals to specified URL. On the analytics panel, all downloads can be viewed in the corresponding section.

### Tracking application installs
*Requires Analytics*

You can also track installations of your application. This event is sent to the server only once per application installation.

```java
    TrackHelper.track().sendApplicationDownload().with(getTracker());
```
Application installation is only tracked during the first launch. In the case of the application being installed but not run, the app installation will not be tracked.

### Tracking outlinks
*Requires Analytics*

For tracking outlinks to external websites or other apps opened from your application use the ``outlink`` method:

```java
TrackHelper.track().outlink(new URL("yourScheme://address.app")).with(getTracker());
```
* A outlink (required) – defines the outlink target.


### Tracking search operations
*Requires Analytics*

Tracking search operations allow the measurement of popular keywords used for various search operations performed inside your application. It can be done via the ``search`` method:

```java
TrackHelper.track().search("Space").category("Movies").count(3).with(getTracker());
```
* A keyword (required) – the searched query that was used in the app.

* A category (optional) – specify a search category.

* A count (optional) – we recommend setting the search count to the number of search results displayed on the results page. When keywords are tracked with a count of 0, they will appear in the "No Result Search Keyword" report.

### Tracking content impressions and interactions
*Requires Analytics*

You can track an impression of an ad in your application as below.
```java
TrackHelper.track().impression("Android content impression").piece("banner").target("https://www.dn.se/").with(getTracker());
```

When the user interacts with the ad by tapping on it, you can also track it with a similar method:
```java
TrackHelper.track().interaction("Android content impression", "click").piece("banner").target("https://www.dn.se/").with(getTracker());
```

* A contentName (required) – the name of the content, e.g. "Ad Foo Bar".

* A interaction (required) – type of interaction, e.g. click.

* A piece (optional) – the actual content. For instance, the path to an image, video, audio or any text.

* A target (optional) – the target of the content. For instance the URL of a landing page.

### Tracking goals
*Requires Analytics*

By default, goals are defined as "matching" parts of the screen path or screen title. If you want to trigger a conversion manually or track some user interaction, call the method ``goal``. [Read more about what a goal is in the Help Center.](https://help.piwik.pro/support/reports/goals/)

```java
TrackHelper.track().goal("27ecc5e3-8ae0-40c3-964b-5bd8ee3da059").revenue(revenue).with(tracker)
```
* A goal (required) – a tracking request will trigger a conversion for the goal of the website being tracked with this ID.

* Revenue (optional) – a monetary value that has been generated as revenue by goal conversion.

Create, view or manage goals is available in the Analytics tab, "Goals" left menu, "Manage goals" section.

### Tracking ecommerce transactions
*Requires Analytics*

If your organization depends on online sales, you need detailed analysis to transform raw e-commerce stats into actionable insights. Revenue, orders, conversion rates, and a host of other product statistics can be analyzed by integrating Piwik with your e-commerce solution.

SDK provides the ``order`` method that can be used for tracking the orders (including the order items).
Sample usage:

```java
Tracker tracker = ((YourApplication) getApplication()).getTracker();
EcommerceItems items = new EcommerceItems();
// EcommerceItems.Item("<sku>").name("<product>").category("<category>").price(<cents>).quantity(<number>)
items.addItem(new EcommerceItems.Item("0123456789012").name("Polo T-shirt").category("Men's T-shirts").price(3000).quantity(2));
items.addItem(new EcommerceItems.Item("0129876543210").name("Leather shoes").category("Shoes").price(40000).quantity(1));

TrackHelper.track().order("orderId",124144).subTotal(33110).tax(9890).shipping(1000).discount(0).items(items).with(tracker);
```
* `orderId` (required) – a unique String identifying the order

* `grandTotal` (required) –  Total amount of the order, in cents

* `subTotal` (optional) –  the subTotal (net price) for the order, in cents

* `tax` (optional) –  the tax for the order, in cents

* `shipping` (optional) –  the shipping for the order, in cents

* `discount` (optional) –  the discount for the order, in cents

* `items` (optional) –  the items included in the order, use the ``EcommerceItems`` class to instantiate items


### Tracking custom variables 
*The feature will soon be disabled. We recommend using [custom dimensions](#tracking-custom-dimensions) instead.*

*Requires Analytics*

A custom variable is a custom name-value pair that you can assign to your users or screen views, and then visualize the reports of how many visits, conversions, etc. for each custom variable. A custom variable is defined by a name — for example, "User status" — and a value – for example, "LoggedIn" or "Anonymous". It is required for names and values to be encoded in UTF-8.

Each custom variable has a scope. There are two types of custom variables scope - _visit scope_ and _screen scope_. The visit scope can be used for any tracking action, and the screen scope can only be applied to tracking screen views.

To set the custom variable of the screen scope, use the ``variable`` method in the tracking chain:

```java
TrackHelper.track()
       .variable(1, "filter", "price")
       .variable(2, "language", "en");

TrackHelper.track()
       .screen("/custom_vars")
       .title("Custom Vars")
       .with(getTracker());
```

When screen custom variable is set and the screen event is called, the screen custom variable will be removed from the list of screen custom variables.
The above code can also be written in the following way.

```java
TrackHelper.track()
       .variable(1, "filter", "price")
       .variable(2, "language", "en")
       .screen("/custom_vars")
       .title("Custom Vars")
       .with(getTracker());
```

To use the custom variable of the visit scope, use the ``visitVariables`` method in the tracking chain:

```java
TrackHelper.track()
       .visitVariables(1, "filter", "price")
       .visitVariables(2, "language", "en");
TrackHelper.track()
       .event("category", "action")
       .with(tracker);
```

In contrast to the screen custom variables, the visit custom variable will not be removed when the event is called.

Please note that the [Default custom variables](#default-custom-variables) option is enabled by default. With this option turned on, use the custom variables with indexes greater than 3 or the visit scope custom variables with indexes 1-3.

In case you don't need the default custom variable, you can disable it. See below the section regarding default custom variables and how to disable them.

Custom variable is defined by three parameters:

* An index (required) – a given custom variable name must always be stored in the same "index" per session. For example, if you choose to store the variable name = "Gender" in index = 1 and you record another custom variable in index = 1, then the "Gender" variable will be deleted and replaced with a new custom variable stored in index 1.

* A name (required) – this String defines the name of a specific Custom Variable such as "User type" (Limited to 200 characters).

* A value (required) – this String defines the value of a specific Custom Variable such as "Customer" (Limited to 200 characters).

### Tracking custom dimensions
*Requires Analytics*

To track a custom name-value pair assigned to your users or screen views, use [Custom Dimensions](https://help.piwik.pro/analytics/custom-dimensions/). Note that the custom value data is not sent by itself, but only with other tracking actions such as screen views, events or other tracking action:

```java
TrackHelper.track()
       .dimension(1, "visit")
       .dimension(2, "dashboard")
       .screen("Home screen")
       .with(tracker);
```

``1`` and ``2`` are our dimension slots and ``visit``, ``dashboard`` are the dimension values for the tracked screen view.

```java
TrackHelper.track()
       .dimension(1, "visit")
       .dimension(2, "billing");
TrackHelper.track()
       .event("category", "action")
       .with(tracker);
```
``1`` and ``2`` are our dimension slots and ``visit``, ``billing`` are the dimension values for the tracked event.

Once the event is triggered, the dimensions are deleted and will not be sent with the next event. If you want to send dimensions with the next event, you must set them again.

### Tracking user profile attributes
*Requires Audience Manager*

The Audience Manager stores visitors' profiles which have data from a variety of sources. One of them can be a mobile application. It is possible to enrich the profiles with more attributes by passing any key-value pair e.g. gender: male, favourite food: Italian, etc. It is recommended to set additional user identifiers such as [email](#user-email-address) or [User ID](#user-id) which will allow the enrichment of existing profiles or merging of profiles rather than creating a new profile. For example, if the user visited the website, performed some actions, filled in a form with his email (his data was tracked and profile created in Audience Manager) and *Used only by Audience Manager* started using a mobile application, the existing profile will be enriched only if the email was set. Otherwise, a new profile will be created.

For sending profile attributes use ``audienceManagerSetProfileAttribute`` method:

```java
getTracker().setUserMail("john@doe.com");
...
TrackHelper.track().audienceManagerSetProfileAttribute("food", "pizza").add("color", "green").with(getTracker());
```

* A name (required) – defines the profile attribute name (non-null string).

* A value (required) – defines the profile attribute value (non null string).

* An ``add`` (chain method) – used to specify more attributes to the user within the same event.

Aside from attributes, each event also sends parameters which are retrieved from the tracker instance:
* WEBSITE_ID - always sent,
* USER_ID - if it is set. [Read more](#user-id) about the User ID,
* EMAIL - if it is set. [Read more](#user-email-address) about the email,
* VISITOR_ID - always sent, ID of the mobile application user, generated by SDK
* DEVICE_ID - an [Advertising ID](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en) that, by default, is fetched automatically when the tracker instance is created. In order to set device ID see [Device ID](#device-id) section below.

Profile attributes for the user that are tracked will be shown on the Audience Manager - Profile Browser tab.

Audience manager events are dispatched together with analytics events. Therefore, settings set in the tracker for analytics events processing (dispatch interval, cache size and age, etc.) will be same for audience manager events. Once the audience manager event is dispatched, it is no longer stored locally.


### Reading user profile attributes
*Requires Audience Manager*

It is possible to read the attributes of a given profile, however, with some limitations. Due to security reasons (to avoid personal data leakage), it is possible to read only attributes that were enabled for API access (whitelisted) in the Attributes section in Audience Manager. To get user profile attributes use the ``audienceManagerGetProfileAttributes`` method:

```java
        getTracker().audienceManagerGetProfileAttributes(new Tracker.OnGetProfileAttributes() {
            @Override
            public void onAttributesReceived(Map<String, String> attributes) {
                // handle result
            }

            @Override
            public void onError(String errorData) {
                errorData = TextUtils.isEmpty(errorData) ? "Network error": errorData;
                // handle error
            }
        });
```

* An OnGetProfileAttributes (required) – callback to handle request result (call is asynchronous), has two methods ``void onAttributesReceived(Map<String, String> attributes)`` and ``void onError(String errorData)``.

* An attributes (output) – dictionary of key-value pairs, where each pair represents the attribute name (key) and value.

* An errorData (output) – in case of error, only this method will be called. The method passes the error string.

### Checking audience membership
*Requires Audience Manager*

Audiences are allowed to check whether or not the user belongs to a specific group of users defined in the data manger panel based on analytics data and audience manager profile attributes. You can check if the user belongs to a given audience, for example, to show a special offer. To check it, use the ``checkAudienceMembership`` method:

```java
getTracker().checkAudienceMembership(audienceId, new Tracker.OnCheckAudienceMembership() {
            @Override
            public void onChecked(boolean isMember) {
                // handle result
            }

            @Override
            public void onError(String errorData) {
                // handle error
            }
        });
```
* An audienceId (required) – ID of the audience (Audience Manager -> Audiences tab)

* An OnCheckAudienceMembership (required) – callback to handle request result (call is asynchronous), has two methods ``void onChecked(boolean isMember)`` and ``void onError(String errorData)``

* An isMember (output) – a boolean value that indicates if user belongs to audience with given ID

* An errorData (output) – in case of error, only this method will be called. The method passes the error string.


## Advanced usage

### User ID

UserID will allow the association of events from various sources to the same user. Each time a new visitor enters your page, Piwik PRO assigns a cookie containing a random string of characters. The purpose of this cookie is for Piwik PRO to be able to recognize the same visitor whenever the website is visited again. However, instead of a random string, you can assign your visitors with your own human-friendly name (ex. visitor email). [Learn more about the user ID here](https://help.piwik.pro/support/getting-started/userid/). In order to set UserID, use the ``setUserId`` method:

```java
getTracker().setUserId("John Doe");
```
* A UserID (required) – any non-empty unique string identifying the user. Passing null will delete the current UserID

``userID`` will not be sent if the data anonymization is enabled.

### User email address
*Used only by Audience Manager*

The user email address is an optional parameter for user identification. Similar to UserID, it allows the association of events from various sources to the same user. To set user email use the ``setUserMail`` method:

```java
getTracker().setUserMail("john@doe.com");
```
* A userMail (required) – any non-null string representing email address

``userMail`` will not be send if the data anonymization is enabled.

Setting up an email helps the Audience Manager to enrich existing profiles or merge profiles which come from other sources (if they also have an email). Check [Tracking user profile attributes](#tracking-user-profile-attributes) for more information.

### Device ID
*Used only by Audience Manager*

The device ID is used to track the AAID (identifier for advertising). The AAID is an additional, non-empty unique string identifying the device. By default, device ID fetched automatically when the tracker instance is created.

To turn off automatic fetch, use the ``setTrackDeviceId(boolean isTracked)`` method:

```java
getTracker().setTrackDeviceId(false);
```

To set custom deviceID, use the ``setDeviceId(String deviceID)`` method:

```java
getTracker().setDeviceId(String deviceID);
```

If custom ``deviceID`` value is not set, then default automatically generated ``deviceID`` value is assigned.
You can get ``deviceID`` via ``getDeviceId()`` method:

```java
getTracker().getDeviceId();
```

``deviceID`` will not be sent if the data anonymization is enabled.
Note that if you plan to send your application to the Google Play Store and your application uses AAID, you will have to ask the user of the application for the corresponding permission.

### Visitor ID

To track user sessions on difference sources, the VisitorID parameter is used. VisitorID is randomly generated when the tracker instance is created, and stored between application launches. It is also possible to set the VisitorID manually:

```java
tracker.setVisitorId("0123456789abcdef");
```
* A VisitorID (required) – unique visitor ID, must be 16 characters hexadecimal string.

When the anonymization is enabled, a new visitor id is generated each time the application starts.
Every unique visitor must be assigned a different ID and this ID must not change after it is assigned. We recommend using UserID instead of VisitorID.

### Sessions

A session represents a set of user's interactions with your app. By default, Analytics is closing the session after 30 minutes of inactivity, counting from the last recorded event in session and when the user will open up the app again the new session is started. You can configure the tracker to automatically close the session when users have placed your app in the background for a period of time. That period is defined by the ``setSessionTimeout`` method.

```java
tracker.setSessionTimeout(30 * 60 * 1000);
```
* A timeout (required) – session timeout time in ms.

You can manually start a new session when sending a hit to Piwik by using the ``startNewSession`` method.

```java
tracker.startNewSession();
```

### Dispatching

Tracked events are stored temporarily on the queue and by default dispatched in batches every 3000 miliseconds (30 seconds). This behavior can be changed with the following options:
* ``setDispatchInterval(0)`` - incoming events will be dispatched immediately
* ``setDispatchInterval(-1)`` - incoming events will not be dispatched automatically. This lets you gain full control over dispatch process, by using manual dispatch, as in the example below.
* A dispatchInterval (required) – dispatch interval time in ms.


```java
    Tracker tracker = ((MyApplication) getApplication()).getTracker();
    tracker.setDispatchInterval(-1);
    // Catch and track exception
    try {
        cartItems = getCartItems();
    } catch (Exception e) {
        tracker.trackException(e, e.getMessage(), false);
        tracker.dispatch();
        cartItems = null;
    }
```

In case when more than one event is in the queue, data is sent in bulk (using POST method with JSON payload). 


### Custom queries

You should be able to use all common actions through the TrackHelper utility, but in some instances, you may want full control over what is sent to the server.

The base method for any event is ``track``. You can create your own `TrackMe` objects, set the parameters and then send it:

```java
TrackMe trackMe = new TrackMe()
trackMe.set...
/* ... */
Tracker tracker = ((YourApplication) getApplication()).getTracker();
tracker.track(trackMe);
```

### Default custom variables

SDK can automatically add information about the platform version, OS version and app version in custom variables with indexes 1-3. By default, this option is turned on.
This can be changed via the ``setIncludeDefaultCustomVars`` method:

```java
getTracker().setIncludeDefaultCustomVars(false);
```
In case you need to configure custom variables separately, turn off this option and see the section above regarding tracking custom variables.

### Local storage limits

You can set limits for storing events related to maximum size and time for which events are saved in local storage as below. Events older than the set limit will be discarded on the next dispatch attempt. The Piwik backend accepts backdated events for up to 24 hours by default.

To change offline cache age use the ``setOfflineCacheAge`` method:

```java
tracker.setOfflineCacheAge(80085);
```
* A limit (required) – time in ms after which events are deleted, 0 = unlimited, -1 = disabled offline cache.
By default, the limit is set to 24 * 60 * 60 * 1000 ms = 24 hours.

You can also specify how large the offline cache may be. If the limit is reached, the oldest files will be deleted first. To change offline cache size use the ``setOfflineCacheSize`` method:

```java
tracker.setOfflineCacheSize(16 * 1000 * 1000);
```
* A limit (required) – size in bytes after which events are deleted, 0 = unlimited.
By default, the limit is set to 4 * 1024 * 1024 bytes = 4 Mb.

### Opt out

You can enable an app-level opt-out flag that will disable Piwik PRO tracking across the entire app. Note that this flag must be set each time the app starts up and will default to ``false``. To set the app-level opt-out, use:

```java
getTracker().setOptOut(true);
```

### Dry run

The SDK provides a dryRun flag that, when set, prevents any data from being sent to Piwik and instead prints them in the console. The dryRun flag should be set whenever you are testing or debugging an implementation and do not want test data to appear in your Piwik reports. To set the dry run flag, use:

```java
getTracker().setDryRunTarget(Collections.synchronizedList(new ArrayList<Packet>()));
```
* A dryRunTarget (required) – a data structure the data should be passed into ``List<Packet>`` type. Set it to null to disable dry run.

