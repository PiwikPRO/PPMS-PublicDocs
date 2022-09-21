# Piwik PRO SDK for React Native

Piwik PRO SDK for React Native

### Installation

```sh
npm install @piwikpro/react-native-piwik-pro-sdk
```

### Configuration

In order to set up the Piwik PRO tracker you have to call `init` method passing a server address and website ID (you can find it in `Administration` -> `Sites & apps`):

```js
import PiwikProSdk from "@piwikpro/react-native-piwik-pro-sdk";

// ...

await PiwikProSdk.init('https://your.piwik.pro.server.com', '01234567-89ab-cdef-0123-456789abcdef')
```
Parameters:
- `serverAddress: string` *(required)* – URL of your Piwik PRO server.
- `websiteId: string` *(required)* – ID of your website or application.

***Note:*** Each tracking method is implemented as a Promise which will be rejected if the `PiwikProSdk` has not been initialized.



## Using Piwik PRO SDK

### Data anonymization

Anonymization is the feature that allows tracking a user’s activity for aggregated data analysis even if the user doesn’t consent to track the data. If a user does not agree to be tracked, he will not be identified as the same person across multiple sessions.

Personal data will not be tracked during the session (i.e. user ID, device ID). If the anonymization is enabled, a new visitor ID will be created each time the application starts.

Anonymization is enabled by default.

You can turn the anonymization on and off using the `setAnonymizationState` method:

```js
await PiwikProSdk.setAnonymizationState(false);
```
Parameters:
- `anonymizationState: boolean` *(required)* – new anonymization state.

You can also check the anonymization status using the `isAnonymizationOn` method:

```js
const anonymizationState = await PiwikProSdk.isAnonymizationOn();
```
Returns:
- `anonymizationState: boolean` – current anonymization state.



### Tracking screen views

*Requires Analytics*

During a valid tracking session, you can track screen views which represent the content the user is viewing in the application. To track a screen you only need to provide the screen path. This path is internally translated by the SDK to an HTTP URL as the Piwik PRO server uses URLs for tracking views. Additionally, Piwik PRO SDK uses prefixes which are inserted in a generated URL for various types of action(s). For tracking screen views it will use a prefix `'screen'` by default, however, [automatic prefixing](#prefixing) can be disabled with the `setPrefixing(false)` option.

```js
const options = {
  title: 'actionTitle',
  customDimensions: { 1: 'some custom dimension value' },
};
await PiwikProSdk.trackScreen(`your_screen_path`, options);
```
Parameters:
- `path: string` *(required)* – screen path (it will be mapped to the URL path).
- `options` – screen tracking options, object containing four properties (all of them are optional):
    - `title: string` – the title of the action being tracked (it will be omitted in iOS application).
    - `customDimensions` – the object specifying [custom dimensions](#tracking-custom-dimensions).
    - `screenCustomVariables` – the object specifying [screen custom variables](#tracking-custom-variables).
    - `visitCustomVariables` – the object specifying [visit custom variables](#tracking-custom-variables).



### Tracking custom events

*Requires Analytics*

To collect data about the user’s interaction with the interactive components of the application, like a button presses or the use of a particular item in the game – use event method.

```js
const options = {
  name: 'customEvent',
  path: 'some/path',
  value: 1.5,
  customDimensions: { 1: 'some custom dimension value' },
}
await PiwikProSdk.trackCustomEvent(`custom_event`, 'custom_event_action', options);
```
Parameters:
- `category: string` *(required)* – event category. You may define event categories based on the class of user actions (e.g. clicks, gestures, voice commands), or you may define them based on the features available in your application (e.g. play, pause, fast forward, etc.).
- `action: string` *(required)* – specific event action within the category specified. In the example, we are effectively saying that the category of the event is user clicks, and the action is a button click.
- `options` – custom event options, object containing five properties (all of them are optional):
    - `name: string` – label associated with the event. For example, if you have multiple button controls on a screen, you may use the label to specify the specific view control identifier that was clicked.
    - `value: number` – float, numerical value associated with the event. For example, if you were tracking 'Buy' button clicks, you may log the number of items being purchased or their total cost.
    - `path: string` – the path under which this event occurred (it will be omitted in iOS application).
    - `customDimensions` – the object specifying [custom dimensions](#tracking-custom-dimensions).
    - `visitCustomVariables` – the object specifying [visit custom variables](#tracking-custom-variables).

For more resources, please visit [documentation](https://help.piwik.pro/support/tag-manager/piwik-pro-custom-event/).



### Tracking exceptions

*Requires Analytics*

Caught exceptions are errors in your app for which you’ve defined an exception handling code, such as the occasional timeout of a network connection during a request for data. Exceptions are tracked on the server in a similar way as screen views, however, action internally generated for exceptions always uses the `'fatal'` or `'caught'` [prefix](#prefixing), and additionally the `'exception'` prefix if `isPrefixingOn()` option is enabled (`true`).

Measure a caught exception by setting the exception field values on the tracker and sending the hit, as with this example:

```js
const options = {
  visitCustomVariables: { 4: { name: 'food', value: 'pizza' } },
  customDimensions: { 1: 'some custom dimension value' },
};
await PiwikProSdk.trackException('exception', false, options);
```
Parameters:
- `description: string` *(required)* – the exception message.
- `isFatal: boolean` *(required)* – true if an exception is fatal. Determines whether the exception prefix will be `'fatal'` or `'caught'`.
- `options` – exception tracking options, object containing two properties (all of them are optional):
    - `customDimensions` – the object specifying [custom dimensions](#tracking-custom-dimensions).
    - `visitCustomVariables` – the object specifying [visit custom variables](#tracking-custom-variables).



### Tracking social interactions

*Requires Analytics*

Social interactions such as likes, shares and comments in various social networks can be tracked as below. This, again, is tracked in a similar way as with screen views but the `'social'` [prefix](#prefixing) is used when the default `isPrefixing()` option is enabled.

```js
const options = {
  visitCustomVariables: { 4: { name: 'food', value: 'pizza' } },
  target: 'Photo',
};
await PiwikProSdk.trackSocialInteraction(`Like`, 'Facebook', options);
```
Parameters:
- `interaction: string` *(required)* – the social interaction, e.g. 'Like'.
- `network: string` *(required)* – social network associated with interaction, e.g. 'Facebook'.
- `options` – social interaction tracking options, object containing three properties (all of them are optional):
    - `target: string` – the target for which this interaction occurred, e.g. 'Photo'.
    - `customDimensions` – the object specifying [custom dimensions](#tracking-custom-dimensions).
    - `visitCustomVariables` – the object specifying [visit custom variables](#tracking-custom-variables).

The generated URL corresponds to string, which includes the network, interaction and target parameters separated by slash.



### Tracking downloads

*Requires Analytics*

You can track the downloads initiated by your application:

```js
const options = {
  visitCustomVariables: 4: { name: 'food', value: 'pizza' },
  customDimensions: { 1: 'beta', 2: 'gamma', },
};
await PiwikProSdk.trackDownload(`http://your.server.com/bonusmap.zip`, options);
```
Parameters:
- `url: string` *(required)* – URL of the downloaded content.
- `options` – download tracking options, object containing two properties (all of them are optional):
    - `customDimensions` – object specifying [custom dimensions](#tracking-custom-dimensions).
    - `visitCustomVariables` – object specifying [visit custom variables](#tracking-custom-variables).

All downloads can be viewed in the corresponding section in the analytics panel.

***Note:*** Generated URLs may differ between Android and iOS.



### Tracking outlinks

*Requires Analytics*

For tracking outlinks to external websites or other apps opened from your application use the `trackOutlink` method:

```js
const options = {
  visitCustomVariables: 4: { name: 'food', value: 'pizza' },
  customDimensions: { 1: 'beta', 2: 'gamma', },
};
await PiwikProSdk.trackOutlink(`http://your.server.com/bonusmap.zip`, options);
```
Parameters:
- URL *(required)* – outlink target. HTTPS, HTTP and FTP are valid.
- `options` – outlinks tracking options, object containing two properties (all of them are optional):
    - `customDimensions` – object specifying [custom dimensions](#tracking-custom-dimensions).
    - `visitCustomVariables` – object specifying [visit custom variables](#tracking-custom-variables).



### Tracking search operations

*Requires Analytics*

Tracking search operations allow the measurement of popular keywords used for various search operations performed inside your application. It can be done via the `trackSearch` method:

```js
const options = {
  category: `Movies`,
  count: 3,
  visitCustomVariables: 4: { name: 'food', value: 'pizza' },
  customDimensions: { 1: 'beta', 2: 'gamma', },
};
await PiwikProSdk.trackSearch('Space', options);
```
Parameters:
- `keyword: string` *(required)* – searched query that was used in the app.
- `options` – search tracking options, object containing four properties (all of them are optional):
    - `category: string` – search category.
    - `count: number` – we recommend setting the search count to the number of search results displayed on the results page. When keywords are tracked with a count of 0, they will appear in the 'No Result Search Keyword' report.
    - `customDimensions` – object specifying [custom dimensions](#tracking-custom-dimensions).
    - `visitCustomVariables` – object specifying [visit custom variables](#tracking-custom-variables).



### Tracking content impressions and interactions

*Requires Analytics*

You can track an impression of an ad in your application as below.
```js
const options = {
  piece: 'banner',
  target: 'https://www.dn.se/',
  visitCustomVariables: 4: { name: 'food', value: 'pizza' },
  customDimensions: { 1: 'beta', 2: 'gamma', },
};
await PiwikProSdk.trackImpression('Some content impression', options);
```

When the user interacts with the ad by tapping on it, you can also track it with a similar method:
```js
const options = {
  piece: 'banner',
  target: 'https://www.dn.se/',
  visitCustomVariables: 4: { name: 'food', value: 'pizza' },
  customDimensions: { 1: 'beta', 2: 'gamma', },
};
await PiwikProSdk.trackInteraction('Some content interaction', options);
```

Parameters:
- `contentName: string` *(required)* – name of the content, e.g. 'Ad Foo Bar'.
- `options` – impression tracking options, object containing four properties (all of them are optional):
    - `piece: string` – actual content. For instance, path to the image, video, audio or any text.
    - `target: string` – the target of the content. For instance the URL of a landing page.
    - `customDimensions` – object specifying [custom dimensions](#tracking-custom-dimensions).
    - `visitCustomVariables` – object specifying [visit custom variables](#tracking-custom-variables).



### Tracking goals

*Requires Analytics*

Goal tracking is used to measure and improve your business objectives. To track goals, you first need to configure them on the server in your web panel. Goals such as, for example, subscribing to a newsletter can be tracked as below with the goal ID that you will see on the server after configuring the goal and optional revenue. The currency for the revenue can be set in the Piwik PRO Analytics settings. You can read more about goals [here](https://help.piwik.pro/support/analytics/goals/).

```js
const options = {
  revenue: 30,
  visitCustomVariables: 4: { name: 'food', value: 'pizza' },
  customDimensions: { 1: 'beta', 2: 'gamma', },
};
await PiwikProSdk.trackGoal(1, options);
```
Parameters:
- `goal: number` *(required)* – tracking request will trigger a conversion for the goal of the website being tracked with this ID.
- `options` – goal tracking options, object containing three properties (all of them are optional):
    - `revenue: number` – monetary value that was generated as revenue by this goal conversion.
    - `customDimensions` – object specifying [custom dimensions](#tracking-custom-dimensions).
    - `visitCustomVariables` – object specifying [visit custom variables](#tracking-custom-variables).



### Tracking ecommerce transactions

*Requires Analytics*

Ecommerce transactions (in-app purchases) can be tracked to help you improve your business strategy. To track a transaction you must provide two required values – the transaction identifier and grandTotal. Optionally, you can also provide values for subTotal, tax, shippingCost, discount and list of purchased items as in the example below.

```js
const options: TrackEcommerceOptions = {
  discount: 0,
  shipping: 1000,
  subTotal: 33110,
  tax: 9890,
  items: [
    {
      sku: '0123456789012',
      category: "Men's T-shirts",
      name: 'Polo T-shirt',
      price: 3000,
      quantity: 2,
    },
  ],
  visitCustomVariables: 4: { name: 'food', value: 'pizza' },
  customDimensions: { 1: 'beta', 2: 'gamma', },
};
await PiwikProSdk.trackEcommerce('order_1', 124144, options);
```
Parameters:
- `orderId: string` *(required)* – unique string identifying the order.
- `grandTotal: number` *(required)* – total amount of the order, in cents.
- `options` – goal tracking options, object containing five properties (all of them are optional):
    - `subTotal: number` – subtotal (net price) for the order, in cents.
    - `tax: number` – tax for the order, in cents.
    - `shipping: number` – shipping for the order, in cents.
    - `discount: number` – discount for the order, in cents.
    - `items` – items included in the order, array of objects containing five required properties:
        - `sku: string` – identifier of the item.
        - `name: string` – name of the item.
        - `category: string` – category of the item.
        - `price: string` – price of the single item, in cents.
        - `quantity: string` – quantity of the item.
    - `customDimensions` – object specifying [custom dimensions](#tracking-custom-dimensions).
    - `visitCustomVariables` – object specifying [visit custom variables](#tracking-custom-variables).



### Tracking campaigns

*Requires Analytics*

[Tracking campaigns](https://piwik.pro/glossary/campaign-tracking/) URLs configured with the online [Campaign URL Builder](https://piwik.pro/url-builder-tool/) tool allow you to measure how different campaigns (for example with Facebook ads or direct emails) bring traffic to your application:

```js
const options = {
  visitCustomVariables: 4: { name: 'food', value: 'pizza' },
  customDimensions: { 1: 'beta', 2: 'gamma', },
};
await PiwikProSdk.trackCampaign('http://example.org/offer.html?pk_campaign=Email-SummerDeals&pk_keyword=LearnMore', options);
```
Parameters:
- `url: string` *(required)* – the campaign URL. HTTPS, HTTP and FTP are valid, however, the URL must contain campaign name and keyword parameters.
- `options` – campaign tracking options, object containing two properties (all of them are optional):
    - `customDimensions` – object specifying [custom dimensions](#tracking-custom-dimensions).
    - `visitCustomVariables` – object specifying [visit custom variables](#tracking-custom-variables).

***Note:*** On iOS the campaign information will be sent to the server together with the next analytics event.



### Tracking custom variables

*The feature will soon be disabled. We recommend using [custom dimensions](#tracking-custom-dimensions) instead.*

*Requires Analytics*

A [custom variable](https://piwik.pro/glossary/custom-variables/) is a custom name-value pair that you can assign to your users or screen views, and then visualize the reports of how many visits, conversions, etc. occurred for each custom variable. A custom variable is defined by a name – for example, 'User status' – and a value – for example, 'LoggedIn' or 'Anonymous'. It is required for names and values to be encoded in UTF-8.

Each custom variable has a scope. There are two types of custom variables scope – visit scope and screen scope. The visit scope can be used for any tracking action, and the screen scope can only be applied to tracking screen views.

To set the custom variable of the screen scope, use the `screenCustomVariables` object, for the visit scope – `visitCustomVariables` in the screen tracking method options:

```js
const options = {
  screenCustomVariables: { 4: { name: 'food', value: 'pizza' } },
  visitCustomVariables: { 5: { name: 'drink', value: 'water' } },
};
await PiwikProSdk.trackScreen(`your_screen_path`, options);
```

Please note that for the [Default custom variables](#default-custom-variables) option, use the custom variables of the visit scope with indexes 1-3.
Custom variables of each scope is the object with the following format:
```js
const customVariables = {
  4: { name: 'food', value: 'pizza' },
  5: { name: 'drink', value: 'water' },
}
```
where:
- `index: number`, the key *(required)* – a given custom variable name must always be stored in the same 'index' per session. For example, if you choose to store the variable with name 'Gender' in index  `1` and you record another custom variable in index `1`, then the 'Gender' variable will be deleted and replaced with a new custom variable stored in index `1`.
- `name: string` *(required)* – the name of a specific custom variable such as 'User type' (Limited to 200 characters).
- `value: string` *(required)* – the value of a specific custom variable such as 'Customer' (Limited to 200 characters).



### Tracking custom dimensions

*Requires Analytics*

To track a custom key-value pair assigned to your users or screen views, use [custom dimensions](https://help.piwik.pro/support/analytics/custom-dimension/). Note that the custom value data is not sent by itself, but only with other tracking actions such as screen views, events or other tracking actions (see the documentation of other tracking methods), for example:

```js
const customDimensions = {
  1: 'dashboard',
  2: 'menu',
}
await PiwikProSdk.trackScreen(`your_screen_path`, { customDimensions });
```

`1` and `2` are dimension IDs. `dashboard`, `menu` are the dimension values for the tracked screen view event.



### Tracking user profile attributes

*Requires Audience Manager*

The Audience Manager stores visitors’ profiles which have data from a variety of sources. One of them can be a mobile application. It is possible to enrich the profiles with more attributes by passing any key-value pair e.g. gender: male, favourite food: Italian, etc. It is recommended to set additional user identifiers such as [email](#user-email-address) or [user ID](#user-id) which will allow the enrichment of existing profiles or merging of profiles rather than creating a new profile. For example, if the user visited the website, performed some actions, filled in a form with his email (his data was tracked and profile created in Audience Manager) and afterwards started using a mobile application, the existing profile will be enriched only if the email was set. Otherwise, a new profile will be created.

For sending profile attributes use `trackProfileAttributes` method:

```js
const profileAttributes: TrackProfileAttributes = [
  { name: 'food', value: 'pizza' },
  { name: 'drink', value: 'water' },
];
// Profile attributes can be also a single object:
// const profileAttributes: TrackProfileAttributes = { name: 'food', value: 'pizza' };
await PiwikProSdk.trackProfileAttributes(profileAttributes);
```
Parameters:
- `profileAttributes` – an object or an array of objects with two required properties:
    - `name: string` *(required)* – profile attribute name.
    - `value: string` *(required)* – the profile attribute value.

Aside from attributes, each event also sends parameters which are retrieved from the tracker instance:
- `WEBSITE_ID` – always sent.
- `USER_ID` – if set. Read more about the [User ID](#user-id).
- `EMAIL` – if set. Read more about the [email](#user-email-address).
- `VISITOR_ID` – always sent, ID of the mobile application user, generated by the SDK.
- `DEVICE_ID` – Advertising ID that, by default, is fetched automatically when the tracker instance is created (only on Android).


Profile attributes for the user that are tracked will be shown on the `Audience Manager` -> `Profile Browser` tab.



### Reading user profile attributes

*Requires Audience Manager*

It is possible to read the attributes of a given profile, however, with some limitations. Due to security reasons (to avoid personal data leakage), it is possible to read only attributes that were enabled for API access (whitelisted) in the Attributes section in the Audience Manager. You can get user profile attributes in the following manner:
```js
const attributes = await PiwikProSdk.getProfileAttributes();
console.log(attributes);
// {"device_type": "desktop", ...}
```
Returns:
- `attributes: object` – dictionary of key-value pairs, where each pair represents the attribute name (key) and value. In case of error (for example when user profile does not yet exist), returns error message.



### Checking audience membership

*Requires Audience Manager*

Audiences are allowed to check whether or not the user belongs to a specific group of users defined in the data manger panel based on analytics data and audience manager profile attributes. You can check if the user belongs to a given audience, for example, to show a special offer. To check it, use the `checkAudienceMembership` method:
```js
const audienceId = 'a83d4aac-faa6-4746-96eb-5ac110083f8e';
const isMember = await PiwikProSdk.checkAudienceMembership(audienceId);
console.log(isMember);
// true
```
Parameters:
- `audienceId: string` *(required)* – ID of the audience (Audience Manager -> Audiences).

Returns:
- `isMember: boolean` – value indicating whether user belongs to the audience with given ID or error message if an error occurred.



## Advanced usage

### User ID

The user ID is an additional, optional non-empty unique string identifying the user (not set by default). It can be, for example, a unique username or user’s email address. If the provided user ID is sent to the analytics part together with the visitor ID, it allows the association of events from various platforms (for example iOS and Android) to the same user provided that the same user ID is used on all platforms. More about [user ID](https://help.piwik.pro/support/getting-started/userid/). In order to set user ID use the `setUserId` method:
```js
await PiwikProSdk.setUserId("John Doe");
```
Parameters:
- `userId: string` *(required)* – any non-empty unique string identifying the user. Passing null will delete the current user ID.

You can obtain current user ID value with `getUserId`:

```js
const currentUserId = await PiwikProSdk.getUserId(); 
```
Returns:
- `userId: string` – current user ID.



### User email address

*Used only by Audience Manager*

The user email address is an optional parameter for user identification. Similar to [user ID](#user-id), it allows the association of events from various sources to the same user. To set user email use the `setUserEmail` method:
```js
await PiwikProSdk.setUserEmail('john@doe.com');
```
Parameters:
- `email: string` *(required)* – non-empty string representing email address.

Setting up an email helps the Audience Manager to enrich existing profiles or merge profiles which come from other sources (if they also have an email). Check [Tracking user profile attributes](#tracking-user-profile-attributes) for more information.

You can obtain current user email value with `getUserEmail`:

```js
const currentUserEmail = await PiwikProSdk.getUserEmail(); 
```
Returns:
- `email: string` – current user email.



### Visitor ID

To track user sessions on different sources, the visitor ID parameter is used. Visitor ID is randomly generated when the tracker instance is created, and stored between application launches. It is also possible to reset the visitor ID manually:
```js
await PiwikProSdk.setVisitorId("0123456789abcdef");
```
Parameters:
- `visitorId: string` *(required)* – unique visitor ID, must be 16 characters hexadecimal string.

Every unique visitor must be assigned a different ID and this ID must not change after it is assigned. We recommend using [user ID](#user-id) instead of visitor ID.

You can check current visitor ID value with `getVisitorId`:

```js
const currentVisitorId = await PiwikProSdk.getVisitorId(); 
```
Returns:
- `visitorId: string` – current visitor ID.



### Sessions

A session represents a set of user’s interactions with your app. By default, Analytics is closing the session after 30 minutes of inactivity, counting from the last recorded event in session and when the user will open up the app again the new session is started. You can configure the tracker to automatically close the session when users have placed your app in the background for a period of time. That period is defined by the `setSessionTimeout`:
```js
await PiwikProSdk.setSessionTimeout(1800);
```
Parameters:
- `sessionTimeout: number` *(required)* – session timeout time in seconds. Default: 1800 seconds (30 minutes).

You can obtain current `sessionTimeout` value with `getSessionTimeout`:

```js
const currentSessionTimeout = await PiwikProSdk.getSessionTimeout();
console.log(currentSessionTimeout); // 1800
```
Returns:
- `sessionTimeout: number` – current session timeout value in seconds.

You can manually start a new session when sending a hit to Piwik by using the `startNewSession` method.

```js
await PiwikProSdk.startNewSession();
```



### Dispatching

Tracked events are stored temporarily on the queue and dispatched in batches every 30 seconds (default setting). This behavior can be changed in the following way:

```js
const dispatchInterval = 25; // 25 seconds
await PiwikProSdk.setDispatchInterval(dispatchInterval);    
```

Parameters:
- `dispatchInterval: number` *(required)* – new dispatch interval (in seconds).

If `dispatchValue` is equal to `0` then events will be dispatched immediately. When its value is negative then events will not be dispatched automatically. This gives you full control over dispatch process using manual `dispatch`:

```js
await PiwikProSdk.dispatch();    
```

You can obtain current `dispatchInterval` value with `getDispatchInterval`:

```js
const currentDispatchInterval = await PiwikProSdk.getDispatchInterval(); 
```
Returns:
- `dispatchInterval: number` – current dispatch interval (in seconds) or negative number if automatic dispatch has been disabled.



### Default custom variables

SDK can automatically add information about the platform version, OS version and app version in custom variables with indexes 1-3. By default, this option is turned on. This can be changed via the `setIncludeDefaultCustomVars` method:
```js
await PiwikProSdk.setIncludeDefaultCustomVariables(true);
```
Parameters:
- `includeDefaultCustomVariables: boolean` *(required)* – flag that determines whether default custom variables should be added to each tracking event.

The status of the option can be checked with `getIncludeDefaultCustomVariables`:
```js
const includeDefaultCustomVariables = await PiwikProSdk.getIncludeDefaultCustomVariables();
```
Returns:
- `includeDefaultCustomVariables: boolean` – flag that determines whether default custom variables should be added to each tracking event.



### Opt out

You can set an app-level opt-out flag that will disable Piwik PRO tracking across the entire app. Note that this flag must be set each time the app starts up and by default is set to `false`. To enable the app-level opt-out, use:
```js
await PiwikProSdk.setOptOut(true);
```
Parameters:
- `optOut: boolean` *(required)* – flag that determines whether opt-out is enabled.

You can obtain current `optOut` value with `getOptOut`:
```js
const currentOptOutState = await PiwikProSdk.getOptOut();
console.log(currentOptOutState); // false
```
Returns:
- `optOut: boolean` – current opt-out state.



### Dry run

The SDK provides a `dryRun` flag that, when set, prevents any data from being sent to Piwik. The `dryRun` flag should be set whenever you are testing or debugging an implementation and do not want test data to appear in your Piwik reports. To set the `dryRun` flag, use:
```js
await PiwikProSdk.setDryRun(true);
```
Parameters:
- `dryRun: boolean` *(required)* – flag that determines whether dry run is enabled.

You can obtain current `dryRun` value with `getDryRun`:
```js
const currentDryRunState = await PiwikProSdk.getDryRun();
```
Returns:
- `dryRun: boolean` – current dry run state.



### Prefixing

In case of tracking events like screen view, exception or social interaction event path in the tracker will contain corresponding prefix. You can disable prefixing with:
```js
await PiwikProSdk.setPrefixing(false);
```
Parameters:
- `prefixingEnabled: boolean` *(required)* – flag that determines whether prefixing is enabled

You can also check the prefixing status using the `isPrefixingOn` method:

```js
const currentPrefixingState = await PiwikProSdk.isPrefixingOn();
console.log(currentPrefixingState); // false
```
Returns:
- `prefixingEnabled: boolean` – current prefixing state.

## License

MIT
