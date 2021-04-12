Custom consent form
-------------------

API enables you to build custom consent form in place of default one.
To turn off default consent form follow steps:

    #. Login to your PPAS instance
    #. Go to **Menu** > **Administration**
    #. Go to **Websites & apps** and find **Privacy** section
    #. Click **Configure**
    #. Check **Custom consent form** check box

Here is basic flow description to achieve a result similar to default consent form:

    - get compliance settings (if you want to know if user is visiting site for the first time)
    - get new compliance types
    - get checked compliance types (if you want to show already checked consents on your consent form)
    - show custom consent form and set initial compliance settings (setting initial compliance settings is required for Consent Manager Insights)
    - set compliance types
