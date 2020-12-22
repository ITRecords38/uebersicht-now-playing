#!/usr/bin/env python
from soco import SoCo

ip = '192.168.1.55'

def time(input):
    split_time = input.split(":")
    minutes = int(split_time[0]) * 60
    seconds = int(split_time[1])

    return minutes + seconds


if __name__ == '__main__':
    nothing = "not_playing::::::::::::::"
    sonos = SoCo(ip) # Pass in the IP of your Sonos speaker

    track = sonos.get_current_track_info()
    state = sonos.get_current_transport_info()
    play_state = state['current_transport_state']

    if track['position'] == "NOT_IMPLEMENTED" or play_state == "STOPPED" or play_state == "PAUSED_PLAYBACK":
        print(nothing)
    else:
        artist = track['artist']
        name = track['title']
        album = track['album']
        position = track['position'][2:]
        duration = track['duration'][2:]
        album_art = track['album_art']

        position = str(time(position))
        duration = str(time(duration))

        print("playing::" + artist + "::" + name + "::" + album + "::::" + album_art + "::" + position + "::" + duration)



