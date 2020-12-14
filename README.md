# Now playing for Übersicht

This is a now playing widget for [Übersicht](http://tracesof.net/uebersicht/)
that displays the current track in Spotify, Music (iTunes), and Sonos depending on which
is currently playing.

![Screenshot of now playing widget](/docs/screenshot.jpg)

## Installation

Download the `now-playing.widget.zip` and unzip it to your widgets folder (default: ~/Library/Application Support/Übersicht/widgets).

### Sonos

For Sonos support you need to install [SoCo](https://github.com/SoCo/SoCo), a Python Sonos Controller, `pip install soco`. You also need to adjust the IP address to your speaker inside `current_track.py`. You can find the IP address by going to "About Sonos" inside the Sonos desktop application.

Album art is a bit slow to render, but they work.

## Upcoming features

- [x] Support both Spotify and Music (iTunes)
- [x] Support Sonos
- [x] Automatic releases with zip bundling for easier installation
- [x] Display Music cover artwork
- [ ] Display paused state
