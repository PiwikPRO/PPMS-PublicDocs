Content Security Policy (CSP)
==============

Introduction
---------------
Specifying Content Security Policy is a common way to secure web applications. This mechanism allows to specify which scripts and styles can execute on page. It can be done either through adding Content-Security-Policy header or appropriate meta tag. It is common to allow only scripts and styles that were received from known domains or ones that have special nonce attribute. Consequently, default Tag Manager snippet requires following modifications to work:

Installing Tag Manager on page that specifies
---------------
-   **asynchronous snippet** - given Tag Manager snippet following changes (highlighted) are required:

    .. code-block:: html
        :emphasize-lines: 1, 12

        <script type="text/javascript" nonce="INSERT_VALID_NONCE_VALUE">
            (function(window, document, dataLayerName, id) {
            window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});
            var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
            function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d=";
            expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}
            var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");
            stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
            var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");
            var qPString=qP.length>0?("?"+qP.join("&")):"";
            tags.async=!0,tags.src="//organization.containers.piwik.pro/"+id+".js"+qPString,
            tags.nonce="INSERT_VALID_NONCE_VALUE",
            scripts.parentNode.insertBefore(tags,scripts);
            !function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){
            var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
            })(window, document, 'dataLayer', 'feacd61d-0232-40a1-96c3-7e469f7bfa7f');
        </script>
        <noscript>
            <iframe src="//organization.containers.piwik.pro/feacd61d-0232-40a1-96c3-7e469f7bfa7f/noscript.html" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>

-   **synchronous snippet** - following changes (highlighted) are required:

    .. code-block:: html
        :emphasize-lines: 1, 9

        <script type="text/javascript" nonce="INSERT_VALID_NONCE_VALUE">
            (function(window, document, dataLayerName, id) {
            function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d=";
            expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}
            var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");
            stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
            var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");
            var qPString=qP.length>0?("?"+qP.join("&")):"";
            document.write('<script src="//organization.containers.piwik.pro/'+id+'.sync.js' + qPString + '" nonce="INSERT_VALID_NONCE_VALUE"></' + 'script>');
            })(window, document, 'dataLayer', 'feacd61d-0232-40a1-96c3-7e469f7bfa7f');
        </script>

.. note::
    All that is needed for Tag Manager to work is to replace **INSERT_VALID_NONCE_VALUE** with generated nonce value. It should be done twice for both asynchronous and synchronous snippet. Due too bug on MS Edge, you will also need to whitelist container domain in your CSP settings.

Adjusting tags to work with Content Security Policy
---------------

-   **asynchronous tags** - in most cases there should not be any change required to make asynchronous tags work. Tag Manager will automatically insert nonce attribute to all fired tags. Only exceptions is when Your tag adds other scripts/styles on page by itself - in such case, You should add nonce attribute manually.
-   **synchronous tags** - since synchronous tags have to fire before whole page is loaded, following procedure is recommended:


    1.  Create new variable with value of nonce parameter. It is not required to create nonce variable in admin panel. Just pushing it on dataLayer before script is executed is enough.

        .. code-block:: javascript

            window.dataLayer.push({
                nonce: INSERT_VALID_NONCE_VALUE
            });


    2.  Use created variable as value for nonce attribute like follows:

        .. code-block:: html

            <script nonce="{{ nonce }}">
                console.log("I'm synchronous tag!");
                document.write('<p id="synchronous-tag">I was inserted by synchronous tag</p>');
            </script>

.. note::
    Finally, not all 3rd party tools that are available as build-in templates are adjusted to work with Content Security Policy. This includes e.g. Google Analytics. In such cases, please refer to documentation of each respective tool (e.g. https://developers.google.com/web/fundamentals/security/csp).