Content Security Policy (CSP)
==============

Introduction
---------------
Specifying Content Security Policy is a common way to secure web applications. This mechanism allows specifying which scripts and styles can execute on page. It can be done either by adding a ``Content-Security-Policy`` header or an appropriate meta tag.

You can read about Consent Security Policy here: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP


Content Security Policy nonce configuration
---------------
It is common to allow only scripts and styles that were received from known domains or ones that have special nonce attribute. Nonce mechanism relies on two steps, defining nonce value in Content Security Policy and placing nonce value as an attribute in styles and scripts.


Defining nonce in Content Security Policy settings
```````````````````````````````````
Nonce mechanism requires additional definition in ``script-src`` directive of Content Security Policy:

.. code-block:: javascript

    script-src <your-sources> 'nonce-INSERT_VALID_NONCE_VALUE';

.. note::
	**Note:** Nonce value should be generated on the server-side. Its value should be different for each request. Please note that we leave here space for your permitted sources ``<your-sources>``.


Add nonce to container code
```````````````````````````````````
Consequently, default container code requires following modifications to work:

**Asynchronous snippet:** In this container code the following changes (highlighted) are required:

.. code-block:: html
    :emphasize-lines: 1

      <script type="text/javascript" nonce="INSERT_VALID_NONCE_VALUE">
          (function(window, document, dataLayerName, id) {
          window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});
          var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
          function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d=";expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}
          var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");
          stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
          var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");
          var qPString=qP.length>0?("?"+qP.join("&")):"";
          tags.async=!0,tags.src="//client.containers.piwik.pro/"+id+".js"+qPString,
          scripts.parentNode.insertBefore(tags,scripts);
          !function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){
          var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
          })(window, document, 'dataLayer', 'feacd61d-0232-40a1-96c3-7e469f7bfa7f');
      </script>
      <noscript>
          <iframe src="//client.containers.piwik.pro/feacd61d-0232-40a1-96c3-7e469f7bfa7f/noscript.html" height="0" width="0" style="display:none;visibility:hidden"></iframe>
      </noscript>

**Synchronous snippet:** In this container code the following changes (highlighted) are required:

.. code-block:: html
    :emphasize-lines: 1, 8

      <script type="text/javascript" nonce="INSERT_VALID_NONCE_VALUE">
          (function(window, document, dataLayerName, id) {
          function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d=";expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}
          var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");
          stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
          var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");
          var qPString=qP.length>0?("?"+qP.join("&")):"";
          document.write('<script src="//client.containers.piwik.pro/'+id+'.sync.js' + qPString + '" nonce="INSERT_VALID_NONCE_VALUE"></' + 'script>');
          })(window, document, 'dataLayer', 'feacd61d-0232-40a1-96c3-7e469f7bfa7f');
      </script>

.. note::
    **Note:** All that is needed for Tag Manager to work is to replace ``INSERT_VALID_NONCE_VALUE`` with generated nonce value. It should be done twice for both asynchronous and synchronous snippet.


Adjust tags to work with Content Security Policy
---------------

**Asynchronous tags**: in most cases there should not be any change required to make asynchronous tags work. Tag Manager will automatically insert nonce attribute to all fired tags. Only exceptions is when Your tag adds other scripts/styles on page by itself - in such case, You should add nonce attribute manually.

**Synchronous tags**: since synchronous tags have to fire before whole page is loaded, following procedure is recommended.

This procedure is recommended:

1. Create new variable with value of nonce parameter. It is not required to create nonce variable in admin panel. Just pushing it on dataLayer before script is executed is enough.

.. code-block:: javascript

      window.dataLayer.push({
      nonce: INSERT_VALID_NONCE_VALUE
      });

2. Use created variable as value for nonce attribute like follows:

.. code-block:: html

      <script nonce="{{ nonce }}">
        console.log("I'm synchronous tag!");
        document.write('<p id="synchronous-tag">I was inserted by synchronous tag</p>');
      </script>

.. note::
    **Note:** Finally, not all 3rd party tools that are available as built-in templates are adjusted to work with Content Security Policy. This includes e.g. Google Analytics. In such cases, please refer to documentation of each respective tool (e.g. https://developers.google.com/web/fundamentals/security/csp).


Tag Manager debugger
--------------

To load all necessary assets from Tag Manager debugger you need to define source with ``img-src``, ``font-src`` and ``style-src`` directives:

.. code-block:: javascript

	img-src <your-sources> client.containers.piwik.pro;
	font-src <your-sources> client.containers.piwik.pro;
	style-src <your-sources> client.containers.piwik.pro;


Consent Manager form assets
------------

If your website is GDPR compliant then you need to describe ``connect-src``, ``style-src`` and ``img-src`` directives:

.. code-block:: javascript

	connect-src <your-sources> client.piwik.pro client.containers.piwik.pro;
	style-src <your-sources> 'nonce-INSERT_VALID_NONCE_VALUE';

.. note::
    Please note that we define here tracking domain **client.piwik.pro** for collecting visitor consents and container domain **client.containers.piwik.pro** for fetching consent form assets.


Consent Manager's data subject request widget
------------

When using a data subject request widget, you need to add a nonce attribute to its ``<script>`` tag.

.. code-block:: html
  :emphasize-lines: 9

  <div id="ppms_cm_data_subject" class="ppms_cm_data_subject_widget__wrapper" data-editor-centralize="true" data-main-container="true" data-root="true">
      <h3 id="ppms_cm_data_subject_header" class="header3">Data requests</h3>
      <p id="ppms_cm_data_subject_paragraph" class="paragraph">
          Please select below the type of data request along with any special requests in the body of the message. (...)
      </p>
      <form id="ppms_cm_data_subject_form" class="ppms_cm_data_subject_form" data-disable-select="true">
          ...
      </form>
      <script nonce="INSERT_VALID_NONCE_VALUE">
          ...
      </script>
  </div>


Tracking with custom domain
---------------------------

If your tracking domain is custom, then you need to define it with ``img-src`` and ``script-src`` directives:

.. code-block:: javascript

	img-src <your-sources> your-custom-cpp-domain.com;
	script-src <your-sources> your-custom-cpp-domain.com;


Example Content Security Policy definition
------------

Following example configuration of CSP assumes:

* Client's website address: **client.com**
* Consent Manager is enabled for the website
* Client's organization name in Piwik PRO: **client**
* Client's container domain: **client.containers.piwik.pro**
* Client has Piwik PRO tag with default tracking domain: **client.piwik.pro**
* Nonce value: **nceIOfn39fn3e9h3sd**
* Configuration allows ``'self'`` source which is: **client.com**

.. code-block:: text

    Content-Security-Policy: default-src 'self';
                             script-src  'self' client.piwik.pro 'nonce-nceIOfn39fn3e9h3sd';
                             connect-src 'self' client.containers.piwik.pro client.piwik.pro;
                             img-src     'self' client.containers.piwik.pro client.piwik.pro;
                             font-src    'self' client.containers.piwik.pro;
                             style-src   'self' client.containers.piwik.pro 'nonce-nceIOfn39fn3e9h3sd';
