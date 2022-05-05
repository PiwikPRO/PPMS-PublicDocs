# Piwik Pro PWA

If you're building an application that works offline, then understanding how users are interacting with your app when they don't have connectivity is crucial to optimizing that experience.

Analytics providers like Piwik Pro require a network connection to send data to their servers, which means if connectivity is unavailable, those requests will fail and those interactions will be missing from your analytics reports. It'll be like they never happened.

Piwik Pro PWA solves this problem for Piwik Pro users by leveraging Service Worker's ability to detect failed requests.

Piwik Pro receives all data via HTTP requests to the Analytics, which means a Service Worker script can add a fetch handler to detect failed requests sent to the Analytics. It can store these requests in IndexedDB and then retry them later once connectivity is restored.

Piwik Pro PWA does exactly this. It also adds fetch handlers to cache the ppms.js and the container scripts, so they can also be run offline. Lastly, when failed requests are retried, Piwik Pro PWA also automatically sets (or updates) the `cdt` in the request payload to ensure timestamps in Piwik Pro reflect the time of the original user interaction.

## Enabling PWA Piwik Pro

To enable Piwik Pro PWA, call the initialize() method in your service worker:

```javascript
import PiwikPro from '@piwikpro/pwa-piwik-pro';

PiwikPro.initialize();
```


This is the only code that's required to queue and retry failed requests to Piwik Pro, and it's the simplest way to get Piwik Pro working offline.

However, if using only the code above, the retried requests are indistinguishable from requests that succeed on the first try. This means you'll receive all the interaction data from offline users, but you won't be able to tell which interactions occurred while the user was offline.

To address this concern, you can use one of the optional methods described below.

## Enabling automatic tracking the status of the Internet connection

If you want to be able to differentiate retried requests from non-retried requests, you can use a command that will start automatic tracing of the internet connection status. With this solution, when the internet is lost, a custom event will be generated containing information about the status of the internet connection.

In your application, include the default PiwikPro in the highest level application module. ie index.

```javascript
import PiwikPro from '@piwikpro/pwa-piwik-pro';

PiwikPro.enableInternetConnectionTracking();

```

## Enable automatic tracking of the application installation event.

If you want to additionally track the information when your customers have installed the application, you can do so using the method:

```javascript
import PiwikPro from '@piwikpro/pwa-piwik-pro';

PiwikPro.enableInstalledTracking();

```
