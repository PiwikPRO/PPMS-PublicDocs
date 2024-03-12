# Piwik PRO Library for VUE

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager and the Piwik PRO tracking client in VUE applications.

* [Installation](#installation)
  * [NPM](#npm)
  * [Basic setup](#basic-setup)
  * [Setup with nonce](#setup-with-nonce)

## Installation

### NPM

To use this package in your project, run the following command.

```
npm install @piwikpro/vue-piwik-pro
```


### Basic setup

In your Vue Project, include the default `PiwikPro` in the highest level application module. ie `main`. To set up the Piwik PRO Tag Manager container in the app, the easiest way is to call the `PiwikPro.initialize()` method. `PiwikPro.initialize()` must be initialized using this function before any of the other tracking functions will record any data.

In the arguments, pass your app ID and your account URL as parameters (marked 'container-id' and 'container-url' in the example below).

```ts
// main.ts
import VuePiwikPro from '@piwikpro/vue-piwik-pro'

VuePiwikPro.initialize(
  import.meta.env.VITE_PIWIK_PRO_CONTAINER_ID as string,
  import.meta.env.VITE_PIWIK_PRO_CONTAINER_URL as string
)
```

### Setup with nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

If you want your nonce to be passed to the script, pass it as the third argument when calling the script initialization method.

```ts
// main.ts
import VuePiwikPro from '@piwikpro/vue-piwik-pro'

VuePiwikPro.initialize(
  import.meta.env.VITE_PIWIK_PRO_CONTAINER_ID as string,
  import.meta.env.VITE_PIWIK_PRO_CONTAINER_URL as string,
  'nonce-string'
)
```

## Examples of usage

Please explore the ```./vue-piwik-pro-example``` directory of the [Vue repository](https://github.com/PiwikPRO/vue-piwik-pro/tree/master/vue-piwik-pro-example) to get to know how to use this package with a specyfic examples and it's various methods.