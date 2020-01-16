Introduction
------------

Consent Manager provides JavaScript API that allows the user to:

    * Get compliance types
    * Get new compliance types
    * Set initial compliance settings
    * Set compliance settings
    * Get compliance settings
    * Send data subject request
    * .. versionadded:: 11.1 Open consent form

JavaScript API is implemented by providing global JavaScript objects queue responsible for executing command:

.. function:: ppms.cm.api(command, ...args)

    .. versionadded:: 6.2
        Replaces :func:`dataLayer.push`

    :param string command: Command name.
    :param args: Command arguments. The number of arguments and their function depend on command.
    :returns: Commands are expected to be run asynchronously and return no value.
    :rtype: undefined

.. function:: dataLayer.push({event: command, ...args})

    .. deprecated:: 6.2
        This interface is only for backward compatibility. You can read more about this particular case below.
        We recommend using :func:`ppms.cm.api` instead.

    :param string command: Command name.
    :param args: Command arguments. The number of arguments and their function depend on command.
    :returns: Commands are expected to be run asynchronously and return no value.
    :rtype: undefined
