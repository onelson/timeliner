Timeliner
=========

A collaborative space where people can assemble a narrative over time.


Goals
-----

To be able to define pieces of a narrative along a chronological (linear)
timeline, but then to also be able to reorder the pieces along the story
(non-linear) timeline.

Both views of the narrative should offer a rich experience by providing inline
access to art and media associated with each event.

While events are attached explicitly to a time, their distance from the origin
axis should be at the discretion of the user.

The linear view will indicate changes in the flow of time (flashbacks, jumps).
The non-linear will show the content in the order the audience will see it in
(kind of like reading a rich-media screenplay).

Objects
-------

* Events (or scenes) which will be tied to a time on the timeline.
* Assets (concept art, story board panels, music) are linked to events.
* Characters can also be defined and linked to Events and Assets.
* All objects can be tagged with concepts/themes which act as labels.
* Other objects (yet to be named) can model goals, obstacles, objectives,
  aspirations.
* Projects (or maybe "Shows") are the parent of all that is mentioned above.

Notes
-----

While I'm still not 100% sure of how this will work, I plan to have a few
different "modes" with regards to the units of time used on the timeline.
Some projects may not care about specific times, for example. They might want to
block things out by season, month, or super vague _"later"_ and _"previously"_.

Interactions should be relayed to the client as quickly as possible to help
promote collaboration, so we're probably talking about a socket implementation
of some kind.

While this is probably a distant-future feature, I'd like the objects in the
system to be versioned, with diffs where appropriate.
