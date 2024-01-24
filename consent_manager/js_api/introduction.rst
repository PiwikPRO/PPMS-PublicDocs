Introduction
------------

Consent Manager provides a JavaScript API that allows the user to:

    * Get compliance types
    * Get new compliance types
    * Set initial compliance settings
    * Set compliance settings
    * Get compliance settings
    * Send data subject request
    * .. versionadded:: 12.0 Open consent form
    * .. versionadded:: 15.3 Track consent stats
    * .. versionadded:: 18.11 Clear consent settings

JavaScript API is implemented by providing a global JavaScript objects queue responsible for executing commands:

.. function:: ppms.cm.api(command, ...args)

    :param string command: Command name
    :param args: Command arguments. The number of arguments and their function depend on the command.
    :returns: Commands are expected to be run asynchronously and return no value
    :rtype: undefined

Consent Manager is fully integrated with Tag Manager. If you already have an asynchronous snippet installed, then you are able to use the Consent Manager's JavaScript API.
