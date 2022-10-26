# Piwik PRO Library for Next.js

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager and the Piwik PRO tracking client in Next.js applications.

- [Installation](#installation)
  - [NPM](#npm)
  - [Basic setup](#basic-setup)
  - [Setup with nonce](#setup-with-nonce)
- [Supported methods list and usage](#supported-methods-list-and-usage)
  - [Analytics](#analytics)
    - [Page views](#send-page-views-and-virtual-page-views)
    - [User Management](#user-management)
    - [Custom Events](#custom-events)
    - [Site search](#site-search)
    - [E-commerce](#e-commerce)
    - [Content Tracking](#content-tracking)
    - [Downloads and outlinks](#downloads-and-outlinks)
    - [Goal Conversions](#goal-conversions)
    - [Custom Dimensions](#custom-dimensions)
  - [Tag Manager](#tag-manager)
    - [Data layer](#data-layer)

## Installation

To use this package in your project, run the following command.

### npm

``` sh
npm install @piwikpro/next-piwik-pro
```

### Yarn

``` sh
yarn add @piwikpro/next-piwik-pro
```

### Basic setup

In your Next.js Project, include the default `PiwikProProvider` in the `_app.tsx` file. To set up the Piwik PRO Tag Manager container in the app, include the initialization code in your `App`.

In the arguments, pass your account name and your container id as parameters (marked 'accountName' and 'containerId' in the example below).

#### \_app.tsx

```ts
import PiwikProProvider from '@piwikpro/next-piwik-pro'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PiwikProProvider
        accountName='accountName'
        containerId='43e4bca4-e220-43df-acfc-40fef7e25105'
      >
        <Component {...pageProps} />
      </PiwikProProvider>
    </>
  )
}
```

### Setup with environmental variables

If you plan to use environmental variables to config your Piwik account you can do it with adding them to your `.env` file. Remember that variables to be visible in component need to be named with `NEXT_PUBLIC_` prefix, in other cases they will be visible only in Node context but not in Next.

#### .env

``` sh
NEXT_PUBLIC_ACCOUNT_NAME=accountName
NEXT_PUBLIC_CONTAINER_ID=43e4bca4-e220-43df-acfc-40fef7e25105
```

#### \_app.tsx

```ts
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PiwikProProvider
        accountName={process.env.NEXT_PUBLIC_ACCOUNT_NAME}
        containerId={process.env.NEXT_PUBLIC_CONTAINER_ID}
      >
        <Component {...pageProps} />
      </PiwikProProvider>
    </>
  )
}
```

### Setup with nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

If you want your nonce to be passed to the script, pass it as the third argument when calling the script initialization method.

#### \_app.tsx

```ts
import PiwikProProvider from '@piwikpro/next-piwik-pro'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PiwikProProvider
        accountName='accountName'
        containerId='43e4bca4-e220-43df-acfc-40fef7e25105'
        nonce='nonce-string'
      >
        <Component {...pageProps} />
      </PiwikProProvider>
    </>
  )
}
```

## Supported methods list and usage

To use methods in your page you need to include `usePiwikPro` from the library.

```ts
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
```

Then you need to define modules you want to use and initialize it from previously included `usePiwikPro` context. In example below you can see the initialization of the `PageViews` module.

```ts
const { PageViews } = usePiwikPro()
```

You can use those methods in all hooks and props for ex. `useEffect` or `onClick`.

### useEffect

```ts
useEffect(() => {
  PageViews.trackPageView('optional title')
}, [])
```

### onClick

```ts
<button
  onClick={() => {
    CustomEvent.trackEvent('Post', pageData.title)
  }}
>
  CustomEvent.trackEvent button
</button>
```

Below you can view the sample usage of the avialable methods from modules.

### Analytics

#### Send page views and virtual page views

```ts
const { PageViews } = usePiwikPro()

PageViews.trackPageView('optional title')
```

#### User management

Collection of methods to handle users and visitors data through the Piwik PRO API.

##### Methods

- `UserManagement.setUserId(userID)` - Sets user ID, which will help identify a user of your application across many devices and browsers.
  - `userID` (string) – Required Non-empty, unique ID of a user in application
- `UserManagement.resetUserId()` - Clears previously set `userID`, e.g. when visitor logs out.
- `UserManagement.getUserId()` - Returns currently used `userID` value (set with `setUserId()`).
- `UserManagement.getVisitorId()` - Returns 16-character hex ID of the visitor.
- `UserManagement.getVisitorInfo()` - Returns visitor information. Return type `string[]`. String array with the following visitor info:
  - `[0]` - new visitor flag indicating new, ("1") or returning ("0") visitor
  - `[1]` - visitor ID (16-character hex number)
  - `[2]` - first visit timestamp (UNIX epoch time)
  - `[3]` - previous visit count ("0" for first visit)
  - `[4]` - current visit timestamp (UNIX epoch time)
  - `[5]` - last visit timestamp (UNIX epoch time or "" if N/A)
  - `[6]` - last e-commerce order timestamp (UNIX epoch time or "" if N/A)

##### Example usage

```ts
const { UserManagement } = usePiwikPro()

UserManagement.setUserId('UserId')

UserManagement.resetUserId()
```

Some of the methods are getting data from the API and they need to be called asynchronously. They provide data that can be shown on the page. This need to be done with defining async function in your hook body and setting the state of the variable. Like on example below.

```ts
const { UserManagement } = usePiwikPro()

const [userId, setUserId] = useState<string>('')
const [visitorId, setVisitorId] = useState<string>('')
const [visitorInfo, setVisitorInfo] = useState<any>('')

const callAsyncMethods = async () => {
  const uId = await UserManagement.getUserId()
  setUserId(uId)

  const vId = await UserManagement.getVisitorId()
  setVisitorId(vId)

  const vInfo = await UserManagement.getVisitorInfo()
  setVisitorInfo(vInfo)
}

callAsyncMethods()
```

You have access to those variables in you page body. Example access below.

```html
<p><code>UserManamement.getUserId()</code> - {userId}</p>
<p><code>UserManamement.getVisitorId()</code> - {visitorId}</p>
<p>
  <code>UserManamement.getVisitorInfo()</code> -{' '}
  {JSON.stringify(visitorInfo)}
</p>
```

#### Custom Events

Collection of methods to handle custom events, not described in the other categories.

##### Methods

- `CustomEvent.trackEvent(category, action[, name[, value[, dimensions]]])` - Tracks custom event, e.g. when visitor interacts with the page.
  - `category (string)` – Required Event category
  - `action (string)` – Required Event action
  - `name (string)` – Optional Event name
  - `value (number)` – Optional Event value

##### Example usage

```ts
const { CustomEvent } = usePiwikPro()

CustomEvent.trackEvent('Post', pageData.title)
```

#### Site search

Collection of methods to track site search data, through the Piwik PRO API.

##### Methods

- `SiteSearch.trackSiteSearch(keyword[, category[, resultCount[, dimensions]]])` - Tracks search requests on a website.
  - `keyword (string)` – Required What keyword the visitor entered into the search box
  - `category (string|Array<string>)` – Optional Category selected in the search engine
  - `searchCount (number)` – Optional The number of search results shown
  - `dimensions (object)` – Optional Custom dimensions to pass along with the site search event

##### Example usage

```ts
const { SiteSearch } = usePiwikPro()

SiteSearch.trackSiteSearch('keyword', 'category', 5)
```

#### E-commerce

Collection of methods to handle e-commerce events through the Piwik PRO API.

##### Methods

- `eCommerce.addEcommerceItem(productSKU[, productName[, productCategory[, productPrice[, productQuantity]]]])` - Adds a product to a virtual shopping cart. If a product with the same SKU is in the cart, it will be removed first. Does not send any data to the Collecting & Processing Pipeline.

  - `productSKU (string)` – Required Product stock-keeping unit
  - `productName (string)` – Optional Product name
  - `productCategory (string|Array<string>)` – Optional Product category or an array of up to 5 categories
  - `productPrice (number)` – Optional Product price
  - `productQuantity (number)` – Optional The number of units

- `eCommerce.removeEcommerceItem(productSKU)` - Removes a product with the provided SKU from a virtual shopping cart. If multiple units of that product are in the virtual cart, all of them will be removed. Does not send any data to the Collecting & Processing Pipeline.

  - `productSKU (string)` – Required stock-keeping unit of a product to remove

- `eCommerce.clearEcommerceCart()` - Removes all items from a virtual shopping cart. Does not send any data to the Collecting & Processing Pipeline.

- `eCommerce.getEcommerceItems()` - Returns a copy of items from a virtual shopping cart. Does not send any data to the Collecting & Processing Pipeline. Returns: Object containing all tracked items (format: `Object<productSKU, Array[productSKU, productName, productCategory, price, quantity]>`)

- `eCommerce.setEcommerceView([productSKU[, productName[, productCategory[, productPrice]]]])` - Tracks product or category view. Must be followed by a page view.

  - `productSKU (string)` – Optional Product stock-keeping unit
  - `productName (string)` – Optional Product name
  - `productCategory (string|Array<string>)` – Optional Category or an array of up to 5 categories
  - `productPrice (number)` – Optional Product price

- `eCommerce.trackEcommerceCartUpdate(cartAmount)` - Tracks items present in a virtual shopping cart (registered with addEcommerceItem).

  - `cartAmount` (number) – Required The total value of items in the cart

- `eCommerce.trackEcommerceOrder(orderID, orderGrandTotal[, orderSubTotal[, orderTax[, orderShipping[, orderDiscount]]]])` - Tracks a successfully placed e-commerce order with items present in a virtual cart (registered using addEcommerceItem).
  - `orderID (string)` – Required String uniquely identifying an order
  - `orderGrandTotal (number)` – Required Order Revenue grand total - tax, shipping and discount included
  - `orderSubTotal (number)`– Optional Order subtotal - without shipping
  - `orderTax (number)`– Optional Order tax amount
  - `orderShipping (number)` – Optional Order shipping cost
  - `orderDiscount (number)` – Optional Order discount amount

##### Example usage

```ts
const { eCommerce } = usePiwikPro()

eCommerce.addEcommerceItem('1', 'ProductName', 'Items', 69, 1)

eCommerce.removeEcommerceItem('1')

eCommerce.trackEcommerceOrder('id', 50)

eCommerce.trackEcommerceCartUpdate(2)

eCommerce.setEcommerceView('1')

eCommerce.clearEcommerceCart()
```

Some of the methods are getting data from the API and they need to be called asynchronously. They provide data that can be shown no the page. This need to be done with defining async function in your hook body and setting the state of the variable. Like on example below.

```ts
const { eCommerce } = usePiwikPro()

const [eCommerceItems, setECommerceInfo] = useState<any>('')

const callAsyncMethods = async () => {
  const ecItem = await eCommerce.getEcommerceItems()
  setECommerceInfo(ecItem)
}

callAsyncMethods()
```

You have access to those variables in you page body. Example below.

```html
<p>
  <code>eCommerce.getEcommerceItems()</code> -{' '}
  {JSON.stringify(eCommerceItems)}
</p>
```

#### Content Tracking

Collection of methods to track impressions through the Piwik PRO API.

##### Methods

- `ContentTracking.trackContentImpression(contentName, contentPiece, contentTarget)` - Tracks manual content impression event.

  - `contentName (string)` – Required Name of a content block
  - `contentPiece (string)` – Required Name of the content that was displayed (e.g. link to an image)
  - `contentTarget (string)` – Required Where the content leads to (e.g. URL of some external website)

- `ContentTracking.trackContentInteraction(contentInteraction, contentName, contentPiece, contentTarget)` - Tracks manual content interaction event.
  - `contentInteraction (string)` – Required Type of interaction (e.g. "click")
  - `contentName (string)` – Required Name of a content block
  - `contentPiece` (string) – Required Name of the content that was displayed (e.g. link to an image)
  - `contentTarget (string)` – Required Where the content leads to (e.g. URL of some external website)

##### Example usage

```ts
const { ContentTracking } = usePiwikPro()

ContentTracking.trackContentImpression(
  'contentName',
  'contentPiece',
  'contentTarget'
)

ContentTracking.trackContentInteraction(
  'contentInteracion',
  'contentName',
  'contentPiece',
  'contentTarget'
)
```

#### Downloads and outlinks

Collection of methods to manually tracks outlink or download events through the Piwik PRO API.

##### Methods

- `DownloadAndOutlink.trackLink(linkAddress, linkType[, dimensions[, callback]])` - Manually tracks outlink or download event with provided values.

  - `linkAddress (string)` – Required URL address of the link
  - `linkType (string)` – Required Type of the link, "link" for outlink, "download" for download
  - `dimensions (object)` – Optional Custom dimensions to pass along with the link event
  - `callback (function)` – Optional Function that should be called after tracking the link

- `DownloadAndOutlink.enableLinkTracking([trackMiddleAndRightClicks])` - Enables automatic link tracking. By default, left, right and middle clicks on links will be treated as opening a link. Opening a link to an external site (different domain) creates an outlink event. Opening a link to a downloadable file creates a download event.

  - `trackMiddleAndRightClicks (boolean)` – Optional Whether to treat middle and right clicks as opening a link. The default value is true.

- `DownloadAndOutlink.setLinkClasses(classes)` - Sets a list of class names that indicate whether a link is an outlink and not download.

  - `classes (Array<string>)` – Required CSS class name or an array of class names

- `DownloadAndOutlink.setDownloadClasses(classes)` - Sets a list of class names that indicate whether a list is a download and not an outlink.

  - `classes (Array<string>)` – Required CSS class name or an array of class names

- `DownloadAndOutlink.addDownloadExtensions(extensions)`
  Adds new extensions to the download extensions list.

  - `extensions (Array<string>)` – Required List of extensions to be added as an array, e.g. `["7z","apk","mp4"]`.

- `DownloadAndOutlink.removeDownloadExtensions(extensions)` - Removes extensions from the download extensions list.

  - `extensions (Array<string>)` – Required List of extensions to remove as an array, e.g. ["zip", "rar"].

- `DownloadAndOutlink.setLinkTrackingTimer(milliseconds)` - When a visitor produces an events and closes the page immediately afterwards, e.g. when opening a link, the request might get cancelled. To avoid loosing the last event this way, JavaScript Tracking Client will lock the page for a fraction of a second (if wait time hasn’t passed), giving the request time to reach the Collecting & Processing Pipeline. `setLinkTrackingTimer` allows to change the default lock/wait time of 500ms.

  - `milliseconds (number)` – Required How many milliseconds a request needs to reach the Collecting & Processing Pipeline.

- `DownloadAndOutlink.setIgnoreClasses(classes)` - Set a list of class names that indicate a link should not be tracked.
  - `classes (Array<string>)` – Required CSS class name or an array of class names

##### Example usage

```ts
const { DownloadAndOutlink } = usePiwikPro()

DownloadAndOutlink.trackLink('http://localhost:3000', 'link')

DownloadAndOutlink.enableLinkTracking(true)

DownloadAndOutlink.setLinkClasses(['this-is-an-outlink'])

DownloadAndOutlink.setDownloadClasses(['this-is-a-download'])

DownloadAndOutlink.addDownloadExtensions(['zip', 'rar'])

DownloadAndOutlink.removeDownloadExtensions(['doc', 'xls'])

DownloadAndOutlink.setLinkTrackingTimer(10)

DownloadAndOutlink.setIgnoreClasses(['do-not-track'])
```

Some of the methods are getting data from the API and they need to be called asynchronously. They provide data that can be shown no the page. This need to be done with defining async function in your hook body and setting the state of the variable. Like on example below.

```ts
const { DownloadAndOutlink } = usePiwikPro()

const [linkTrackingTimer, setLinkTrackingTimer] = useState<string>('')

const callAsyncMethods = async () => {
  const lTrackingTimer = await DownloadAndOutlink.getLinkTrackingTimer()
  setLinkTrackingTimer(lTrackingTimer)
}
```

You have access to those variables in you page body. Example below.

```html
<p>
  <code>DownloadAndOutlink.getLinkTrackingTimer()</code> -{' '}
  {linkTrackingTimer}
</p>
```

#### Goal Conversions

Collection of methods to manually tracks goal conversions through the Piwik PRO API.

##### Methods

- `GoalConversions.trackGoal(goalID[, conversionValue[, dimensions]])` - Tracks manual goal conversion. `goalID (number|string)` – Required Goal ID (integer or UUID), `conversionValue (number)` – Optional Conversion value (revenue), `dimensions (object)` – Optional Custom dimensions to pass along with the conversion

##### Example usage

```ts
const { GoalConversions } = usePiwikPro()

// function trackGoal(goalId: string | number, conversionValue: number, dimensions?: Object | undefined): void
GoalConversions.trackGoal(1, 30)
```

#### Custom Dimensions

Collection of methods to manage custom dimentsions through the Piwik PRO API.

##### Methods

- `CustomDimensions.setCustomDimensionValue(customDimensionID, customDimensionValue` - Sets a custom dimension to be used later.

  - `customDimensionID (number)` – Required ID of a custom dimension, `customDimensionValue (string)` – Required Value of a custom dimension

- `CustomDimensions.deleteCustomDimension(customDimensionID)` - Removes a custom dimension with the specified ID.

  - `customDimensionID (number)` – Required ID of a custom dimension

- `CustomDimensions.getCustomDimensionValue(customDimensionID)`- Returns the value of a custom dimension with the specified ID. Returns: Value set with `setCustomDimensionValue` (e.g. `loginStatus`). Return type: `string`
  - `customDimensionID (number)`– Required ID of a custom dimension.

##### Example usage

```ts
const { CustomDimensions } = usePiwikPro()

CustomDimensions.setCustomDimensionValue('customDimensionId', 'value')

CustomDimensions.getCustomDimensionValue('customDimensionId')

CustomDimensions.deleteCustomDimension('customDimensionId')
```

Some of the methods are getting data from the API and they need to be called asynchronously. They provide data that can be shown on the page. This need to be done with defining async function in your hook body and setting the state of the variable. Like on example below.

```ts
const { UserManagement } = usePiwikPro()

const [customDimValue, setCustomDimValue] = useState<string>('')

const callAsyncMethods = async () => {
  const cDimValue = await CustomDimensions.getCustomDimensionValue(12)
  setCustomDimValue(cDimValue)
}

callAsyncMethods()
```

You have access to those variables in you page body. Example access below.

```html
<p>
  <code>CustomDimensions.getCustomDimensionValue()</code> - {customDimValue}
</p>
```

### Tag Manager

#### Data layer

A data layer is a data structure on your site or app where you can store data and access it with tools like Tag Manager. You can include any data you want in your data layer.

##### Methods

- `DataLayer.push(data)` - Adds an event to a data layer.
  - `data` - Required data value without type.

##### Example usage

```ts
const { DataLayer } = usePiwikPro()

DataLayer.push('data')
```
