.. highlight:: js
.. default-domain:: js

JavaScript API
==============

Introduction
------------------------

Consent Manager provide JavaScript API that allows the user to do:

    * get consent types
    * get new consent types
    * get consent settings
    * set consent settings
    * send data subject request

JavaScript API is implemented by providing global JavaScript objects queue responsible for executing command:

.. function:: ppms.cm.api(command, ...args)
.. function:: dataLayer.push(event: command, ...args)

    :param string command: Command name.
    :param args: Command arguments. The number of arguments and their function depend on command.
    :returns: Commands are expected to be run asynchronously and return no value.
    :rtype: undefined

`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below.

Installation
------------------------

Consent Manager is fully integrated with Tag Manager. If you have already installed asynchronous snippet and you are using API only from Tag Manager tags, you are able use JavaScript API without aby pitfalls.

Only one thing should be considered before using API is where you call commands. If your goal is to perform API method outside Tag Manager tags like in below example:

.. code-block:: html

    <!DOCTYPE html>
    <html>
        <head>
        <meta charset="UTF-8">
        <title></title>
    </head>

    <!-- Start Piwik PRO Tag Manager code -->
    <script>
        // Tag Manager async code snippet
    </script>
    <!-- End Piwik PRO Tag Manager code -->

    <script>
        // API call outside Tag Manager injected manually
        ppms.cm.api(command, ...args);
    </script>

    <body>
        Rest content of document
    </body>

    </html>

When you need execute API in such manner, you should take care about Tag Manager snippet version.
Because `ppms.cm.api` global object is initialized in snippet and/or in Tag Manager container, if you are using old version of Tag Manager snippet, `ppms.cm.api` might be undefined until container will be loaded.
So if you want use own scripts outside Tag Manager, you need update snippet to use `ppms.cm.api`, or use `dataLayer` interface if replacing snippet is not possible:

.. code-block:: html

    <!DOCTYPE html>
    <html>
        <head>
        <meta charset="UTF-8">
        <title></title>
    </head>

    <!-- Start Piwik PRO Tag Manager code -->
    <script>
        // Tag Manager async code snippet
    </script>
    <!-- End Piwik PRO Tag Manager code -->

    <script>
        // API call outside Tag Manager injected manually
        dataLayer.push({event: command, ...args});
    </script>

    <body>
        Rest content of document
    </body>

    </html>


Commands
--------
All commands work in context of the current visitor and website. Additionally they sometimes require communication with a PPMS server and are
asynchronous. Callback functions are used to provide response value or information about errors. `onSuccess(...args)` callback is always required. `onFailure(exception)` callback is optional and if is specified, any error object occurred will be passed as a argument. If not specified, error is reported directly on console output.

Get consent types
`````````````````````````````````````
Fetches a list of consent types.

Code::

    ppms.cm.api('getComplianceTypes', onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:getComplianceTypes', parameters: [onFulfilled, onRejected]});

.. function:: onFulfilled(types)

    The fulfilment handler callback (called with result).

    :param Array<string> types: **Required** Array of consent types

        Example::

            ["remarketing", "analytics"]

.. function:: onRejected(error)

    The rejection handler callback (called with error code).

    :param string|object error: **Required** Error code or exception.

Get new consent types
`````````````````````````````````````
Fetches a list of new consent types which were appearing after given consents.

Code::

    ppms.cm.api('getNewComplianceTypes', onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:getNewComplianceTypes', parameters: [onFulfilled, onRejected]});

.. function:: onFulfilled(types)

    The fulfilment handler callback (called with result).

    :param Array<string> types: **Required** Array of consent types

        Example::

            ["remarketing", "analytics"]

.. function:: onRejected(error)

    The rejection handler callback (called with error code).

    :param string|object error: **Required** Error code or exception.


Set compliance settings
`````````````````````````````````````
Set compliance settings base on user decision.
This API command might be useful when user interact with custom, extended UI that react on user approve/reject action.
After successful, Consent Manager internally send consent settings to tracking server and force page view on tags.

Code::

    ppms.cm.api('setComplianceSettings', settings, onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:setComplianceSettings', parameters: [settings, onFulfilled, onRejected]});

.. object:: settings

    The consent settings object.

        Example::

            {consents: {analytics: {status: -1}}}

    Where `consent.analytics` is consent type and status indicate:

    * `-1` - user does not interact, e.q. close consent popup without any decision
    * `0` - user reject consent
    * `1` - user approve consent

.. function:: onFulfilled()

    The fulfilment handler callback.

.. function:: onRejected(error)

    The rejection handler callback (called with error code).

    :param string|object error: **Required** Error code or exception.

Get compliance settings
`````````````````````````````````````
Return current privacy settings. Might be useful for initializing custom decision view.
When there is no decisions, just return empty object. This state can be used for detect first time user interaction with consent mechanism.

Code::

    ppms.cm.api('getComplianceSettings', onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:getComplianceSettings', parameters: [onFulfilled, onRejected]});

.. object:: settings

    The consent settings object.

        Example::

            {consents: {analytics: {status: -1, updatedAt: '2018-07-03T12:18:19.957Z'}}}

    Where `consent.analytics` is consent type and status indicate:

    * `-1` - user does not interact, e.q. close consent popup without any decision
    * `0` - user reject consent
    * `1` - user approve consent

.. function:: onFulfilled(settings)

    The fulfilment handler callback (called with result).

.. function:: onRejected(error)

    The rejection handler callback (called with error code).

    :param string|object error: **Required** Error code or exception.

Send data request
`````````````````````````````````````
Command send data subject request to Consent Manager collector.

Code::

    ppms.cm.api('sendDataRequest', request, onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:sendDataRequest', parameters: [request, onFulfilled, onRejected]});

.. object:: request

    The subject data request.

        Example::

            {content: '', email: '', type: 'change_data|view_data|delete_data'}

.. function:: onFulfilled()

    The fulfilment handler callback.

.. function:: onRejected(error)

    The rejection handler callback (called with error code).

    :param string|object error: **Required** Error code or exception.

Example usage
--------
Based on above listed commands there are many possibilities to implement custom consent gathering. Below it is listed
simple implementation using jquery.

.. code-block:: html
    :linenos:

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" href="data:;base64,iVBORw0KGgo=">
      <title>Piwik Pro Tag Manager Custom Consent Implementation</title>
    </head>
    <body>

    <!-- Start Piwik PRO Tag Manager custom consent css code -->
    <link rel="stylesheet" href="https://rawgit.com/djanix/jquery.switcher/master/dist/switcher.css"/>
    <style>
        * {
          font-family: BlinkMacSystemFont, -apple-system, Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        }

        .consent-container {
          background: white;
          display: none;
          bottom: 0;
          position: fixed;
          width: 100%;
          border-top: 1px solid #e0e0e0;
          z-index: 10000;
          color: rgba(0, 0, 0, 0.7);
          box-sizing: border-box;
        }

        .consent-content {
          display: inline-flex;
          width: 100%;
        }

        .consent-left {
          flex: 1 0 0;
          flex-direction: column;
          border-right: 1px solid #e0e0e0;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 30px;
        }

        .consent-right {
          flex: 3 0 0;
          box-sizing: border-box;
          display: flex;
          opacity: 0.9;
          padding: 30px;
          background-color: #f5f5f5;
          line-height: 16px;
        }

        .consent-opt-in-button {
          border-color: rgba(197, 103, 57, 1);
          background-color: rgba(252, 131, 72, 1);
          color: #fff;
          min-width: 120px;
          font-weight: 600;
          font-size: 16px;
          line-height: 17px;
          text-align: center;
          border: 1px solid;
          border-radius: 2px;
          outline: 0;
          cursor: pointer;
          padding: 9px 16px 9px 16px;
        }

        .consent-link-more {
          color: #107EF1;
          font-size: 14px;
          line-height: 16px;
          margin-top: 7px;
          text-decoration: none;
          display: inline-block;
        }

        .consent-bottom {
          max-height: 0;
          transition: max-height 0.5s;
        }

        .consent-items {
          box-sizing: border-box;
          position: relative;
        }

        .consent-items-container {
          display: flex;
          flex-direction: column;

        }

        .consent-items-text {
          margin-left: 10px;
        }

        .consent-item {
          display: flex;
          height: 50px;
        }

        .consent-item-left {
          width: 25%;
          border-right: 1px solid #e0e0e0;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
        }

        .consent-item-right {
          width: 75%;
          display: flex;
          align-items: center;
        }

        .consent-item-right-text {
          font-size: 14px;
          margin: 0 30px;
        }

        .consent-items-description {
          padding: 20px 0;
          max-height: 54px;
          display: inline-flex;
          width: 100%;
          border-top: 1px solid #e0e0e0;
          border-bottom: 1px solid #e0e0e0;
        }

        .consent-items-footer {
          padding: 20px 0;
          max-height: 54px;
          width: 100%;
          border-top: 1px solid #e0e0e0;
        }

        label {
          width: 100%;
          padding: 0 30px;
          box-sizing: border-box;
          font-weight: 500;
          line-height: 55px;
          cursor: pointer;
          margin: 0;
        }

        .consent-switcher {
          margin: 10px 10px 10px 0;
        }

        .consent-blue {
          background: #107EF1;
          border: 1px solid #107EF1;
        }
    </style>
    <!-- End Piwik PRO Tag Manager custom consent css code -->

    <!-- Start Piwik PRO Tag Manager custom consent javascript code -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
    <script src="https://rawgit.com/djanix/jquery.switcher/master/dist/switcher.js"></script>

    <script type="text/template" data-template="consentitem">
      <div class="consent-item">
        <div class="consent-item-left">
          <div>
            <label>${name}</label>
          </div>
          <div class="consent-switcher">
              <input class="consent-checkbox" type="checkbox" name="consentValues" value="${key}" />
          </div>
        </div>
        <div class="consent-item-right">
          <div class="consent-item-right-text">
            ${description}
          </div>
        </div>
      </div>
    </script>

    <script>
      var avalaibleConsents = [
        {
          key: 'analytics',
          name: 'Analytics',
          description: 'We will store data in an aggregated form about visitors and their experiences on our website. We use this data to fix bugs and improve the experience for all visitors.'
        },
        {
          key: 'ab_testing_and_personalization',
          name: 'AB Testing',
          description: 'We will create a cookie in your browser to ensure consistency of our A/B tests. A/B tests are small changes displayed to different groups of visitors. We use the data to create a better experience for all visitors. We will also use this cookie to personalize content for you.'
        },
        {
          key: 'conversion_tracking',
          name: 'Conversion Tracking',
          description: 'We will store data about when you complete certain actions on our website to understand better how you use it. We use this data to improve your experience with our site.'
        },
        {
          key: 'marketing_automation',
          name: 'Marketing Automation',
          description: 'We will store data to create marketing campaigns for certain groups of visitors.'
        },
        {
          key: 'remarketing',
          name: 'Remarketing',
          description: 'We will store data to show you our advertisements (only ours) on other websites relevant to your interests.'
        },
        {
          key: 'user_feedback',
          name: 'User Feedback',
          description: 'We will store data in an aggregated form to analyze the performance of our website\'s user interface. We use this data to improve the site for all visitors.'
        },
        {
          key: 'custom_consent',
          name: 'Custom consent',
          description: 'Adjust this copy to your needs.'
        },
      ];

      var customConsentSolution = {
        isDetailsOpen: false,
        containerSelector: '#consent-container',
        consentBottomSelector: '#consent-bottom',
        consentLinkMoreSelector: '#consent-link-more',
        consentItemFooterSelector: '#consent-items-footer',
        switcherSelector: '.consent-checkbox',
        optInButton: '.consent-orange',
        sendConsentButtonSelector: '.consent-blue',
        itemsSelector: '.consent-items-container',
        consentTemplate: $('script[data-template="consentitem"]').text().split(/\$\{(.+?)\}/g),
        switcherElement: null,

        init: function() {
          $(this.consentLinkMoreSelector).click(this.showDetails.bind(this));
          $(this.sendConsentButtonSelector).click(this.sendConsents.bind(this, false));
          $(this.optInButton).click(this.sendConsents.bind(this, true));
          this.loadConsentList();
        },

        show: function() {
          $(self.containerSelector).slideDown(100);
        },

        hide: function() {
          $(self.containerSelector).slideUp(100);
        },

        loadConsentList: function() {
          ppms.cm.api('getNewComplianceTypes', function(types) {
            self = customConsentSolution;

            if (types.length > 0) {
              self.show();
            }

            $(self.itemsSelector).append(
              avalaibleConsents
                .filter(function(element) {
                  return types.join(',').indexOf(element.key) !== -1;
                })
                .map(function (item) {
                  return self.consentTemplate.map(self.replaceTemplate(item)).join('');
                })
            ).ready(function() {
              self.switcherElement = $(self.switcherSelector).switcher();
            });

          }, function(e) {});
        },

        sendConsents: function(all) {
            var queryElements = {
              consents: {},
            };

            $.each(this.switcherElement, function(index, value) {
              queryElements.consents[$(value).val()] = {
                status: all ? 1 : +$(value).prop('checked'),
              };
            });

            ppms.cm.api('setComplianceSettings', queryElements, function() {
              self = customConsentSolution;
              self.hide();
            }, function() {

            });
        },

        showDetails: function() {
          var detailsScrollHeight = $(this.consentBottomSelector).prop('scrollHeight');
          var baseScrollHeight = $(this.containerSelector).prop('scrollHeight');
          var consentItemFooterHeight = $(this.consentItemFooterSelector).prop('scrollHeight');

          $(this.consentBottomSelector).css({
            maxHeight: baseScrollHeight + detailsScrollHeight + consentItemFooterHeight + "px",
            overflowY: 'auto',
            display: 'block',
          });
        },

        replaceTemplate: function(props) {
            return function(token, i) { return (i % 2) ? props[token] : token; };
        },
      };

      $(document).ready(customConsentSolution.init.bind(customConsentSolution));
    </script>
    <!-- End Piwik PRO Tag Manager custom consent javascript code -->


    <!-- Start Piwik PRO Tag Manager custom consent html code -->
    <div class="consent-container" id="consent-container">
      <div class="consent-content">
        <div class="consent-left">
          <button class="consent-opt-in-button consent-orange">Opt-in and let’s go!</button>
        </div>
        <div class="consent-right">
          <div>
            <h1>[IMPORTANT] You're invited!...</h1>
            <a class="consent-link-more" id="consent-link-more" href="#">Show more</a>
          </div>
        </div>
      </div>
      <div class="consent-bottom" id="consent-bottom">
        <div class="consent-items">
            <div class="consent-items-description">
              <div class="consent-items-text">
                ...to tell us how you want us to handle your data.
                We'll only use your data for purposes you consent to.
                Change your mind whenever, we'll adapt to your consent preferences and data requests.
              </div>
            </div>
            <div class="consent-items-container"></div>
            <div class="consent-items-footer" id="consent-items-footer">
              <div class="consent-items-text">
                <button class="consent-opt-in-button consent-blue">Save choices</button>
              </div>
            </div>
        </div>
      </div>
    </div>
    <!-- End Piwik PRO Tag Manager custom consent code -->

    <!-- PUT HERE CONTAINER JS CODE -->

    </body>
    </html>

