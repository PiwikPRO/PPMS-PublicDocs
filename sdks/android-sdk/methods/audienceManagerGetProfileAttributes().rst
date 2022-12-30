.. _android audienceManagerGetProfileAttributes():

=======================================
audienceManagerGetProfileAttributes() 🗑
=======================================

.. deprecated::
    16.0.0 This method is no longer recommended. Audience Manager is no longer available in the latest product version.

The **audienceManagerGetProfileAttributes()** method returns profile attributes. You can get only the attributes with `granted access <https://help.piwik.pro/support/audiences/api-access-attribute/>`_.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().audienceManagerGetProfileAttributes(new Tracker.OnGetProfileAttributes() {
              @Override
              public void onAttributesReceived(Map<String, String> attributes) {
                // handle result
              }

              @Override
              public void onError(String errorData) {
                errorData = TextUtils.isEmpty(errorData) ? "Network error": errorData;
                // handle error
              }
          });


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.audienceManagerGetProfileAttributes(object : OnGetProfileAttributes {
            override fun onAttributesReceived(attributes: Map<String, String>) {
              // handle result
            }

            override fun onError(errorData: String) {
              var errorData: String? = errorData
              errorData = if (TextUtils.isEmpty(errorData)) "Network error" else errorData
              // handle error
            }
          })

Parameters
----------

| **OnGetProfileAttributes ()** (required)
| The callback to handle a request result. The call is asynchronous. It has two methods ``void onAttributesReceived(Map<String, String> attributes)`` and ``void onError(String errorData)``.

| **attributes** (output)
| The dictionary of key-value pairs. Key: attribute name. Value: attribute value.

| **errorData** (output)
| The error string. If an error occurs, only this method will be called.

Examples
--------

To get profile attributes:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().audienceManagerGetProfileAttributes(new Tracker.OnGetProfileAttributes() {
              @Override
              public void onAttributesReceived(Map<String, String> attributes) {
                // handle result
              }

              @Override
              public void onError(String errorData) {
                errorData = TextUtils.isEmpty(errorData) ? "Network error": errorData;
                // handle error
              }
          });


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.audienceManagerGetProfileAttributes(object : OnGetProfileAttributes {
            override fun onAttributesReceived(attributes: Map<String, String>) {
              // handle result
            }

            override fun onError(errorData: String) {
              var errorData: String? = errorData
              errorData = if (TextUtils.isEmpty(errorData)) "Network error" else errorData
              // handle error
            }
          })


Notes
-----

* You can get only the attributes with `granted access <https://help.piwik.pro/support/audiences/api-access-attribute/>`_.


Related methods
---------------

* :ref:`android audienceManagerSetProfileAttribute()`
* :ref:`android OnCheckAudienceMembership()`
