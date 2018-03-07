Piwik PRO SDK for Android
========================

## SDK configuration

### Server
* You need a Piwik PRO account on cloud or on-premises setup which your mobile app will communicate with. For details visit [Piwik PRO website](https://piwik.pro)
* Create a new website (or app) in the Piwik PRO web interface.
* Copy and note the Website ID from "Settings > Websites" and your server address.

### Client
#### Including the library
Add this to your app modules `build.gradle` file, e.g. `~/git/MyApp/app/build.gradle`

```groovy
dependencies {
    repositories {
        jcenter()
    }
    compile 'pro.piwik.sdk:piwik-sdk:VERSION'
}
```
Replace `VERSION` with the latest release name, e.g. ``1.0.0``.


#### Configuration

In order to setup Piwik PRO tracker you have two options:

1) You can simply have your Android ``Application`` class extend ``PiwikApplication`` class. You will be forced to implement one abstract method. This approach is used in our demo app:

```java
public class YourApplication extends PiwikApplication{
    @Override
    public TrackerConfig onCreateTrackerConfig() {
        return TrackerConfig.createDefault("https://your.piwik.pro.server.com", "01234567-89ab-cdef-0123-456789abcdef");
    }
}
```

2) You can also manage the ``Tracker`` yourself. To configure the `Tracker` you will need server address and website ID (you can find it in "Settings > Websites"):

```java
public class YourApplication extends Application {
    private Tracker tracker;
    public synchronized Tracker getTracker() {
        if (tracker == null) tracker = Piwik.getInstance(this).newTracker(new TrackerConfig("https://your.piwik.pro.server.com", "01234567-89ab-cdef-0123-456789abcdef"));
        return tracker;
    }
}
```

To ensure that the metrics are not over-counted, it is highly recommended that the tracker is created and managed in the Application class (i.e. not created twice). The `Tracker` itself is thread-safe and can be shared throughout your application. It's not recommended to create multiple `Tracker` instances for the same target.

```java
Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
```

The application is ready to use Piwik PRO.


## Using Piwik PRO SDK

The recommended way to use the library is by using the ``TrackHelper`` class. It has methods for all common actions which can be chained in a way that facilities the correct order and use. Just by using autocompletion on ``TrackHelper.`` you can probably get pretty far.

For tracking each event with ``TrackHelper`` you will need to pass ``Tracker`` instance. The way of getting correct ``Tracker`` instance depends on configuration option (see section above):

1) Your Android ``Application`` class extend ``PiwikApplication`` class
```java
Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
```

2) You manage the ``Tracker`` yourself
```java
Tracker tracker = ((YourApplication) getApplication()).getTracker();
```

In further examples we will assume usage of the first option.

### Tracking screen views
*Requires Analytics*

During a valid tracking session, you can track screen views which represent content the user is viewing in the application. To send a visit on the screen, set the screen path and title on the tracker. This path is internally translated by the SDK to an HTTP URL as Piwik PRO server uses URLs for tracking views. Additionally, Piwik PRO SDK uses prefixes which are inserted in generated URL for various type of actions. For tracking screen views it will use prefix _screen_ by default however automatic prefixing can be disabled with ``tracker.setPrefixing(false)`` option.

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
* A path (required) – each screen should be mapped to URL path

* A title (optional) – title of the action being tracked. It is possible to use slashes / to set one or several categories for this action.

To automatically use the activity-stack as path and activity title as name use overloaded screen method:
```java
public class YourActivity extends Activity {
   ...
   TrackHelper.track().screen(YourActivity).with(tracker);
   ...
}
```
* An activity (required) – current instance of android ``Activity`` class.

In order to bind tracker to your applications use ``screens`` method. This method will automatically track all open application activities(views) keeping activity-stack as path and activity title as name:

```java
TrackHelper.track().screens(getApplication()).with(tracker);
```

### Tracking events
*Requires Analytics*

To collect data about user's interaction with interactive components of your app, like button presses or the use of a particular item in a game use ``event`` method. More about [events](https://helpcenter-piwik-pro.intercom.help/user-guides/action-reports/actions-reports-events) and [ultimate guide to event tracking](https://piwik.pro/blog/event-tracking-ultimate-guide/).

```java
TrackHelper.track().event("category", "action").path("/main/actionScreen").name("label").value(1000f).with(tracker);
```
The ``track`` method allows to specify next parameters:

* A category (required) – this String defines the event category. You might define event categories based on the class of user actions, like clicks or gestures or voice commands, or you might define them based upon the features available in your application (play, pause, fast forward, etc.).

* An action (required) – this String defines the specific event action within the category specified. In the example, we are basically saying that the category of the event is user clicks, and the action is a button click.

* A name (optional) – this String defines a label associated with the event. For example, if you have multiple Button controls on a screen, you might use the label to specify the specific View control identifier that was clicked.

* A value (optional) – this Float defines a numeric value associated with the event. For example, if you were tracking "Buy" button clicks, you might log the number of items being purchased, or their total cost.

* A path (optional) – the path under which this event occurred.


### Tracking exceptions
*Requires Analytics*

Caught exceptions are errors in your app for which you've defined exception handling code, such as the occasional timeout of a network connection during a request for data. Exceptions are tracked on the server in a similar way as screen views however action internally generated for exceptions always use _fatal_ or _caught_ prefix, and additionally _exception_ prefix if ``tracker.isPrefixing()`` option is enabled(true). The URL corresponds to exception stack trace, including package name, activity path, method name and line number where crash occurred. Keep in mind Piwik is not a crash tracker, use this sparingly.

Measure a caught exception by setting the exception field values on the tracker and sending the hit, as in this example:

```java
try {
   // preform action
} catch(Exception ex) {
   TrackHelper.track().exception(ex).description("Content download error").fatal(true).with(tracker);
}
```

* An exception (required) – Caught exception instance.

* A description (optional) – additional information about the issue.

* An isFatal (optional) – true if an exception is fatal.

### Tracking social interactions
*Requires Analytics*

Social interactions such as likes, shares and comments in various social networks can be tracked as below. This again is tracked in a similar way as screen views but _social_ prefix is used when default ``tracker.isPrefixing()`` option is enabled.

```java
 TrackHelper.track().socialInteraction("Like", "Facebook").target("Game").with(tracker);
```
* An interaction (required) – defines the social interaction, e.g. "Like".

* A network (required) – defines social network associated with interaction, e.g. "Facebook"

* A target (optional) – the target for which this interaction occurred, e.g. "My Piwik PRO app".

The URL corresponds to String, which includes network, interaction and target parameters separated by slash.

### Tracking downloads and app installs
*Requires Analytics*

You can track installations and downloads initiated by your application. This only triggers an event once per app version unless you force it. It is recommended to track application install in Android ``Application`` class:

```java
    TrackHelper.track().download().identifier(new DownloadTracker.Extra.ApkChecksum(this)).with(getTracker());
```
That will use package name, version and MD5 app checksum as identifier, e.g. ``com.piwikpro.demo:12/7B3DF8ED277BABEA6126C44E9AECEFEA``.

In case, if you need to specify more parameters create instance of ``DownloadTracker`` class explicitly:

```java
        DownloadTracker downloadTracker = new DownloadTracker(getTracker());
        DownloadTracker.Extra extra = new DownloadTracker.Extra.Custom() {
            @Override
            public boolean isIntensiveWork() {
                return false;
            }

            @Nullable
            @Override
            public String buildExtraIdentifier() {
                return "Demo Android download";
            }
        };

        TrackHelper.track().download(downloadTracker).identifier(extra).force().version("1.0").with(getTracker());
```

* isIntensiveWork() - return true if this should be run async and on a separate thread.

* buildExtraIdentifier() - return a string that will be used as extra identifier or null.

On analytics panel all downloads can be viewed in corresponding section.

### Tracking outlinks
*Requires Analytics*

For tracking outlinks to external websites or other apps opened from your application use ``outlink`` method:

```java
TrackHelper.track().outlink(new URL("https://www.google.com")).with(getTracker());
```
* An url (required) – defines the outlink target. HTTPS, HTTP and FTPare are valid.

### Tracking search operations
*Requires Analytics*

Tracking search operations allow to measure popular keywords used for various search operations performed inside your application. It can be done via ``search`` method:

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

* A contentName (required) – the name of the content, e.g. "Ad Foo Bar".

* A piece (optional) – the actual content. For instance the path to an image, video, audio, any text.

* A target (optional) – the target of the content. For instance the URL of a landing page.

### Tracking goals
*Requires Analytics*

By default, Goals are defined as "matching" parts of the screen path or screen title. If you want to trigger a conversion manually or track some user interaction call the method ``goal``. Read more about what is a [Goal in Piwik PRO](https://helpcenter-piwik-pro.intercom.help/analytics/reports-and-data-analysis/goal-tracking).

```java
TrackHelper.track().goal(1).revenue(revenue).with(tracker)
```
* A goal (required) – tracking request will trigger a conversion for the goal of the website being tracked with this ID.

* A revenue (optional) – a monetary value that was generated as revenue by this goal conversion.

Create, view or manage goals is available on Analytics tab, "Goals" left menu, "Manage goals" section.

### Tracking ecommerce transactions
*Requires Analytics*

Piwik provides [ecommerce analytics](https://piwik.org/docs/ecommerce-analytics/) that let you measure items added to carts, and learn detailed metrics about abandoned carts and purchased orders. To track an Ecommerce order use ``order`` method:

```java
Tracker tracker = ((YourApplication) getApplication()).getTracker();
EcommerceItems items = new EcommerceItems();
items.addItem(new EcommerceItems.Item("sku").name("product").category("category").price(200).quantity(2));
items.addItem(new EcommerceItems.Item("sku").name("product2").category("category2").price(400).quantity(3));

TrackHelper.track().order("orderId",10000).subTotal(7000).tax(2000).shipping(1000).discount(0).items(items).with(tracker);
```
* An orderId (required) – a unique string identifying the order

* A grandTotal (required) –  Total amount of the order, in cents

* A subTotal (optional) –  the subTotal (net price) for the order, in cents

* A tax (optional) –  the tax for the order, in cents

* A shipping (optional) –  the shipping for the order, in cents

* A discount (optional) –  the discount for the order, in cents

* Items (optional) –  the items included in the order, use ``EcommerceItems`` class to instantiate items


### Tracking campaigns
*Requires Analytics*

Tracking [campaigns](https://helpcenter-piwik-pro.intercom.help/user-guides/referrers-reports/referrers-reports-campaigns) urls configured with online *Campaign URL Builder tool* allow you to measure how different campaigns (for example with Facebook ads or direct emails) bring traffic to your application. You can track those urls from application via ``campaign`` method:

```java
TrackHelper.track().campaign(new URL("http://example.org/offer.html?_rcn=Email-SummerDeals&_rck=LearnMore")).with(getTracker());
```

* An URL (required) – the campaign URL. HTTPS, HTTP and FTP are valid, URL must contain campaign name and keyword parameters.

### Tracking custom variables
*Requires Analytics*

A [custom variable](https://helpcenter-piwik-pro.intercom.help/user-guides/visitors-reports/visitors-reports-custom-variables) is a custom name-value pair that you can assign to your users or screen views, and then visualize the reports of how many visits, conversions, etc. for each custom variable. A custom variable is defined by a name — for example, "User status" — and a value – for example, "LoggedIn" or "Anonymous". It’s required for names and values to be encoded in UTF-8.

Each custom variable has a scope. There are two types of custom variables scope - _visit scope_ and _screen scope_. Visit scope can be used for any tracking action, and screen scope can be applied only for tracking screen views.

To set custom variable of screen scope use ``variable`` method in tracking chain:

```java
TrackHelper.track()
       .screen("/custom_vars")
       .title("Custom Vars")
       .variable(1, "filter", "price")
       .variable(2, "language", "en")
       .with(getTracker());
```
To use custom variable of visit scope use ``visitVariables`` method in tracking chain:

```java
TrackHelper.track()
       .visitVariables(1, "filter", "price")
       .visitVariables(2, "language", "en")
       .event("category", "action")
       .with(tracker);
```
Please note, that [Default custom variables](#default-custom-variables) option use custom variables of visit scope with indexes 1-3.

Custom variable is defined by three parameters:

* An index (required) – a given custom variable name must always be stored in the same "index" per session. For example, if you choose to store the variable name = "Gender" in index = 1 and you record another custom variable in index = 1, then the "Gender" variable will be deleted and replaced with the new custom variable stored in index 1.

* A name (required) – this String defines the name of a specific Custom Variable such as "User type". Limited to 200 characters.

* A value (required) – this String defines the value of a specific Custom Variable such as "Customer". Limited to 200 characters.

### Tracking custom dimensions
*Requires Analytics*

To track a custom name-value pair assigned to your users or screen views use [Custom Dimensions](https://helpcenter-piwik-pro.intercom.help/analytics/custom-dimensions). Note that the custom value data is not sent by itself, but only with other tracking actions such as screen views, events or other tracking action:

```java
TrackHelper.track()
       .dimension(1, "visit")
       .dimension(2, "dashboard")
       .screen("Home screen")
       .with(tracker);
```

``1`` and ``2`` are our dimension slots and ``visit``, ``dashboard`` are the dimension values for tracked screen view.

```java
TrackHelper.track()
       .dimension(1, "visit")
       .dimension(2, "billing")
       .event("category", "action")
       .with(tracker);
```
``1`` and ``2`` are our dimension slots and ``visit``, ``billing`` are the dimension values for tracked event.

### Tracking user profile attributes
*Requires Audience Manager*

Audience Manager stores visitors profiles which have the data from variety of sources. One of them can be a mobile application. It is possible to enrich profiles with more attributes by passing any key-value pair like gender-male, favourite_food-italian etc. It is recommended to set additional user identifiers like [email](#user-email-address) or [User ID](#user-id). That will allow enriching existing profiles or merging profiles rather than creating a new profile. For example if the user visited the website, did some actions, filled in a form with his email (his data was tracked and profile created in Audience Manager) and afterward started using a mobile application, the existing profile will be enriched only if the email was set. Otherwise the new profile will be created.

For sending profile attributes use ``audienceManagerSetProfileAttribute`` method:

```java
getTracker().setUserMail("john@doe.com");
...
TrackHelper.track().audienceManagerSetProfileAttribute("food", "pizza").add("color", "green").with(getTracker());
```

* A name (required) – defines profile attribute name (non-null string).

* A value (required) – defines profile attribute value (non null string).

* An ``add`` (chain method) – used to specify more attributes to the user within the same event.

Besides attributes, each event also sends parameters, that are retrieved from tracker instance:
* WEBSITE_ID - always sent,
* USER_ID - if it's set. [Read more](#user-id) about the User ID,
* EMAIL - if it's set. [Read more](#user-email-address) about the email,
* VISITOR_ID - always sent, ID of the mobile application user, generated by SDK
* DEVICE_ID - an [Advertising ID](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en) that by default is fetched automatically when tracker instance is created.
To turn off automatic fetch, use ``setTrackDeviceId(boolean isTracked)`` method:

```java
getTracker().setTrackDeviceId(false);
```

Profile attributes for the user that are tracked will be shown on Audience Manager - Profile Browser tab.

Audience manager events are dispatched together with analytics events. So settings that are set in the tracker for analytics events processing (dispatch interval, cache size and age, etc.) will be same for audience manager events. Once the audience manager event is dispatched, it is not stored locally anymore.


### Reading user profile attributes
*Requires Audience Manager*

It is possible to read attributes of a given profile, with some limitations though. Because of security reasons to avoid personal data leakage, it is possible to read only attributes that were enabled for API access (whitelisted) in Attributes section in Audience Manager. To get user profile attributes use ``audienceManagerGetProfileAttributes`` method:

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

* An attributes (output) – dictionary of key-value pairs, where each pair represent attribute name(key) and value.

* An errorData (output) – in case of error only this method will be called. The method passes the error string.

### Checking audience membership
*Requires Audience Manager*

Audiences allow to check if user belongs to a specific group of users defined in the data manger panel based on analytics data and audience manager profile attributes. You can check if user belongs to a given audience for example to display him some special offer. To check it use ``checkAudienceMembership`` method:

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

* An isMember (output) – boolean value that indicates if user belongs to audience with given ID

* An errorData (output) – in case of error only this method will be called. The method passes the error string.


## Advanced usage

### User ID

UserID will allow associating events from various sources to the same user. Each time a new visitor enters your page, Piwik PRO assigns a cookie to him containing a random string of characters. The purpose of this cookie is for Piwik PRO to be able to recognize the same visitor whenever he visits your website again. However, instead of a random string, you can set your visitors with your own human-friendly name (ex. visitor email). More about [UserID](https://helpcenter-piwik-pro.intercom.help/tag-manager/manage-and-configure-tag-manager/userid). In order to set UserId use ``setUserId`` method:

```java
getTracker().setUserId("John Doe");
```
* A userId (required) – any non-empty unique string identifying the user. Passing null will delete the current userID

### User email address
*Used only by Audience Manager*

The user email address is an optional parameter for user identification. Similarly to userID, it allows associating events from various sources to the same user. To set user email use ``setUserMail`` method:

```java
getTracker().setUserMail("john@doe.com");
```
* A userMail (required) – any non-null string representing email address

Setting an email helps Audience Manager to enrich existing profiles or merge profiles with those comming from other sources (if they also have an email). Check [Tracking user profile attributes](#tracking-user-profile-attributes) for more information.

### Visitor ID

To track user sessions on difference source VisitorID parameter is used. VisitorID is randomly generated when tracker instance is created, and stored between application launches. Also, it is possible to reset VisitorID manually:

```java
tracker.setVisitorId("0123456789abcdef");
```
* A visitorID (required) – unique visitor ID, must be 16 characters hexadecimal string.

Every unique visitor must be assigned a different ID and this ID must not change after it is assigned. We recommend using userID instead of VisitorID.

### Sessions

A session represents a single period of user interaction with your app. By default, Piwik will group hits that are received within 30 minutes of one another into the same session. You can configure Piwik to automatically start new sessions when users have placed your app in the background for a period of time. This session timeout period is defined by the ``setSessionTimeout`` method.

```java
tracker.setSessionTimeout(30 * 60 * 1000);
```
* A timeout (required) – session timeout time in ms.

You can manually start a new session when sending a hit to Piwik by using the ``startNewSession`` method.

```java
tracker.startNewSession();
```

### Dispatching

The tracker, by default, will dispatch any pending events every 30 seconds. If 0 is used, any event will be dispatched immediately. If a negative value is used the dispatch timer will never run, a manual dispatch must be used:

```java
    Tracker tracker = ((YourApplication) getApplication()).getTracker();
    tracker.setDispatchInterval(-1);
    // Track exception
    try {
        revenue = getRevenue();
    } catch (Exception e) {
        tracker.trackException(e, e.getMessage(), false);
        tracker.dispatch();
        revenue = 0;
    }
```

When there is more than one event in the queue, dispatch is done using a POST request with JSON data (Bulktracking). JSON data may be gzipped before being dispatched. This may be set at app init time as follows:

```java
    private void initPiwik() {
      ...

        //set dispatcher to json gzip
        getTracker().setDispatchGzipped(true);

      ...
    }
```

This feature must also be set on server-side using mod_deflate/APACHE or lua_zlib/NGINX
([lua_zlib](https://github.com/brimworks/lua-zlib) - [lua-nginx-module](https://github.com/openresty/lua-nginx-module/) - [inflate.lua samples](https://gist.github.com/davidcaste/05b2f9461ebe4a3bb3fc) - [inflate.lua simplified Piwik sample](https://github.com/piwik/piwik-sdk-android/pull/123)).


### Custom queries

You should be able to use all common actions through the TrackHelper utility, but in some instances, you may want full control over what is sent to the server.

The base method for any event is ``track``.You can create your own `TrackMe` objects, set the parameters and then send it:

```java
TrackMe trackMe = new TrackMe()
trackMe.set...
/* ... */
Tracker tracker = ((YourApplication) getApplication()).getTracker();
tracker.track(trackMe);
```

### Default custom variables

SDK can automatically add information about the platform version, OS version and app version in custom variables with indexes 1-3. By default, this option is turned on.
These behaviour can be changed via ``setIncludeDefaultCustomVars`` method:

```java
getTracker().setIncludeDefaultCustomVars(false);
```
In case if you need to configure custom variables separately turn of this option and see section above about tracking custom variables.

### Local storage limits

You can set limits for storing events related to maximum size and time for which events are saved in local storage as below. Events older than the set limit will be discarded on the next dispatch attempt. The Piwik backend accepts backdated events for up to 24 hours by default.

To change offline cache age use ``setOfflineCacheAge`` method:

```java
tracker.setOfflineCacheAge(80085);
```
* A limit (required) – time in ms after which events are deleted, 0 = unlimited, -1 = disabled offline cache.
By default limit is set to 24 * 60 * 60 * 1000 ms = 24 hours.

You can also specify how large the offline cache may be. If the limit is reached the oldest files will be deleted first. To change offline cache size use ``setOfflineCacheSize`` method:

```java
tracker.setOfflineCacheSize(16 * 1000 * 1000);
```
* A limit (required) – size in bytes after which events are deleted, 0 = unlimited.
By default limit is set to 4 * 1024 * 1024 bytes = 4 Mb.

### Opt out

You can enable an app-level opt-out flag that will disable Piwik PRO tracking across the entire app. Note that this flag must be set each time the app starts up and will default to false. To set the app-level opt-out, use:

```java
getTracker().setOptOut(true);
```

### Dry run

The SDK provides a dryRun flag that when set, prevents any data from being sent to Piwik. The dryRun flag should be set whenever you are testing or debugging an implementation and do not want test data to appear in your Piwik reports. To set the dry run flag, use:

```java
getTracker().setDryRunTarget(Collections.synchronizedList(new ArrayList<Packet>()));
```
* A dryRunTarget (required) – a data structure the data should be passed into ``List<Packet>`` type. Set it to null to disable dry run.


## License

Piwik PRO Android SDK is released under the BSD-3 Clause license, see [LICENSE](https://github.com/PiwikPRO/piwik-pro-sdk-android/blob/master/LICENSE).
