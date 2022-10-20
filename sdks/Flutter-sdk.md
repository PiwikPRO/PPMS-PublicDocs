# Flutter SDK

## SDK Configuration

### Server

- You need a Piwik PRO account on the cloud or an on-premises setup which your mobile app will communicate with. For details, please visit the Piwik PRO website.
- Create a new website (or app) in the Piwik PRO web interface.
- Copy and note the Website ID from “Administration > Websites & apps > Installation” and your server address.

### Client

#### Run this command:

#### With Dart:

`$ dart pub add flutter_piwikpro`

#### With Flutter:

`$ flutter pub add flutter_piwikpro`

This will add a line like this to your package's pubspec.yaml (and run an implicit dart pub get):

```yaml
dependencies:
  flutter_piwikpro: ^0.0.1
```
Alternatively, your editor might support dart pub get or flutter pub get. Check the docs for your editor to learn more.

#### Import it
Now in your Dart code, you can use:

import 'package:flutter_piwikpro/flutter_piwikpro.dart';

#### Configuration

You'll need to configure the tracker before using any other methods - for that you will need the base URL address of your tracking server and website ID (you can find it in Administration > Websites & apps > Installation on the web interface).

```dart
await FlutterPiwikPro.sharedInstance.configureTracker(baseURL: 'https://your.piwik.pro.server.com', siteId: '01234567-89ab-cdef-0123-456789abcdef');
```

##### iOS and Android parameters:

- `String baseURL` - base URL of your tracking server
- `String siteId` - ID of your website or application

#### Usage and general info

Every method from the sdk is async, and every method can throw exceptions - for example if you try to use sdk methods without configuring the tracker first - which you can capture using the standard try-catch approach. For example:

```dart
try {
    final result =
    await FlutterPiwikPro.sharedInstance.trackDownload('http://your.server.com/bonusmap2.zip');
    print(result);
} catch (exception) {
    //handle an exception
}
```

If a method call is succesful, most of the methods, unless specified, will return a String that describes which method was called, and which parameters were used, for example:

```
FlutterPiwikPro - configureTracker completed with parameters: baseURL: https://your.piwik.pro.server.com, siteId: 01234567-89ab-cdef-0123-456789abcdef
```

## Using Piwik PRO SDK Flutter Wrapper

#### Data Anonymization

Anonymization is a feature that allows tracking a user’s activity for aggregated data analysis even if the user doesn’t consent to track the data. If a user does not agree to being tracked, he will not be identified as the same person across multiple sessions.

Personal data will not be tracked during the session (i.e. [user ID](https://developers.piwik.pro/en/latest/data_collection/mobile/Piwik_PRO_SDK_for_iOS.html#user-id)) If the anonymization is enabled, a new [visitor ID](https://developers.piwik.pro/en/latest/data_collection/mobile/Piwik_PRO_SDK_for_iOS.html#visitor-id) will be created each time the application starts.

Anonymization is enabled by default.

You can turn the anonymization on and off by calling `setAnonymizationState`:

```dart
await FlutterPiwikPro.sharedInstance.setAnonymizationState(true);
```

- `bool shouldAnonymize` - pass `true` to enable anonymization, or `false` to disable it.

#### Tracking Screen Views

The basic functionality of the SDK is Tracking Screen Views which represent the content the user is viewing in the application. To track a screen you only need to provide the name of the screen. This name is internally translated by the SDK to an HTTP URL as the Piwik PRO server uses URLs for tracking views. Additionally, Piwik PRO SDK uses prefixes which are inserted in generated URLs for various types of action(s).

To track screen views you can use the `trackScreen` method:

```dart
    await FlutterPiwikPro.sharedInstance.trackScreen(screenName: "menuScreen");
```

##### iOS and Android parameters:

- `String path` – title of the action being tracked. The appropriate screen path will be generated for this action.

##### Additional Android only parameters:

- `String? title` (optional) – the title of the action being tracked.

#### Tracking Custom Events

Custom events can be used to track the user’s interaction with various custom components and features of your application, such as playing a song or a video. You can read more about events in the Piwik PRO [documentation](https://help.piwik.pro/support/getting-started/custom-event/?pk_vid=94e4d762e02c95a81646658829f547d0) and [ultimate guide to event tracking](https://piwik.pro/blog/event-tracking-ultimate-guide/?pk_vid=94e4d762e02c95a81646658747f547d0).

To track custom events you can use the `trackCustomEvent` method:

```dart
await FlutterPiwikPro.sharedInstance.trackCustomEvent(
    action: 'test action',
    category: 'test category',
    name: 'test name',
    value: 120);
```

##### iOS and Android parameters:

- `String category` – this String defines the event category. You may define event categories based on the class of user actions ( e.g. taps, gestures, voice commands), or you may define them based upon the features available in your application (e.g. play, pause, fast forward, etc.).
- `String action` – this String defines the specific event action within the category specified. In the example, we are essentially saying that the category of the event is user clicks, and the action is a button click.
- `String? name` (optional) – this String defines a label associated with the event. For example, if you have multiple button controls on a screen, you might use the label to specify the specific identifier of a button that was clicked.
- `double? value` (optional) – this Float defines a numerical value associated with the event. For example, if you were tracking “Buy” button clicks, you might log the number of items being purchased, or their total cost.

##### Additional Android only parameters:

- `String? path` (optional) - the path under which this event occurred.

### Tracking Exceptions

Tracking exceptions allow the measurement of exceptions and errors in your app. Exceptions are tracked on the server in a similar way as screen views, however, URLs internally generated for exceptions always use the fatal or caught prefix.

To track exceptions you can use the `trackException` method:

```dart
await FlutterPiwikPro.sharedInstance.trackException(description: "description of an exception", isFatal: false);
```

##### iOS and Android parameters:

- `String description` – provides the exception message.
- `bool isFatal` – true if an exception is fatal.

### Tracking Social Interactions

Social interactions such as likes, shares and comments in various social networks can be tracked as below. This is tracked in a similar way as screen views.

To track social interactions you can use the `trackSocialInteraction` method:

```dart
await FlutterPiwikPro.sharedInstance.trackSocialInteraction(
    interaction: 'like',
    network: 'Facebook',
    target: 'Dogs');
```

##### iOS and Android parameters

- `String interaction` – defines the social interaction, e.g. “Like”.
- `String network` – defines the social network associated with interaction, e.g. “Facebook”
- `String? target` (optional) – the target for which this interaction occurred, e.g. “Dogs”.

### Tracking Downloads

You can track downloads initiated by your application by using the `trackDownload` method:

```dart
await FlutterPiwikPro.sharedInstance.trackDownload('http://your.server.com/bonusmap2.zip');
```

##### iOS and Android parameters

- `String url` - URL of the downloaded content.

### Tracking Application Installs

You can also track installations of your application. This event is sent to the server only once per application version (additional events won't be sent).

You can track app installs using the `trackAppInstall` method:

```dart
await FlutterPiwikPro.sharedInstance.trackAppInstall();
```

### Tracking Outlinks

For tracking outlinks to external websites or other apps opened from your application you can use the trackOutlink method:

```dart
await FlutterPiwikPro.sharedInstance.trackOutlink('http://great.website.com');
```

##### iOS and Android parameters

- `String url` - defines the outlink target. HTTPS, HTTP and FTP are valid.

### Tracking Search Operations

Tracking search operations allow the measurement of popular keywords used for various search operations performed inside your application.
To track them you can use the `trackSearch` method:

```dart
await FlutterPiwikPro.sharedInstance.trackSearch(keyword: 'Space', category: "Movies", numberOfHits: 100);
```

##### iOS and Android parameters

- `String keyword` – the searched query that was used in the app.
- `String category` – specify a search category.
- `int? numberOfHits`(optional) – we recommend setting the search count to the number of search results displayed on the results page. When keywords are tracked with a count of 0, they will appear in the “No Result Search Keyword” report.

### Tracking Content Impressions

You can track the impression of an ad using the `trackContentImpression` method:

```dart
 await FlutterPiwikPro.sharedInstance.trackContentImpression(
    contentName: "name",
    piece: 'piece',
    target: 'target');
```

##### iOS and Android parameters

- `String contentName` – the name of the content, e.g. “Ad Foo Bar”.
- `String? piece` (optional) – the actual content. For instance the path to an image, video, audio, any text.
- `String? target` (optional) – the target of the content e.g. the URL of a landing page.

### Tracking Content Interactions

When a user interacts with an ad by tapping on it, you can track it using the `trackContentInteraction` method:

```dart
await FlutterPiwikPro.sharedInstance.trackContentInteraction(
    contentName: "name",
    piece: 'piece',
    target: 'target',
    contentInteraction: 'Clicked really hard');
```

##### iOS and Android parameters

- `String contentName` – the name of the content, e.g. “Ad Foo Bar”.
- `String? piece` (optional) – the actual content. For instance the path to an image, video, audio, any text.
- `String? target` (optional) – the target of the content e.g. the URL of a landing page.
- `String? contentInteraction` (optional) - a type of interaction that occured, e.g. "tap"

### Tracking Goals

Goal tracking is used to measure and improve your business objectives. To track goals, you first need to configure them on the server in your web panel. Goals such as, for example, subscribing to a newsletter can be tracked as below with the goal ID that you will see on the server after configuring the goal and optional revenue. The currency for the revenue can be set in the Piwik PRO Analytics settings. You can read more about goals [here](https://help.piwik.pro/support/reports/goals/?pk_vid=7911e4718d49d8b91646824201589edd)
To track goals you can use the `trackGoal` method:

```dart
await FlutterPiwikPro.sharedInstance.trackGoal(goal: 10, revenue: 102.2);
```

##### iOS and Android parameters

- `int goal` – a tracking request will trigger a conversion for the goal of the website being tracked with this ID.
- `double? revenue` (optional) – a monetary value that has been generated as revenue by goal conversion.

### Tracking Ecommerce Transactions

Ecommerce transactions (in-app purchases) can be tracked to help you improve your business strategy. To track a transaction you must provide two required values - the transaction identifier and grandTotal. Optionally, you can also provide values for subTotal, tax, shippingCost, discount and list of purchased items.
To track an ecommerce transaction you can use the `trackEcommerceTransaction` method:

```dart
final ecommerceTransactionItems = [
EcommerceTransactionItem(category: 'cat1', sku: 'sku1', name: 'name1', price: 20, quantity: 1),
EcommerceTransactionItem(category: 'cat2', sku: 'sku2', name: 'name2', price: 10, quantity: 1),
EcommerceTransactionItem(category: 'cat3', sku: 'sku3', name: 'name3', price: 30, quantity: 2),
];
await FlutterPiwikPro.sharedInstance.trackEcommerceTransaction(
    identifier: "transactionID",
    grandTotal: 100,
    subTotal: 10,
    tax: 5,
    shippingCost: 100,
    discount: 6,
    transactionItems: ecommerceTransactionItems,
);
```

##### iOS and Android parameters

- `String identifier` – a unique string identifying the order
- `int grandTotal` – The total amount of the order, in cents
- `int? subTotal` (optional) – the subtotal (net price) for the order, in cents
- `int? tax` (optional) – the tax for the order, in cents
- `int? shippingCost` (optional) – the shipping for the order, in cents
- `int? discount` (optional) – the discount for the order, in cents
- `List<EcommerceTransactionItem>? transactionItems` (optional) – the items included in the order

### Tracking Campaigns

Tracking campaign URLs created with the online [Campaign URL Builder tool](https://piwik.pro/url-builder-tool/?pk_vid=7911e4718d49d8b91646825739589edd) allow you to measure how different campaigns (for example with Facebook ads or direct emails) bring traffic to your application. You can register a custom URL schema in your project settings to launch your application when users tap on the campaign link. You can track these URLs from the application delegate as below. The campaign information will be sent to the server together with the next analytics event. More details about campaigns can be found in the [documentation](https://help.piwik.pro/support/reports/campaign-report/?pk_vid=7911e4718d49d8b91646825758589edd).
To track a campaign you can use the `trackCampaign` method:

```dart
await FlutterPiwikPro.sharedInstance.trackCampaign("http://example.org/offer.html?pk_campaign=Email-SummerDeals&pk_keyword=LearnMore");
```

##### iOS and Android parameters

- `String url` - the campaign URL. HTTPS, HTTP and FTP are valid - the URL must contain a campaign name and keyword parameters.

### Tracking Custom Variables

The feature will soon be disabled. We recommend using custom dimensions instead.

To track custom name-value pairs assigned to your users or screen views, you can use custom variables. A custom variable can have a visit scope, which means that they are assigned to the whole visit of the user or action scope meaning that they are assigned only to the next tracked action such as screen view.
It is required for names and values to be encoded in UTF-8.
You can add a custom variable using the `trackCustomVariable` method:

```dart
await FlutterPiwikPro.sharedInstance.trackCustomVariable(
    index: 1,
    name: 'filter',
    value: 'lcd',
    scope: CustomVariableScope.visit);
```

##### iOS and Android parameters

- `int index` – a given custom variable name must always be stored in the same “index” per session. For example, if you choose to store the variable name = “Gender” in index = 1 and you record another custom variable in index = 1, then the “Gender” variable will be deleted and replaced with new custom variable stored in index 1. Please note that some of the indexes are already reserved. See Default custom variables section for details.
- `String name` – this String defines the name of a specific Custom Variable such as “User type”. Limited to 200 characters.
- `String value` – this String defines the value of a specific Custom Variable such as “Customer”. Limited to 200 characters.
- `CustomVariableScope scope` – this String allows the specification of the tracking event type - “visit”, “action”, etc. The scope is the value from the enum CustomVariableScope and can be `visit` or `action`.

### Tracking Custom Dimensions

You can also use custom dimensions to track custom values. Custom dimensions first have to be defined on the server in your web panel. More details about custom dimensions can be found in the [documentation](https://help.piwik.pro/analytics/custom-dimensions/?pk_vid=7911e4718d49d8b91646827839589edd)
You can add a custom dimension using the `trackCustomDimension` method:

```dart
await FlutterPiwikPro.sharedInstance.trackCustomDimension(id: 1, value: 'english');
```

##### iOS and Android parameters

- `int index` – a given custom dimension must always be stored in the same “index” per session, similar to custom variables. In example 1 is our dimension slot.
- `String value` – this String defines the value of a specific custom dimension such as “English”. Limited to 200 characters.

### Tracking Profile Attributes

_Requires Audience Manager_

The Audience Manager stores visitors’ profiles, which have data from a variety of sources. One of them can be a mobile application. It is possible to enrich the profiles with more attributes by passing any key-value pair like gender: male, favourite food: Italian, etc. It is recommended to set additional user identifiers such as email or User ID. This will allow the enrichment of existing profiles or merging profiles rather than creating a new profile. For example, if the user visited the website, browsed or filled in a form with his/her email (his data was tracked and profile created in Audience Manager) and, afterwards started using a mobile application, the existing profile will be enriched only if the email was set. Otherwise, a new profile will be created.
To set profile attributes you can use the `trackProfileAttribute` method:

```dart
await FlutterPiwikPro.sharedInstance.trackProfileAttribute(name: 'food', value: 'chips');
```

##### iOS and Android parameters

- `String name` – defines profile attribute name (non-null string).
- `String value` – defines profile attribute value (non-null string).

Aside from attributes, each event also sends parameters which are retrieved from the tracker instance:

- `WEBSITE_ID` – always sent.
- `USER_ID` – if set.
- `EMAIL` – if set.
- `VISITOR_ID` – always sent, ID of the mobile application user, generated by the SDK.
- `DEVICE_ID` – Advertising ID that, by default, is fetched automatically when the tracker instance is created (only on Android).

### Reading User Profile Attributes

_Requires Audience Manager_

It is possible to read the attributes of a given profile, however, with some limitations. Due to of security reasons to avoid personal data leakage, it is possible to read only attributes that were enabled for API access (whitelisted) in the Attributes section of Audience Manager. To get user profile attributes you can use the `readUserProfileAttributes` method:

```dart
await FlutterPiwikPro.sharedInstance.readUserProfileAttributes()
```

##### Returned Value

- `Future<Map<String, String>>` - this method returns a Map of key-value pairs, where each pair represent attribute name (key) and value (instead of a usual String that describes which method was called with which parameters)

### Checking Audience Membership

_Requires Audience Manager_

Checking audience membership allows one to check if the user belongs to a specific group of users defined in the audience manger panel based on analytics data and audience manager profile attributes. You can check if a user belongs to a given audience, for example, to display him/her some type of special offer.
You can check audience membership using the `checkAudienceMembership` method:

```dart
await FlutterPiwikPro.sharedInstance.checkAudienceMembership('audienceId');
```

##### iOS and Android parameters

- `String audienceId` – ID of the audience (Audience Manager -> Audiences tab)

##### Returned Value

- `Future<bool>` - this method returns a bool value (true if a user is a member of an audience, false otherwise) instead of a usual String that describes which method was called with which parameters.

## Advanced usage

### User ID

The user ID is an additional, optional non-empty unique string identifying the user (not set by default). It can be, for example, a unique username or user’s email address. If the provided user ID is sent to the analytics part together with the visitor ID (which is always automatically generated by the SDK), it allows the association of events from various platforms (for example iOS and Android) to the same user provided that the same user ID is used on all platforms. You can read more about User ID [here](https://help.piwik.pro/support/getting-started/userid/?pk_vid=8fd81278e0c020001646834928589edd).
You can set a user id using the `setUserId` method:

```dart
await FlutterPiwikPro.sharedInstance.setUserId('testUserId')
```

##### iOS and Android parameters

- `String id` – any non-empty unique string identifying the user. Passing null will delete the current user ID

### User Email Address

The user email address is an another string used for identifying users - a provided user email is sent to the audience manager part when you send the custom profile attribute configured on the audience manager web panel. Similarly to the user ID, it allows the association of data from various platforms (for example iOS and Android) to the same user as long as the same email is used on all platforms.

It is recommended to set the user email to track audience manager profile attributes as it will create a better user profile.

You can set a user email using the `setUserEmail` method:

```dart
await FlutterPiwikPro.sharedInstance.setUserEmail('user@email.com');
```

##### iOS and Android parameters

- `String email` – a string representing an email address

### Visitor ID

SDK uses various IDs for tracking the user. The main one is visitor ID, which is internally randomly generated once by the SDK on the first usage and is then stored locally on the device. The visitor ID will never change unless the user removes the application from the device so that all events sent from his device will always be assigned to the same user in the Piwik PRO web panel. When the anonymization is enabled, a new visitor id is generated each time the application is started. We recommend using userID instead of VisitorID.
Still, you can set a visitor ID using the `setVisitorId` method:

```dart
await FlutterPiwikPro.sharedInstance.setVisitorId('Id');
```

##### iOS and Android parameters

- `String id` - a string containing a new Visitor ID

### Setting Session Timeout

A session represents a set of user’s interactions with your app. By default, Analytics is closing the session after 30 minutes of inactivity, counting from the last recorded event in session and when the user will open up the app again the new session is started. You can configure the tracker to automatically close the session when users have placed your app in the background for a period of time.
You can change the session timeout using the `setSessionTimeout` method:

```dart
await FlutterPiwikPro.sharedInstance.setSessionTimeout(1000)
```

##### iOS and Android parameters

- `int timeoutInMilliseconds` - Session timeout in milliseconds. Default: 1800000 (30 minutes)

### Setting Dispatch Interval

All tracking events are saved locally and by default. They are automatically sent to the server every 30 seconds. You can change this interval using the `setDispatchInterval` method:

```dart
await FlutterPiwikPro.sharedInstance.setDispatchInterval(10000)
```

##### iOS and Android parameters

- `int intervalInMilliseconds` - Dispatch interval in milliseconds. Default: 30000

### Default Custom Variables

The SDK, by default, automatically adds some information in custom variables about the device (index 1), system version (index 2) and app version (index 3). By default, this option is turned on.

In case you need to configure custom variables separately, turn off this option and see the section above about tracking custom variables.

You can disable this behavior using the `setIncludeDefaultVariables` method:

```dart
await FlutterPiwikPro.sharedInstance.setIncludeDefaultVariables(false);
```

##### iOS and Android parameters

- `bool shouldInclude` - a boolean value that removes Default Variables when `false`

### Opt-Out

You can disable all tracking in the application by using the opt-out feature. No events will be sent to the server if the opt-out is set. By default, opt-out is not set and events are tracked.
You can opt out of tracking using the `optOut` method:

```dart
await FlutterPiwikPro.sharedInstance.optOut(true);
```

##### iOS and Android parameters

- `bool shouldOptOut` - a boolean value that disables all tracking in the app when set to `true`.

### Dry Run

The SDK provides a dryRun flag that, when set, prevents any data from being sent to Piwik. The dryRun flag should be set whenever you are testing or debugging an implementation and do not want test data to appear in your Piwik reports.
You can set set the dry run flag using the `dryRun` method:

```dart
await FlutterPiwikPro.sharedInstance.dryRun(true);
```

##### iOS and Android parameters

- `bool shouldDryRun` - a boolean value that prevents any data being sent to a tracker when set to `true`
