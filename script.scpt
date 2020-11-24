#!/usr/bin/osascript

tell application "System Events"
  set myList to (name of every process)
end tell

if myList contains "Spotify" then
  nowplaying("Spotify")
end if

on nowplaying(appname)
  set playerstate to "stopped"
  set trackartist to ""
  set trackname to ""
  set albumname to ""
  set albumyear to ""
  set link to ""
  set cover to ""
  set trackduration to 0
  set position to 0

  using terms from application "Spotify"
    tell application appname
      if player state is playing then
        set playerstate to "playing"
        set trackname to name of current track
        set trackartist to artist of current track
        set albumname to album of current track
        set cover to artwork url of current track
        set trackduration to duration of current track
        set position to player position
        set position to round (position) rounding down

        if appname is "Spotify" then
          set trackid to id of current track

          if trackid is not "" then
            -- Track ID
            set AppleScript's text item delimiters to "track:"
            set trackid to text item 2 of trackid

            set link to "http://open.spotify.com/track/" & trackid
          end if
        end if
      end if

      set output to playerstate & "::" & trackartist & "::" & trackname & "::" & albumname & "::" & link & "::" & cover & "::" & position & "::" & trackduration
    end tell
  end using terms from
end nowplaying
