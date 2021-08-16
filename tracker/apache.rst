.. _first-party-tracker-apache:

Apache reverse proxy
====================

Configuration of apache reverse proxy requires an additional module ``proxy_http_module`` and a set of commands containing ``ProxyPass`` and ``ProxyPassReverse``.

.. highlight:: ini

Please add following lines to your apache main configuration file::  

  # Modules required by PiwikPRO reverse proxy
  <IfModule !proxy_module>
      LoadModule proxy_module modules/mod_proxy.so
  </IfModule>

  <IfModule !proxy_http_module>
      LoadModule proxy_http_module modules/mod_proxy_http.so
  </IfModule>

  # PiwikPRO reverse proxy definitions
  <IfModule proxy_http_module>
      ProxyPass "/t.js" "http://piwikpro-instance/ppms.js"
      ProxyPassReverse "/t.js" "http://piwikpro-instance/ppms.js"

      ProxyPass "/t.php" "http://piwikpro-instance/ppms.php"
      ProxyPassReverse "/t.php" "http://piwikpro-instance/ppms.php"

      ProxyPass "/ppas.js" "http://piwikpro-instance/ppas.js"
      ProxyPassReverse "/ppas.js" "http://piwikpro-instance/ppas.js"
  </IfModule>

.. CAUTION::
  Please replace ``piwikpro-instance`` with your actual instance name. 


