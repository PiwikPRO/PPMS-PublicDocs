.. highlight:: js
.. default-domain:: js

Custom popup examples
=============================================

Introduction
------------
Since version 10.1 of PPAS there is a possiblity of creating a `Custom popup` tag template. To add one, head to `Tag Manager` and while on `Tags` tab, choose `+ Crate new tag`. From there you can select `Custom popup` template. Once added, you will be greated by default template code which consists of overlay, popup box and close button. To highlight what can be created with the use of this template, we decided to share some example implementations that can be further modified and expanded.

Example 1
----------

.. image:: /_static/images/tm_popup_examples/example-popup-1.png
        :alt: Custom popup example 1

Example code:

.. literalinclude:: popup-examples/example-popup-1.html
        :language: html

.. note::
    Handling of the close button is provided out of the box, as long as the class name ``ppms-popup-close-button`` is unchanged. Your own JavaScript code to handle `Subscribe now` button needs to be provided.


Example 2
----------

.. image:: /_static/images/tm_popup_examples/example-popup-2.png
          :alt: Custom popup example 2

Example code:

.. literalinclude:: popup-examples/example-popup-2.html
        :language: html


.. note::
    Handling of the close button is provided out of the box, as long as the class name ``ppms-popup-close-button`` is unchanged. Your own JavaScript code to handle `Sign up now` button needs to be provided.

Example 3
----------

.. image:: /_static/images/tm_popup_examples/example-popup-3.png
    :alt: Custom popup example 3

Example code:

.. literalinclude:: popup-examples/example-popup-3.html
    :language: html


.. note::
    Handling of the close button is provided out of the box, as long as the class name ``ppms-popup-close-button`` is unchanged. Your own JavaScript code to handle `Sure, let's talk` and `Nah, I'm fine` buttons needs to be provided.
