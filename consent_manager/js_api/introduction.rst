Introduction
------------

Consent Manager provide JavaScript API that allows the user to:

    * Get compliance types
    * Get new compliance types
    * Set initial compliance settings
    * Set compliance settings
    * Get compliance settings
    * Send data subject request

JavaScript API is implemented by providing global JavaScript objects queue responsible for executing command:

.. function:: ppms.cm.api(command, ...args)
.. function:: dataLayer.push({event: command, ...args})

`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend ```ppms.cm.api```.

    :param string command: Command name.
    :param args: Command arguments. The number of arguments and their function depend on command.
    :returns: Commands are expected to be run asynchronously and return no value.
    :rtype: undefined
