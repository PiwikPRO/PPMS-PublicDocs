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

JavaScript API is implemented by providing global JavaScript objects queue responsible for executing command:

.. function:: ppms.cm.api(command, ...args)

    :param string command: Command name
    :param args: Command arguments. The number of arguments and their function depend on command.
    :returns: Commands are expected to be run asynchronously and return no value
    :rtype: undefined

Consent Manager is fully integrated with Tag Manager. If you already have asynchronous snippet installed, then you are able use Consent Manager's JavaScript API.
