#!/usr/bin/osascript

tell application "System Events"
	set processList to (name of every process)
end tell

if processList contains "Music" or processList contains "Spotify" then
	set output_data to ""
	
	set output_data to nowplaying("Music", output_data)
	set output_data to nowplaying("Spotify", output_data)
end if

on nowplaying(appname, output_data)
	using terms from application "Music"
		if application appname is running then
			tell application appname
				if player state is playing then
					set link to ""
					set cover to ""
					set playerstate to "playing"
					set trackname to name of current track
					set trackartist to artist of current track
					set albumname to album of current track
					
					set trackduration to duration of current track
					set playerPosition to player position
					
					if appname is "Spotify" then
						using terms from application "Spotify"
							set trackduration to trackduration / 1000
							set trackid to id of current track
							set cover to artwork url of current track
							
							if trackid is not "" then
								-- Track ID
								if trackid does not contain "local:" then
									set AppleScript's text item delimiters to "track:"
									set trackid to text item 2 of trackid
									set link to " (http://open.spotify.com/track/" & trackid & ")"
								end if
							end if
						end using terms from
					end if
					
					set output_data to playerstate & "::" & trackartist & "::" & trackname & "::" & albumname & "::" & link & "::" & cover & "::" & playerPosition & "::" & trackduration
				end if
				
				return output_data
			end tell
		end if
	end using terms from
end nowplaying
