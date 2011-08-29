Popin - A Layer-popup solution for interactive content
------------------------------------------------------

There are a lot of layer popup solutions, but most of them are only handle
the visible part. But a real interactive solution needs to be more complex,
and handle redirects and errors, too.

Example:
Somebody wants to upload a picture. A layer popup opens, a request is send to
the server, but the server answers that the user is not logged in.
Instead of leaving the page all together, or showing a error message, Popin can
redirect to another Popin page, change the size of the popin, and redirect back
if the login was a success, so that the user can go in with his work.

It is like a mini-browser in a browser. Iframes aren't a good alternative, since
the communication between iframe content and outside page is not simple and
safe.

It is build as singleton, there can only be one Popin Layer at a time.

Usage
-----

The usage is simple, add the popin css&js to the page, and use "popin()" to
load a page.

Example:

<a href="Javascript: popin('/my/url)">Exampel</a>

A popin layer will be shown with the content of the url given.

The URL need to answer with an json object that looks like this:

{"action": "show", "content": "this is an example content"}

Actions can be "show" for normal content, and "redirect" if another content
should be shown.