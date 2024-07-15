
<a name="readmemd"></a>


# Piwik PRO Library for Nuxt

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager and the Piwik PRO tracking client in Nuxt applications.

### Installation

#### NPM

To use this package in your project, run the following command.

```
npm install @piwikpro/nuxt-piwik-pro
```

#### Basic setup

In your Nuxt Project, include `@piwikpro/nuxt-piwik-pro` as a nuxt module in `nuxt.config.ts` file. To set up the Piwik PRO Tag Manager container in the app, pass configuration object as a module inline-options. Configuration options can be found below.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  //...
  modules: [
    [
      "@piwikpro/nuxt-piwik-pro",
      {
        containerId: process.env.PIWIK_PRO_CONTAINER_ID,
        containerUrl: process.env.PIWIK_PRO_CONTAINER_URL,
      },
    ],
  ],
  //...
});
```

##### Configuration options

```ts
type ConfigOptions {
 containerId: string;
 containerUrl: string;
 dataLayerName?: string;
 nonce?: string;
}
```

##### Nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

If you want your nonce to be passed to the script, pass it as the third argument when calling the script initialization method.

#### Usage

Piwik PRO container will be initialized under the hood by `@piwikpro/nuxt-piwik-pro` module itself. Module also inject client-only plugin to Nuxt application instance which allow you to use all Piwik PRO services globally as a part of Nuxt context returned from `useNuxtApp()` composable as a `$piwikPRO`.

> [!IMPORTANT]  
> Remember that Piwik PRO is a client-only library. This means you won't have access to any of its services on the server side.

```ts
// In any component or other part of application code
const { $piwikPRO } = useNuxtApp();
// $piwikPRO won't be available on server-side code!
if (module.meta.client) {
  $piwikPRO.PageViews.trackPageView();
  $piwikPRO.GoalConversions.trackGoal(1, 100);
}
```

##### Usage with `usePiwikPro()`

To use Piwik PRO services safety, you can import `usePiwikPro()` from `'@piwikpro/nuxt-piwik-pro/composables'`.

```ts
// In any component or other part of application code
import { usePiwikPro } from "@piwikpro/nuxt-piwik-pro/composables";
// callback can be sync or async function
const userId = await usePiwikPro(({ PageViews, GoalConversions, UserManagement }) => {
  PageViews.trackPageView();
  GoalConversions.trackGoal(1, 100);
  return UserManagement.getUserId();
});
```

> [!TIP]
>
> ###### export `usePiwikPro()` as a Nuxt composable
>
> To make this composable globally available, create `.ts` file in `/composables` directory and export `usePiwikPro()` from `'@piwikpro/nuxt-piwik-pro/composables'`.
>
> ```ts
> // composables/usePiwikPro.ts
> export { usePiwikPro } from "@piwikpro/nuxt-piwik-pro/composables";
> ```
>
> ```ts
> // In any component or other part of application code
> const userId = await usePiwikPro(({ PageViews, GoalConversions, UserManagement }) => {
>   PageViews.trackPageView();
>   GoalConversions.trackGoal(1, 100);
>   return UserManagement.getUserId();
> });
> ```

##### Usage with `<ClientOnly/>` Nuxt component

Alternatively, you can wrap Component with Piwik PRO usage by `<ClientOnly/>` nuxt component.

```ts
// In client-only <WithPiwikPROUsage/> component
const { $piwikPRO } = useNuxtApp();
$piwikPRO.PageViews.trackPageView();
$piwikPRO.GoalConversions.trackGoal(1, 100);
```

```ts
// Server-side code
<template>
   <ClientOnly fallback-tag="span" fallback="Loading comments...">
       <WithPiwikPROUsage/>
   </ClientOnly>
</template>
```

##### Usage in client-only page

Or if you want use PiwikPRO services directly in Page component, you can add `client` to its file name.

```ts
// In piwik-pro.client.ts page component
const { $piwikPRO } = useNuxtApp();
$piwikPRO.PageViews.trackPageView();
$piwikPRO.GoalConversions.trackGoal(1, 100);
```

### Examples of usage

Please explore the `./example` directory to get to know how to use this package with a specific examples and it's various methods.


<a name="modulesmd"></a>



### Table of contents

#### Namespaces

- [ContentTracking](#modulescontenttrackingmd)
- [CookieManagement](#modulescookiemanagementmd)
- [CustomDimensions](#modulescustomdimensionsmd)
- [CustomEvent](#modulescustomeventmd)
- [DataLayer](#modulesdatalayermd)
- [DownloadAndOutlink](#modulesdownloadandoutlinkmd)
- [ErrorTracking](#moduleserrortrackingmd)
- [GoalConversions](#modulesgoalconversionsmd)
- [PageViews](#modulespageviewsmd)
- [SiteSearch](#modulessitesearchmd)
- [UserManagement](#modulesusermanagementmd)
- [eCommerce](#modulesecommercemd)

#### Type Aliases

- [Dimensions](#dimensions)
- [InitOptions](#initoptions)
- [PaymentInformation](#paymentinformation)
- [PiwikPROHandler](#piwikprohandler)
- [PiwikPROServicesType](#piwikproservicestype)
- [Product](#product)
- [VisitorInfo](#visitorinfo)

#### Variables

- [PiwikPRO](#piwikpro)


- [default](#default)

### Type Aliases

#### Dimensions

Ƭ **Dimensions**: `Record`\<\`dimension$\{number}\`, `string`\>

___

#### InitOptions

Ƭ **InitOptions**: `Object`

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataLayerName?` | `string` | Defaults to 'dataLayer' |
| `nonce?` | `string` | - |

___

#### PaymentInformation

Ƭ **PaymentInformation**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `discount?` | `number` \| `string` |
| `grandTotal` | `number` \| `string` |
| `orderId` | `string` |
| `shipping?` | `number` \| `string` |
| `subTotal?` | `number` \| `string` |
| `tax?` | `number` \| `string` |

___

#### PiwikPROHandler

Ƭ **PiwikPROHandler**\<`T`\>: (`piwikPRO`: [`PiwikPROServicesType`](#piwikproservicestype)) => `T` \| `Promise`\<`T`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

##### Type declaration

▸ (`piwikPRO`): `T` \| `Promise`\<`T`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `piwikPRO` | [`PiwikPROServicesType`](#piwikproservicestype) |

###### Returns

`T` \| `Promise`\<`T`\>

___

#### PiwikPROServicesType

Ƭ **PiwikPROServicesType**: typeof `PiwikPROServices`

___

#### Product

Ƭ **Product**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `brand?` | `string` |
| `category?` | `LimitedArrayFiveStrings` |
| `customDimensions?` | `Record`\<`number`, `string`\> |
| `name?` | `string` |
| `price?` | `number` |
| `quantity?` | `number` |
| `sku` | `string` |
| `variant?` | `string` |

___

#### VisitorInfo

Ƭ **VisitorInfo**: [isNew: "0" \| "1", visitorId: string, firstVisitTS: number, previousVisitCount: string \| number, currentVisitTS: number, lastVisitTS: number \| "", lastEcommerceOrderTS: number \| ""]

### Variables

#### PiwikPRO

• `Const` **PiwikPRO**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `getInitScript` | typeof `PiwikPro.getInitScript` |
| `initialize` | typeof `PiwikPro.init` |


#### default

▸ **default**(`this`, `inlineOptions`, `nuxt`): `_ModuleSetupReturn`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `void` |
| `inlineOptions` | `PluginArgs` |
| `nuxt` | `Nuxt` |

##### Returns

`_ModuleSetupReturn`


<a name="modulescontenttrackingmd"></a>


## ContentTracking

### Table of contents


- [logAllContentBlocksOnPage](#logallcontentblocksonpage)
- [trackAllContentImpressions](#trackallcontentimpressions)
- [trackContentImpression](#trackcontentimpression)
- [trackContentImpressionsWithinNode](#trackcontentimpressionswithinnode)
- [trackContentInteraction](#trackcontentinteraction)
- [trackContentInteractionNode](#trackcontentinteractionnode)
- [trackVisibleContentImpressions](#trackvisiblecontentimpressions)


#### logAllContentBlocksOnPage

▸ **logAllContentBlocksOnPage**(): `void`

Print all content blocks to the console for debugging purposes

##### Returns

`void`

___

#### trackAllContentImpressions

▸ **trackAllContentImpressions**(): `void`

Scans the entire DOM for content blocks and tracks impressions after all page
elements load. It does not send duplicates on repeated calls unless
trackPageView was called in between trackAllContentImpressions invocations

##### Returns

`void`

___

#### trackContentImpression

▸ **trackContentImpression**(`contentName`, `contentPiece`, `contentTarget`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `contentName` | `string` |
| `contentPiece` | `string` |
| `contentTarget` | `string` |

##### Returns

`void`

___

#### trackContentImpressionsWithinNode

▸ **trackContentImpressionsWithinNode**(`domNode`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `domNode` | `Node` |

##### Returns

`void`

___

#### trackContentInteraction

▸ **trackContentInteraction**(`contentInteraction`, `contentName`, `contentPiece`, `contentTarget`): `void`

Tracks manual content interaction event

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentInteraction` | `string` | Type of interaction (e.g. "click") |
| `contentName` | `string` | Name of a content block |
| `contentPiece` | `string` | Name of the content that was displayed (e.g. link to an image) |
| `contentTarget` | `string` | Where the content leads to (e.g. URL of some external website) |

##### Returns

`void`

___

#### trackContentInteractionNode

▸ **trackContentInteractionNode**(`domNode`, `contentInteraction?`): `void`

Tracks interaction with a block in domNode. Can be called from code placed in onclick attribute

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domNode` | `Node` | Node marked as content block or containing content blocks. If content block can’t be found, nothing will tracked. |
| `contentInteraction?` | `string` | Name of interaction (e.g. "click") |

##### Returns

`void`

___

#### trackVisibleContentImpressions

▸ **trackVisibleContentImpressions**(`checkOnScroll?`, `watchInterval?`): `void`

Scans DOM for all visible content blocks and tracks impressions

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `checkOnScroll?` | `boolean` | Whether to scan for visible content on scroll event |
| `watchInterval?` | `number` | Delay, in milliseconds, between scans for new visible content. Periodic checks can be disabled by passing 0 |

##### Returns

`void`


<a name="modulescookiemanagementmd"></a>


## CookieManagement

### Table of contents


- [deleteCookies](#deletecookies)
- [disableCookies](#disablecookies)
- [enableCookies](#enablecookies)
- [getConfigVisitorCookieTimeout](#getconfigvisitorcookietimeout)
- [getCookieDomain](#getcookiedomain)
- [getCookiePath](#getcookiepath)
- [getSessionCookieTimeout](#getsessioncookietimeout)
- [hasCookies](#hascookies)
- [setCookieDomain](#setcookiedomain)
- [setCookieNamePrefix](#setcookienameprefix)
- [setCookiePath](#setcookiepath)
- [setReferralCookieTimeout](#setreferralcookietimeout)
- [setSecureCookie](#setsecurecookie)
- [setSessionCookieTimeout](#setsessioncookietimeout)
- [setVisitorCookieTimeout](#setvisitorcookietimeout)
- [setVisitorIdCookie](#setvisitoridcookie)


#### deleteCookies

▸ **deleteCookies**(): `void`

Deletes existing tracking cookies on the next page view

##### Returns

`void`

___

#### disableCookies

▸ **disableCookies**(): `void`

Disables all first party cookies. Existing cookies will be deleted in the next page view

##### Returns

`void`

___

#### enableCookies

▸ **enableCookies**(): `void`

Enables all first party cookies. Cookies will be created on the next tracking request

##### Returns

`void`

___

#### getConfigVisitorCookieTimeout

▸ **getConfigVisitorCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of visitor cookies (in milliseconds)

##### Returns

`Promise`\<`number`\>

___

#### getCookieDomain

▸ **getCookieDomain**(): `Promise`\<`string`\>

Returns domain of the analytics tracking cookies (set with setCookieDomain()).

##### Returns

`Promise`\<`string`\>

___

#### getCookiePath

▸ **getCookiePath**(): `Promise`\<`string`\>

Returns the analytics tracking cookies path

##### Returns

`Promise`\<`string`\>

___

#### getSessionCookieTimeout

▸ **getSessionCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of session cookies

##### Returns

`Promise`\<`number`\>

___

#### hasCookies

▸ **hasCookies**(): `Promise`\<`boolean`\>

Returns true if cookies are enabled in this browser

##### Returns

`Promise`\<`boolean`\>

___

#### setCookieDomain

▸ **setCookieDomain**(`domain`): `void`

Sets the domain for the analytics tracking cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

##### Returns

`void`

___

#### setCookieNamePrefix

▸ **setCookieNamePrefix**(`prefix`): `void`

Sets the prefix for analytics tracking cookies. Default is "_pk_".

##### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

##### Returns

`void`

___

#### setCookiePath

▸ **setCookiePath**(`path`): `void`

Sets the analytics tracking cookies path

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

##### Returns

`void`

___

#### setReferralCookieTimeout

▸ **setReferralCookieTimeout**(`seconds`): `void`

Sets the expiration time of referral cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `seconds` | `number` |

##### Returns

`void`

___

#### setSecureCookie

▸ **setSecureCookie**(`secure`): `void`

Toggles the secure cookie flag on all first party cookies (if you are using HTTPS)

##### Parameters

| Name | Type |
| :------ | :------ |
| `secure` | `boolean` |

##### Returns

`void`

___

#### setSessionCookieTimeout

▸ **setSessionCookieTimeout**(`seconds`): `void`

Sets the expiration time of session cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `seconds` | `number` |

##### Returns

`void`

___

#### setVisitorCookieTimeout

▸ **setVisitorCookieTimeout**(`seconds`): `void`

Sets the expiration time of visitor cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `seconds` | `number` |

##### Returns

`void`

___

#### setVisitorIdCookie

▸ **setVisitorIdCookie**(): `void`

Sets cookie containing [analytics ID](https://developers.piwik.pro/en/latest/glossary.html#term-analytics-id) in browser

##### Returns

`void`


<a name="modulescustomdimensionsmd"></a>


## CustomDimensions

### Table of contents


- [deleteCustomDimension](#deletecustomdimension)
- [getCustomDimensionValue](#getcustomdimensionvalue)
- [setCustomDimensionValue](#setcustomdimensionvalue)


#### deleteCustomDimension

▸ **deleteCustomDimension**(`customDimensionId`): `void`

Removes a custom dimension with the specified ID.

##### Parameters

| Name | Type |
| :------ | :------ |
| `customDimensionId` | `string` \| `number` |

##### Returns

`void`

___

#### getCustomDimensionValue

▸ **getCustomDimensionValue**(`customDimensionId`): `Promise`\<`string` \| `undefined`\>

Returns the value of a custom dimension with the specified ID.

##### Parameters

| Name | Type |
| :------ | :------ |
| `customDimensionId` | `string` \| `number` |

##### Returns

`Promise`\<`string` \| `undefined`\>

___

#### setCustomDimensionValue

▸ **setCustomDimensionValue**(`customDimensionId`, `customDimensionValue`): `void`

Sets a custom dimension value to be used later.

##### Parameters

| Name | Type |
| :------ | :------ |
| `customDimensionId` | `string` \| `number` |
| `customDimensionValue` | `string` |

##### Returns

`void`


<a name="modulescustomeventmd"></a>


## CustomEvent

### Table of contents


- [trackEvent](#trackevent)


#### trackEvent

▸ **trackEvent**(`category`, `action`, `name?`, `value?`, `dimensions?`): `void`

Tracks a custom event, e.g. when a visitor interacts with the page

##### Parameters

| Name | Type |
| :------ | :------ |
| `category` | `string` |
| `action` | `string` |
| `name?` | `string` |
| `value?` | `number` |
| `dimensions?` | [`Dimensions`](#dimensions) |

##### Returns

`void`


<a name="modulesdatalayermd"></a>


## DataLayer

### Table of contents

#### Type Aliases

- [DataLayerEntry](#datalayerentry)


- [push](#push)
- [setDataLayerName](#setdatalayername)

### Type Aliases

#### DataLayerEntry

Ƭ **DataLayerEntry**: `Record`\<`string`, `AnyData`\>


#### push

▸ **push**(`data`): `number`

Adds entry to a data layer

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DataLayerEntry`](#datalayerentry) |

##### Returns

`number`

___

#### setDataLayerName

▸ **setDataLayerName**(`name`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

##### Returns

`void`


<a name="modulesdownloadandoutlinkmd"></a>


## DownloadAndOutlink

### Table of contents


- [addDownloadExtensions](#adddownloadextensions)
- [enableLinkTracking](#enablelinktracking)
- [getLinkTrackingTimer](#getlinktrackingtimer)
- [removeDownloadExtensions](#removedownloadextensions)
- [setDownloadClasses](#setdownloadclasses)
- [setDownloadExtensions](#setdownloadextensions)
- [setIgnoreClasses](#setignoreclasses)
- [setLinkClasses](#setlinkclasses)
- [setLinkTrackingTimer](#setlinktrackingtimer)
- [trackLink](#tracklink)


#### addDownloadExtensions

▸ **addDownloadExtensions**(`extensions`): `void`

Adds new extensions to the download extensions list

##### Parameters

| Name | Type |
| :------ | :------ |
| `extensions` | `string`[] |

##### Returns

`void`

___

#### enableLinkTracking

▸ **enableLinkTracking**(`trackAlsoMiddleAndRightClicks?`): `void`

Enables automatic link tracking. If called with `true`, left, right and
middle clicks on links will be treated as opening a link. Opening a links to
an external site (different domain) creates an outlink event. Opening a link
to a downloadable file creates a download event

##### Parameters

| Name | Type |
| :------ | :------ |
| `trackAlsoMiddleAndRightClicks?` | `boolean` |

##### Returns

`void`

___

#### getLinkTrackingTimer

▸ **getLinkTrackingTimer**(): `Promise`\<`number`\>

Returns lock/wait time after a request set by setLinkTrackingTimer

##### Returns

`Promise`\<`number`\>

___

#### removeDownloadExtensions

▸ **removeDownloadExtensions**(`extensions`): `void`

Removes extensions from the download extensions list

##### Parameters

| Name | Type |
| :------ | :------ |
| `extensions` | `string`[] |

##### Returns

`void`

___

#### setDownloadClasses

▸ **setDownloadClasses**(`classes`): `void`

Sets a list of class names that indicate whether a list is a download and not an outlink

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string`[] |

##### Returns

`void`

___

#### setDownloadExtensions

▸ **setDownloadExtensions**(`extensions`): `void`

Overwrites the list of file extensions indicating that a link is a download

##### Parameters

| Name | Type |
| :------ | :------ |
| `extensions` | `string`[] |

##### Returns

`void`

___

#### setIgnoreClasses

▸ **setIgnoreClasses**(`classes`): `void`

Set a list of class names that indicate a link should not be tracked

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string`[] |

##### Returns

`void`

___

#### setLinkClasses

▸ **setLinkClasses**(`classes`): `void`

Sets a list of class names that indicate whether a link is an outlink and not download

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string`[] |

##### Returns

`void`

___

#### setLinkTrackingTimer

▸ **setLinkTrackingTimer**(`time`): `void`

When a visitor produces an events and closes the page immediately afterwards,
e.g. when opening a link, the request might get cancelled. To avoid loosing
the last event this way, JavaScript Tracking Client will lock the page for a
fraction of a second (if wait time hasn’t passed), giving the request time to
reach the Collecting & Processing Pipeline

##### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

##### Returns

`void`

___

#### trackLink

▸ **trackLink**(`url`, `linkType`, `dimensions?`, `callback?`): `void`

Manually tracks outlink or download event with provided values

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `linkType` | `string` |
| `dimensions?` | [`Dimensions`](#dimensions) |
| `callback?` | () => `void` |

##### Returns

`void`


<a name="moduleserrortrackingmd"></a>


## ErrorTracking

### Table of contents


- [enableJSErrorTracking](#enablejserrortracking)
- [trackError](#trackerror)


#### enableJSErrorTracking

▸ **enableJSErrorTracking**(`unique?`): `void`

Enables tracking of unhandled JavaScript errors.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unique?` | `boolean` | track only unique errors |

##### Returns

`void`

___

#### trackError

▸ **trackError**(`error`): `void`

Attempts to send error tracking request using same format as native errors caught by enableJSErrorTracking().
Such error request will still follow rules set for tracker, so it will be sent only when JS error tracking is enabled
([enableJSErrorTracking](#enablejserrortracking) function was called before this attempt). It will also respect rules for tracking only unique errors.

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

##### Returns

`void`


<a name="modulesgoalconversionsmd"></a>


## GoalConversions

### Table of contents


- [trackGoal](#trackgoal)


#### trackGoal

▸ **trackGoal**(`goalId`, `conversionValue`, `dimensions?`): `void`

Tracks manual goal conversion

##### Parameters

| Name | Type |
| :------ | :------ |
| `goalId` | `string` \| `number` |
| `conversionValue` | `number` |
| `dimensions?` | [`Dimensions`](#dimensions) |

##### Returns

`void`


<a name="modulespageviewsmd"></a>


## PageViews

### Table of contents


- [trackPageView](#trackpageview)


#### trackPageView

▸ **trackPageView**(`customPageTitle?`): `void`

Tracks a visit on the page that the function was run on

##### Parameters

| Name | Type |
| :------ | :------ |
| `customPageTitle?` | `string` |

##### Returns

`void`


<a name="modulessitesearchmd"></a>


## SiteSearch

### Table of contents


- [trackSiteSearch](#tracksitesearch)


#### trackSiteSearch

▸ **trackSiteSearch**(`keyword`, `category?`, `searchCount?`, `dimensions?`): `void`

Tracks search requests on a website

##### Parameters

| Name | Type |
| :------ | :------ |
| `keyword` | `string` |
| `category?` | `string` |
| `searchCount?` | `number` |
| `dimensions?` | [`Dimensions`](#dimensions) |

##### Returns

`void`


<a name="modulesusermanagementmd"></a>


## UserManagement

### Table of contents


- [getUserId](#getuserid)
- [getVisitorId](#getvisitorid)
- [getVisitorInfo](#getvisitorinfo)
- [resetUserId](#resetuserid)
- [setUserId](#setuserid)


#### getUserId

▸ **getUserId**(): `Promise`\<`string`\>

The function that will return user ID

##### Returns

`Promise`\<`string`\>

___

#### getVisitorId

▸ **getVisitorId**(): `Promise`\<`string`\>

Returns 16-character hex ID of the visitor

##### Returns

`Promise`\<`string`\>

___

#### getVisitorInfo

▸ **getVisitorInfo**(): `Promise`\<[`VisitorInfo`](#visitorinfo)\>

Returns visitor information in an array

##### Returns

`Promise`\<[`VisitorInfo`](#visitorinfo)\>

___

#### resetUserId

▸ **resetUserId**(): `void`

Clears previously set userID, e.g. when visitor logs out

##### Returns

`void`

___

#### setUserId

▸ **setUserId**(`userId`): `void`

User ID is an additional parameter that allows you to aggregate data. When
set up, you will be able to search through sessions by this parameter, filter
reports through it or create Multi attribution reports using User ID

##### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

##### Returns

`void`


<a name="modulesecommercemd"></a>


## eCommerce

### Table of contents


- [addEcommerceItem](#addecommerceitem)
- [clearEcommerceCart](#clearecommercecart)
- [ecommerceAddToCart](#ecommerceaddtocart)
- [ecommerceCartUpdate](#ecommercecartupdate)
- [ecommerceOrder](#ecommerceorder)
- [ecommerceProductDetailView](#ecommerceproductdetailview)
- [ecommerceRemoveFromCart](#ecommerceremovefromcart)
- [getEcommerceItems](#getecommerceitems)
- [removeEcommerceItem](#removeecommerceitem)
- [setEcommerceView](#setecommerceview)
- [trackEcommerceCartUpdate](#trackecommercecartupdate)
- [trackEcommerceOrder](#trackecommerceorder)


#### addEcommerceItem

▸ **addEcommerceItem**(`productSKU`, `productName`, `productCategory`, `productPrice`, `productQuantity`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `productSKU` | `string` |
| `productName` | `string` |
| `productCategory` | `string` \| `string`[] |
| `productPrice` | `number` |
| `productQuantity` | `number` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceAddToCart instead.

___

#### clearEcommerceCart

▸ **clearEcommerceCart**(): `void`

##### Returns

`void`

**`Deprecated`**

___

#### ecommerceAddToCart

▸ **ecommerceAddToCart**(`products`): `void`

Tracks action of adding products to a cart

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |

##### Returns

`void`

___

#### ecommerceCartUpdate

▸ **ecommerceCartUpdate**(`products`, `grandTotal`): `void`

Tracks current state of a cart

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `grandTotal` | `string` \| `number` |

##### Returns

`void`

___

#### ecommerceOrder

▸ **ecommerceOrder**(`products`, `paymentInformation`): `void`

Tracks conversion, including products and payment details

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `paymentInformation` | [`PaymentInformation`](#paymentinformation) |

##### Returns

`void`

___

#### ecommerceProductDetailView

▸ **ecommerceProductDetailView**(`products`): `void`

Tracks action of viewing product page

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |

##### Returns

`void`

___

#### ecommerceRemoveFromCart

▸ **ecommerceRemoveFromCart**(`products`): `void`

Tracks action of removing a products from a cart

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |

##### Returns

`void`

___

#### getEcommerceItems

▸ **getEcommerceItems**(): `Promise`\<`object`\>

##### Returns

`Promise`\<`object`\>

**`Deprecated`**

___

#### removeEcommerceItem

▸ **removeEcommerceItem**(`productSKU`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `productSKU` | `string` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceRemoveFromCart instead.

___

#### setEcommerceView

▸ **setEcommerceView**(`productSKU`, `productName?`, `productCategory?`, `productPrice?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `productSKU` | `string` |
| `productName?` | `string` |
| `productCategory?` | `string`[] |
| `productPrice?` | `string` |

##### Returns

`void`

**`Deprecated`**

___

#### trackEcommerceCartUpdate

▸ **trackEcommerceCartUpdate**(`cartAmount`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cartAmount` | `number` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceCartUpdate instead.

___

#### trackEcommerceOrder

▸ **trackEcommerceOrder**(`orderId`, `orderGrandTotal`, `orderSubTotal?`, `orderTax?`, `orderShipping?`, `orderDiscount?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |
| `orderGrandTotal` | `number` |
| `orderSubTotal?` | `number` |
| `orderTax?` | `number` |
| `orderShipping?` | `number` |
| `orderDiscount?` | `number` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceOrder instead.
