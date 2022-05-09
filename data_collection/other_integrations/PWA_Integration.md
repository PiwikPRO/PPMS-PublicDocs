# Progressive Web Applications integration

If you're building an application that works offline, then understanding how users are interacting with your app when they don't have connectivity is crucial to optimizing that experience.

Analytics providers like Piwik PRO typically require a network connection to send data to their servers, which means if connectivity is unavailable, those requests will fail and those interactions will be missing from your analytics reports. It'll be like they never happened.

Our integration with Progressive Web Applications solves this problem for Piwik PRO users by leveraging Service Worker's ability to detect failed requests.

Piwik PRO receives all data via HTTP requests to the Analytics, which means a Service Worker script can add a fetch handler to detect failed requests sent to the Analytics. It can store these requests in IndexedDB and then retry them later once connectivity is restored.

The PWA module for Piwik PRO does exactly this. It also adds fetch handlers to cache the ppms.js and the container scripts, so they can also be run offline. Lastly, when failed requests are retried, the module also automatically sets (or updates) the `cdt` in the request payload to ensure timestamps in Piwik PRO reflect the time of the original user interaction.

## Enabling the Piwik PRO module for Progressive web applications

To enable collecting data from your PWAs using Piwik PRO Analytics, call the initialize() method in your service worker:

```javascript
import PiwikPro from '@piwikpro/pwa-piwik-pro';

PiwikPro.initialize({
    containerURL: 'example.com',
    containerId: '12345678-1234-1234-1234-1234567890ab'
});
```

This is all that's required to queue and retry failed requests to Piwik PRO, and it's the simplest way to get Piwik PRO working offline.

However, if using only the code above, the retried requests are indistinguishable from requests that succeed on the first try. This means you'll receive all the interaction data from offline users, but you won't be able to tell which interactions occurred while the user was offline.

To address this concern, you can use one of the optional methods described below.



## Enable automatic tracking of the status of the user's Internet connection

If you want to be able to differentiate retried requests from non-retried requests, you can use a command that will start automatic tracing of the internet connection status. With this solution, when the internet is lost, a Custom Event will be generated containing information about the status of the internet connection.

In your application, include the default PiwikPro object in the highest level application module. ie `index`.

```javascript
import PiwikPro from '@piwikpro/pwa-piwik-pro';

PiwikPro.enableInternetConnectionTracking();
```

## Enable automatic tracking of the app install event

If you want to additionally track as a Custom Event the information about when your customers have installed the application, you can do so using the method:

```javascript
import PiwikPro from '@piwikpro/pwa-piwik-pro';

PiwikPro.enableInstallTracking();
```
