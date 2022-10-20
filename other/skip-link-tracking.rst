.. highlight:: js
.. default-domain:: js

.. _`MDN`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a


Skip link tracking with a data-disable-delay attribute
======================================================

Introduction
------------
As per the `MDN`_ definition:

The <a> HTML element (or anchor element), with its href attribute, creates
a hyperlink to web pages, files, email addresses, locations in the same page,
or anything else a URL can address.

If you wish to trigger tags, when the anchor element is clicked, they need time
to execute before the redirect happens. That is why our container is equipped
with a delay mechanism.


Delay mechanism
---------------
Each app or site you create has the option to `Delay loading the next page` in
its settings. You can adjust this value in `Data collection -> Other options`
section in your app settings under `Administration -> Sites & apps`. The default
value for each app is ``500ms``. Once you assign a trigger and a tag to an anchor
element on your page, this mechanism will ensure that the tag fires and has time
to execute, before the visitor is redirected to the desired page.

However, not every anchor element is supposed to perform a redirect. One such
example can be SPA pages where ``a`` elements can serve as buttons. In such case,
the action performed inside the container can break the functionality of the page.
That is where the ``data-disable-delay`` attribute comes in.

data-disable-delay attribute
------------------------------
``data-disable-dalay`` is special custom attribute that is recognized by the
container. Once the anchor element is clicked and the aforementioned attribute
is detected on the element, it tells the container to skip the execution of the
logic responsible for delaying the default action. Listeners attached to the
element are executed immediatly after clicking.


Example
```````

1. Let's assume that your Tag Manager setup includes a `Custom code (async)` tag (the contents of the tag does not matter in this case) and a basic `Click trigger` assigned to the said tag.
2. On your page, the following code is present:

.. code-block:: html

  <a
      id='link-id'
      href="/"
  >
      link
  </a>
  <script>
      window.setTimeout(function() {
          document.addEventListener('click', function(event) {
              if(event.target.id === 'link-id') {
                  event.preventDefault()
              }
          })
      }, 1000)
  </script>

3. Once the visitor clicks the link, a redirect happens. This is not desired, since the listener performs a `preventDefault` action.
4. Now let's modify the anchor element to look like this:

.. code-block:: html

  <a
      id='link-id'
      href="/"
      data-disable-delay
  >
      link
  </a>

5. After the modification is done, clicking the link no longer performs a redirect and fires the click listener immediately.
