Piwik PRO SDK for iOS
========================

## SDK configuration

### Server
* You need a Piwik PRO account on the cloud or an on-premises setup which your mobile app will communicate with. For details, please visit the [Piwik PRO website](https://piwik.pro).
* Create a new website (or app) in the Piwik PRO web interface.
* Copy and note the Website ID from "Administration > Websites & apps > Installation" and your server address.

### Client
#### SDK integration - CocoaPods
Use the following in your Podfile:

```
pod 'PiwikPROSDK', '~> VERSION'
```

Replace `VERSION` with the latest release name, e.g. ``'~> 1.1.5'``.
You can check the latest version of the SDK on the [project page](https://cocoapods.org/pods/PiwikPROSDK).


Then run ``pod install``. In every file you wish to use the PiwikPROSDK, don't forget to import it.

#### SDK integration - Swift Package Manager

Before you start, make sure you are using Xcode version 12 or later.

Starting with version 1.1.4 of the Piwik Pro SDK for iOS, we have introduced support for Swift Package Manager for use with Xcode.

1. If you are migrating a project from a CocoaPods, run the command `pod deintegrate` to remove CocoaPods from your Xcode project. Then remove the remaining Piwik Pro SDK files.

2. To install the Piwik Pro SDK, in Xcode navigate to File > Add Packages. Altermatively, go to your project's settings, select `Package Dependencies` tab and click on the `+` button.

3. Enter the URL of our Piwik PRO SDK GitHub repository 
    * ```https://github.com/PiwikPRO/piwik-pro-sdk-framework-ios```
4. Select the [version](https://github.com/PiwikPRO/piwik-pro-sdk-framework-ios/tags) of Piwik Pro SDK you would like to use. For new projects, we recommend using the latest version. Bear in mind that Piwik Pro SDK is supporting Swift Package Manager since version 1.1.4.

5. Click on "Add Package" button and wait for Xcode to finish downloading the Swift Package into your project.

6. Next, select project in the Project Navigator. In the target list, select the target that builds the application and then click on the `Build Settings` tab. Find `Other Linker Flags` setting and double-click on it.
If the `-ObjC` flag is not in the list, click + and add it.

 *If you do not add the `-ObjC` flag, some parts of the API may not be visible and unexpected Piwik PRO SDK behaviour may occur while the application is running. You may experience some difficult to understand crash messages
 "+[NSString visitorID]: unrecognized selector sent to class 0x1ef0739a8" and other difficult to predict issues.*

#### Configuration

To configure the tracker you will need the URL address of your tracking server and website ID (you can find it in *Administration > Websites & apps > Installation* on the web interface).

Open the *AppDelegate.m* file and add sdk import:
```
#import <PiwikPROSDK/PiwikPROSDK.h>
```

Configure the tracker with your website ID and URL in the application delegate:
```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Configure the tracker in your application delegate
    [PiwikTracker sharedInstanceWithSiteID:@"01234567-89ab-cdef-0123-456789abcdef" baseURL:[NSURL URLWithString:@"https://your.piwik.pro.server.com"]];
    return YES;
}
```

#### Using Piwik PRO SDK with the Swift programming language

The Piwik PRO SDK is written in the Objective-C programming language. However, after installing the library from cocoapods, Xcode automatically generates Swift syntax for Objective-C calls.
When you edit a Swift file and type in an Objective-C class name, Swift version of the header file will be displayed.

Example of using the method to track a view in Objective-c:
```
[[PiwikTracker sharedInstance] sendView:@"Menu"];
```
Same example in Swift:
```
import PiwikPROSDK

PiwikTracker.sharedInstance()?.sendView(view: "Menu")
```

If there is a need to create the bridging header, see the apple tutorial ["Importing Objective-C into Swift"](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_objective-c_into_swift) for additional information.

## Using Piwik PRO SDK

SDK supports several different types of actions which can be tracked. If the event dispatch was unsuccessful (network error, server error, etc), the event will be saved in the disk cache and processing will be retried during the next dispatch attempt (in configured dispatch interval). Each event is stored in the disk cache for a specified cache age - the time which defines the maximum time for which event is saved locally.

### Data anonymization

Anonymization is the feature that allows tracking a user's activity for aggregated data analysis even if the user doesn't consent to track the data. If a user does not agree to be tracked, he will not be identified as the same person across multiple sessions.

Personal data will not be tracked during the session ([user ID](#user-id), [email](#user-email-address) and [device ID](#device-id))
If the anonymization is enabled, a new [visitor ID](#visitor-id) will be created each time the application starts.

Anonymization is enabled by default.

You can turn the anonymization on and off by setting the value of the variable ``isAnonymizationEnabled``:

```
[PiwikTracker sharedInstance].isAnonymizationEnabled = NO;
```

### Tracking screen views
*Requires Analytics*

The basic functionality of the SDK is the tracking screen views which represent the content the user is viewing in the application. To track a screen you only need to provide the name of the screen. This name is internally translated by the SDK to an HTTP URL as the Piwik PRO server uses URLs for tracking views. Additionally, Piwik PRO SDK uses prefixes which are inserted in generated URLs for various types of action(s). For tracking screen views it will use prefix *screen* by default however automatic prefixing can be disabled with the *isPrefixingEnabled* option. To start tracking screen views, add the following code to your view controllers.

```
- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    [[PiwikTracker sharedInstance] sendView:@"Menu"];
}
```

* A screen name (required) – title of the action being tracked. The appropriate screen path will be generated for this action.

It is also possible to track multiple views in one event. For that you can use the method ``sendViews``:

```
[[PiwikTracker sharedInstance] sendViews:@[ @"menu", @"view 1", @"screen view 2" ]];
```

### Tracking custom events
*Requires Analytics*

Custm events can be used to track the user's interaction with various custom components and features of your application, such as playing a song or a video. Category and action parameters are required while the name and value are optional.

```
[[PiwikTracker sharedInstance] sendEventWithCategory:@"Video" action:@"Play" name:@"Pirates" value:@185 path: @"/main/actionScreen"];
```

The ``sendEventWithCategory`` method allows to specify next parameters:

* A category (required) – this String defines the event category. You may define event categories based on the class of user actions ( e.g. clicks, gestures, voice commands), or you may define them based upon the features available in your application (e.g. play, pause, fast forward, etc.).

* An action (required) – this String defines the specific event action within the category specified. In the example, we are essentially saying that the category of the event is user clicks, and the action is a button click.

* A name (optional) – this String defines a label associated with the event. For example, if you have multiple button controls on a screen, you might use the label to specify the specific View control identifier that was clicked.

* A value (optional) – this Float defines a numerical value associated with the event. For example, if you were tracking "Buy" button clicks, you might log the number of items being purchased, or their total cost.

* A path (optional) – the path under which this event occurred.

For more resources, please visit:
* [Custom Events Overview](https://help.piwik.pro/support/getting-started/custom-event/)
* [Ultimate guide to event tracking](https://piwik.pro/blog/event-tracking-ultimate-guide/).


### Tracking exceptions
*Requires Analytics*

Tracking exceptions allow the measurement of exceptions and errors in your app. Exceptions are tracked on the server in a similar way as screen views.

```
[[PiwikTracker sharedInstance] sendExceptionWithDescription:@"Content download error"];
```
* A description (required) – provides the exception message.

Bear in mind that Piwik is not a crash tracker, use this sparingly.

### Tracking social interactions
*Requires Analytics*

Social interactions such as likes, shares and comments in various social networks can be tracked as below. 

```
[[PiwikTracker sharedInstance] sendSocialInteractionWithAction:@"like" network:@"Facebook"];
```

* An interaction (required) – defines the social interaction, e.g. "Like".

* A network (required) – defines the social network associated with interaction, e.g. "Facebook"


### Tracking downloads
*Requires Analytics*

You can track the downloads initiated by your application.
```
[[PiwikTracker sharedInstance] sendDownload:@"http://your.server.com/bonusmap.zip"];
```
* A URL (required) – the URL of the downloaded content.

No prefixes are used for tracking downloads, but each event of this type use an additional parameter ``download`` whose value equals to specified URL. On the analytics panel all, downloads can be viewed in the corresponding section.

### Tracking application installs
*Requires Analytics*

You can also track installations of your application. This event is sent to the server only once per application version therefore if you wish to track installs, then you can add it in your application delegate immediately after configuring the tracker.

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Configure the tracker in your application delegate
    [PiwikTracker sharedInstanceWithSiteID:@"01234567-89ab-cdef-0123-456789abcdef" baseURL:[NSURL URLWithString:@"https://your.piwik.pro.server.com"]];
    [[PiwikTracker sharedInstance] sendApplicationDownload];
    return YES;
}
```
Application installation is only tracked during the first launch. In the case of the application being installed but not run, the app installation will not be tracked.

### Tracking outlinks
*Requires Analytics*

For tracking outlinks to external websites or other apps opened from your application use the ``sendOutlink`` method:

```
[[PiwikTracker sharedInstance] sendOutlink:@"http://great.website.com"];
```
* A URL (required) – defines the outlink target.

### Tracking search operations
*Requires Analytics*

Tracking search operations allow the measurement of popular keywords used for various search operations performed inside your application. It can be done via the ``sendSearchWithKeyword`` method:

```
[[PiwikTracker sharedInstance] sendSearchWithKeyword:@"Space" category:@"Movies" numberOfHits:@42];
```
* `keyword` (required) – the searched query that was used in the app.

* `category` (optional) – specify a search category.

* `numberOfHits` (optional) – we recommend setting the search count to the number of search results displayed on the results page. When keywords are tracked with a count of 0, they will appear in the "No Result Search Keyword" report.


### Tracking content impressions and interactions
*Requires Analytics*

You can track the impression of the ad in your application as below:
```
[[PiwikTracker sharedInstance] sendContentImpressionWithName:@"name" piece:@"piece" target:@"target"];
```

When the user interacts with the ad by tapping on it, you can also track it with a similar method:
```
[[PiwikTracker sharedInstance] sendContentInteractionWithName:@"name" interaction:@"click" piece:@"piece" target:@"target"];
```

* A contentName (required) – the name of the content, e.g. "Ad Foo Bar".

* A interaction (required) – type of interaction, e.g. click.

* A piece (optional) – the actual content. For instance the path to an image, video, audio, any text.

* A target (optional) – the target of the content e.g. the URL of a landing page.

### Tracking goals
*Requires Analytics*

Goaltracking is used to measure and improve your business objectives. To track goals, you first need to configure them on the server in your web panel. Goals such as, for example, subscribing to a newsletter can be tracked as below with the goal ID that you will see on the server after configuring the goal and optional revenue. The currency for the revenue can be set in the Piwik PRO Analytics settings. You can read more about goals [here](https://help.piwik.pro/support/reports/goals/).

```
[[PiwikTracker sharedInstance] sendGoalWithID:@"27ecc5e3-8ae0-40c3-964b-5bd8ee3da059" revenue:@30];
```
* A goal (required) – tracking request will trigger a conversion for the goal of the website being tracked with this ID.

* `revenue` (optional) – a monetary value that was generated as revenue by this goal conversion.


### Tracking ecommerce transactions
*Requires Analytics*

Ecommerce transactions (in-app purchases) can be tracked to help you improve your business strategy. To track a transaction you must provide two required values - the transaction identifier and `grandTotal`. Optionally, you can also provide values for `subTotal`, `tax`, `shippingCost`, `discount` and list of purchased items as in the example below.
```
[[PiwikTracker sharedInstance] sendTransaction:[PiwikTransaction transactionWithBlock:^(PiwikTransactionBuilder *builder) {
    builder.identifier = @"transactionID";
    builder.grandTotal = @5.0;
    builder.subTotal = @4.0;
    builder.tax = @0.5;
    builder.shippingCost = @1.0;
    builder.discount = @0.0;
    [builder addItemWithSku:@"sku1" name:@"bonus" category:@"maps" price:@2.0 quantity:@1];
    [builder addItemWithSku:@"sku2" name:@"home" category:@"maps" price:@3.0 quantity:@1];
}]];
```
* An identifier (required) – a unique string identifying the order

* `grandTotal` (required) –  The total amount of the order, in cents

* `subTotal` (optional) –  the subtotal (net price) for the order, in cents

* `tax` (optional) –  the tax for the order, in cents

* `shipping` (optional) –  the shipping for the order, in cents

* `discount` (optional) –  the discount for the order, in cents

* Items (optional) –  the items included in the order, use the ``addItemWithSku`` method to instantiate items


### Tracking deep links and campaigns
*Requires Analytics*

Tracking campaign URLs created with the online [Campaign URL Builder tool](https://piwik.pro/url-builder-tool/) allow you to measure how different campaigns (for example with Facebook ads or direct emails) bring traffic to your application. You can register a custom URL schema in your project settings to launch your application when users tap on the campaign link. The campaign information will be sent to the server together with the next ``sendView`` event. More details about campaigns can be found in the [documentation](https://help.piwik.pro/support/reports/campaign-report/). You can track these URLs from the application delegate as below.

```
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary *)options
{
    return [[PiwikTracker sharedInstance] sendCampaign:url.absoluteString];
}
```
* A URL (required) – the campaign URL. The URL must contain a campaign name and keyword parameters.

### Tracking with custom variables
*The feature will soon be disabled. We recommend using [custom dimensions](#tracking-with-custom-dimensions) instead.*

*Requires Analytics*

To track custom name-value pairs assigned to your users or screen views, you can use custom variables. A custom variable can have a visit scope, which means that they are assigned to the whole visit of the user or action scope meaning that they are assigned only to the next tracked action such as screen view. You can find more information about custom variables [here](https://help.piwik.pro/analytics/custom-variables/):

It is required for names and values to be encoded in UTF-8.

```
[[PiwikTracker sharedInstance] setCustomVariableForIndex:1 name:@"filter" value:@"lcd" scope:CustomVariableScopeAction];
```
* An index (required) – a given custom variable name must always be stored in the same "index" per session. For example, if you choose to store the variable name = "Gender" in index = 1 and you record another custom variable in index = 1, then the "Gender" variable will be deleted and replaced with new custom variable stored in index 1. Please note that some of the indexes are already reserved. See [Default custom variables](#default-custom-variables) section for details.

* A name (required) – this String defines the name of a specific Custom Variable such as "User type". Limited to 200 characters.

* A value (required) – this String defines the value of a specific Custom Variable such as "Customer". Limited to 200 characters.

* A scope (required) – this String allows the specification of the tracking event type - "visit", "action", etc. The scope is the value from the enum ``CustomVariableScope`` and could be ``CustomVariableScopeVisit`` or ``CustomVariableScopeAction``.

### Tracking with custom dimensions
*Requires Analytics*

You can also use custom dimensions to track custom values as below.
```
[[PiwikTracker sharedInstance] setCustomDimensionForID:1 value:@"english"];
```

* An index (required) – a given custom dimension must always be stored in the same "index" per session, similar to custom variables. In example ``1`` is our dimension slot.

* A value (required) – this String defines the value of a specific custom dimension such as "English". Limited to 200 characters. 

Assigning a value to an already used index will overwrite the previously assigned value.
Note that the custom dimensions data is not sent by itself, but only with other tracking events.

Custom dimensions first have to be defined on the server in your web panel. More details about custom dimensions can be found in the [documentation](https://help.piwik.pro/analytics/custom-dimensions/):

### Tracking profile attributes
*Requires Audience Manager*

The Audience Manager stores visitors' profiles, which have data from a variety of sources. One of them can be a mobile application. It is possible to enrich the profiles with more attributes by passing any key-value pair like gender: male, favourite food: Italian, etc. It is recommended to set additional user identifiers such as [email](#user-email-address) or [User ID](#user-id). This will allow the enrichment of existing profiles or merging profiles rather than creating a new profile. For example, if the user visited the website, browsed or filled in a form with his/her email (his data was tracked and profile created in Audience Manager) and, afterwards started using a mobile application, the existing profile will be enriched only if the email was set. Otherwise, a new profile will be created.

For sending profile attributes use the ``sendProfileAttributeWithName`` method:

```
[[PiwikTracker sharedInstance] sendProfileAttributeWithName:@"food" value:@"chips"];
```
* A name (required) – defines profile attribute name (non-null string).

* A value (required) – defines profile attribute value (non-null string).

Aside from attributes, each event also sends parameters, that are retrieved from the tracker instance:
* WEBSITE_ID - always sent,
* USER_ID - if It is set. [Read more](#user-id) about the User ID,
* EMAIL - if It is set. [Read more](#user-email-address) about the email,
* VISITOR_ID - always sent, ID of the mobile application user, generated by SDK
* DEVICE_ID - it is a device IDFA, which is not set by default (due to platform limitations). In order to set device ID see [Device ID](#device-id) section below.

Profile attributes for the user that are tracked will be shown on the Audience Manager - Profile Browser tab.

Audience manager events are dispatched together with analytics events. Therefore, settings set in the tracker for analytics events processing (dispatch interval, cache size and age, etc.) will be same for audience manager events. Once the audience manager event is dispatched, it is no longer stored locally.

### Reading user profile attributes
*Requires Audience Manager*

It is possible to read the attributes of a given profile, however, with some limitations. Due to of security reasons to avoid personal data leakage, it is possible to read only attributes that were enabled for API access (whitelisted) in the Attributes section of Audience Manager. To get user profile attributes use the ``audienceManagerGetProfileAttributes`` method:

```
[[PiwikTracker sharedInstance] audienceManagerGetProfileAttributes:^(NSDictionary *profileAttributes, NSError * _Nullable error) {
    // do something with attributes list
}];
```

* `completionBlock` (required) – callback to handle request result (call is asynchronous)

* `profileAttributes` (output) – dictionary of key-value pairs, where each pair represent attribute name (key) and value.

* `errorData` (output) – in case of error only, this method will be called. This method passes the error string.


### Checking audience membership
*Requires Audience Manager*

Audience check allows one to check if the user belongs to a specific group of users defined in the audience manger panel based on analytics data and audience manager profile attributes. You can check if the user belongs to a given audience, for example, to display him/her some type of special offer like in the example below:

```
[[PiwikTracker sharedInstance] checkMembershipWithAudienceID:@"12345678-90ab-cdef-1234-567890abcdef" completionBlock:^(BOOL isMember, NSError * _Nullable error) {
    // do something if is member or handle error
}];
```
* `audienceId` (required) – ID of the audience (Audience Manager -> Audiences tab)

* `completionBlock` (required) – callback to handle request result (call is asynchronous)

* `isMember` (output) – a boolean value that indicates if the user belongs to an audience with a given ID

* `error` (output) – in case of error only, this method will be called. Method pass the error string.


## Advanced usage

### User ID

The user ID is an additional, optional non-empty unique string identifying the user (not set by default). It can be, for example, a unique username or user's email address. If the provided user ID is sent to the analytics part together with the visitor ID (which is always automatically generated by the SDK), it allows the association of events from various platforms (for example iOS and Android) to the same user provided that the same user ID is used on all platforms. More about [UserID](https://help.piwik.pro/tag-manager/userid/). In order to set User ID use ``userID`` field:

```
[PiwikTracker sharedInstance].userID = @"User Name";
```
* `userID` (required) – any non-empty unique string identifying the user. Passing null will delete the current user ID
``userID`` will not be sent if the data anonymization is enabled.

### User email address
*Used only by Audience Manager*

The user email address is another additional, optional string for user identification - if the provided user email is sent to the audience manager part when you send the custom profile attribute configured on the audience manager web panel. Similarly to the user ID, it allows the association of data from various platforms (for example iOS and Android) to the same user as long as the same email is used on all platforms. To set user email use the ``userEmail`` field:

```
[PiwikTracker sharedInstance].userEmail = @"user@email.com";
```
* A userMail (required) – any non-null string representing email address

It is recommended to set the user email to track audience manager profile attributes as it will create a better user profile.

``userMail`` will not be send if the data anonymization is enabled.

### Visitor ID

SDK uses various IDs for tracking the user. The main one is visitor ID, which is internally randomly generated once by the SDK on the first usage and is then stored locally on the device. The visitor ID will never change unless the user removes the application from the device so that all events sent from his device will always be assigned to the same user in the Piwik PRO web panel. 
It is also possible to set the VisitorID manually:

```
[PiwikTracker sharedInstance].visitorID = @"12345678901234fa";
```

When the anonymization is enabled, a new visitor id is generated each time the application is started.
We recommend using userID instead of VisitorID.

### Sessions

A session represents a set of user's interactions with your app. By default, Analytics is closing the session after 30 minutes of inactivity, counting from the last recorded event in session and when the user will open up the app again the new session is started. You can configure the tracker to automatically close the session when users have placed your app in the background for a period of time. That period is defined by the ``sessionTimeout``:

```
[PiwikTracker sharedInstance].sessionTimeout = 1800
```
* sessionTimeout (required) – session timeout time in seconds. Default: 1800 seconds (30 minutes).

You can manually start a new session when sending a hit to Piwik by using the ``startNewSession`` method.

```
[PiwikTracker sharedInstance].startNewSession;
```

### Device ID
*Used only by Audience Manager*

The device ID is used to track the IDFA (identifier for advertising). The IDFA is an additional, optional non-empty unique string identifying the device. If you wish to use the IDFA for tracking then you should set the device ID by yourself. Note that if you plan to send your application to the App Store and your application uses IDFA, but does not display ads, then it may be rejected in the App Store review process. You can set the IDFA as in the example below:
```
#import <AdSupport/ASIdentifierManager.h>

NSString *idfa = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
[PiwikTracker sharedInstance].deviceID = idfa;
```

``deviceID`` will not be sent if the data anonymization is enabled.


### Dispatching

All tracking events are saved locally and by default. They are automatically sent to the server every 30 seconds. You can change this interval to any other number as below:
* ``[PiwikTracker sharedInstance].dispatchInterval = 0`` - incoming events will be dispatched immediately
* ``[PiwikTracker sharedInstance].dispatchInterval = -1`` - incoming events will not be dispatched automatically. This lets you gain full control over dispatch process, by using manual dispatch:
```
[PiwikTracker sharedInstance].dispatchInterval = -1;
[[PiwikTracker sharedInstance] sendExceptionWithDescription:@"Content download error"];
[PiwikTracker sharedInstance].dispatch;
```

* A dispatchInterval (required) – dispatch interval time in seconds.

In case when more than one event is in the queue, data is sent in bulk (using POST method with JSON payload). 

### Default custom variables

The SDK, by default, automatically adds some information in custom variables about the device (index 1), system version (index 2) and app version (index 3). By default, this option is turned on. This behavior can be disabled with the following setting:

```
[PiwikTracker sharedInstance].includeDefaultCustomVariable = NO;
```
In case you need to configure custom variables separately, turn off this option and see the section above about tracking custom variables.

### Local storage limits

You can set limits for storing events related to maximum size and time for which events are saved in local storage. By default, the maximum number of queued events is set to 500 and there is no age limit. It can be changed as below:
```
[PiwikTracker sharedInstance].maxNumberOfQueuedEvents = 100;
[PiwikTracker sharedInstance].maxAgeOfQueuedEvents = 60 * 60 * 24;
```

* `maxNumberOfQueuedEvents` (required) – the maximum number of events after which events in the queue are deleted. By default, the limit is set to 500.

* `maxAgeOfQueuedEvents` (required) – time in ms after which events are deleted. By default, the limit is set to 24 * 60 * 60 = 24 hours.


### Opt-out

You can disable all tracking in the application by using the opt-out feature. No events will be sent to the server if the opt-out is set. By default, opt-out is not set and events are tracked.
```
[PiwikTracker sharedInstance].optOut = YES;
```


### Dry run

The SDK provides a dryRun flag that, when set, prevents any data from being sent to Piwik and instead prints them in the console. The dryRun flag should be set whenever you are testing or debugging an implementation and do not want test data to appear in your Piwik reports. To set the dry run flag, use:

```
[PiwikTracker sharedInstance].dryRun = YES;
```
* dryRun (required) – a flag that indicates the state of dry run mode. Set it to `NO` to disable dry run.

