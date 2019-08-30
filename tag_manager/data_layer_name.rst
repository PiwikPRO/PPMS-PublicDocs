.. highlight:: js
.. default-domain:: js

Custom data layer name
======================

Introduction
------------
The data layer is a global JavaScript object, that can be used to pass information form the website to PPMS container. The default value for the data layer name is `dataLayer`.

    .. versionadded:: 10.0
        The name of the object is customizable. The purpose of this article is to describe the steps that need to be performed to set up custom data layer name.

Renaming the data layer
-----------------------
If you wish to rename your data layer, you should follow the instructions below:

1. Log into your PPMS instance.
#. Head to `Menu` > `Administration`.
#. Select the website that you want to set the new data layer name for and then go to the `Installation` page.
#. From here you should copy the code of the snippet, that you want to use - asynchronous or synchronous - and make the following change:

    a. for the asynchronous snippet, you need to change the `dataLayer` value highlighted on a screen below

        .. image:: ../_static/images/async-container.png
            :alt: Container code for asynchronous tags

    #. for the synchronous snippet, you need to input your desired name into the highlighted variable

        .. image:: ../_static/images/sync-container.png
            :alt: Container code for synchronous tags

#. At this point, you can embed the snippet on your website. If you are replacing an existing snippet, make sure to take a look at the `Additional snippet migration steps`_ section for instructions on how to ensure full compatibility.

.. note::
    - The snippet code was slightly changed compared to PPMS versions pre 10.0, to accommodate for the possibility of changing the data layer name. The new snippet, released alongside version 10.0 is backward compatible, however, to use the functionality described in this document, whole snippet code needs to be replaced on your website.
    - If you are using both synchronous and asynchronous snippets, it is recommended to use the same data layer name in both. Nonadherence to this rule may cause unexpected and unwanted behavior.
    - We strongly advise making sure that the chosen name is not used in any other external software present on your website as well as inside your own website's code. Data layer name should be unique and reserved only for use inside the PPMS container. For additional guidelines regarding the data layer naming process, please refer to `Data layer name guidelines`_.


Additional snippet migration steps
---------------

Once you replace your original snippet and want to use the new data layer name, there is one more step that needs to be taken care of. If you are using direct data layer pushes in your code (e.g. to set a `Data layer` variable), you need to make sure to replace all references to `dataLayer` with the newly selected name, e.g (assuming the new name of `customDataLayer`)::

    dataLayer.push({event: "test-event"});

will become::

    customDataLayer.push({event: "test-event"});

Data layer name guidelines
--------------------------

To avoid conflicts with your existing code, that could cause unwanted behavior, you need to make sure that the name selected for the data layer object is unique. To ensure that it is not already used by someone, we suggest you run the following command in the console on your website:::

    !Object.keys(window).includes("dataLayer")

where `dataLayer` is your chosen name. If this operation returns `true` into the console, then you can safely use this value as the name of your data layer.
