.. highlight:: js
.. default-domain:: js

.. versionadded:: 10.1

Custom popup template implementation examples
=============================================

Introduction
------------
Since version 10.1 of PPAS there is a possiblity of creating a `Custom popup` tag template. We decided to share some example implementations that can be further modified and expanded.

Example 1
----------
Preview:
    .. image:: /_static/images/tm_popup_examples/example-popup-1.png
        :alt: Custom popup example 1

.. note::
    Handling of the close button is provided in ContainerJS, as long as the class name ``ppms-popup-close-button`` is unchanged. JavaScript code to handle `Subscribe now` button needs to be provided.

Example code:
    .. literalinclude:: popup_examples/example-popup-1.html
        :language: html

Example 2
----------
Preview:
    .. image:: /_static/images/tm_popup_examples/example-popup-2.png
          :alt: Custom popup example 2

.. note::
    Handling of the close button is provided in ContainerJS, as long as the class name ``ppms-popup-close-button`` is unchanged. JavaScript code to handle `Sign up now` button needs to be provided.

Example code:
    .. literalinclude:: popup_examples/example-popup-2.html
        :language: html

Example 3
----------
Preview:
    .. image:: /_static/images/tm_popup_examples/example-popup-3.png
          :alt: Custom popup example 3

.. note::
    Handling of the close button is provided in ContainerJS, as long as the class name ``ppms-popup-close-button`` is unchanged. JavaScript code to handle `Sure, let's talk` and `Nah, I'm fine` buttons needs to be provided.

Example code:
    .. literalinclude:: popup_examples/example-popup-3.html
        :language: html