Custom consent form
-------------------

API enables you to build custom consent form in place of default one.
To turn off default consent form follow steps:

    #. Login to your PPMS instance
    #. Go to **Menu** > **Administration**
        .. image:: /_static/images/cm_js_api/menu-administration.png
            :alt: Menu with Administration setting
    #. Go to **Websites & apps** and find **Privacy** section
        .. image:: /_static/images/cm_js_api/app-privacy.png
            :alt: Website settings
    #. Click **Configure**
        .. image:: /_static/images/cm_js_api/privacy-configure.png
            :alt: Website setting's privacy section
    #. Check **Custom consent form** check box
        .. image:: /_static/images/cm_js_api/custom-consent-form.png
            :alt: GDPR compliance settings with custom consent form check box

Here is basic flow description to achieve similar result to default consent form:

    - get compliance settings (if you want to know if user is visiting site for the first time)
    - get new compliance types
    - get checked compliance types (if you want to show already checked consents on your consent form)
    - show custom consent form and set initial compliance settings (setting initial compliance settings is required for Consent Manager Insights)
    - set compliance types
