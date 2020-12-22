#!/usr/bin/osascript

tell application "System Events"
	set processList to (name of every process)
end tell

if processList contains "Music" or processList contains "Spotify" then
	-- Try getting now playing from Music or Spotify
	if application "Music" is running then
		tell application "Music"
			if player state is playing then
				set link to ""
				set cover to ""
				set playerState to "playing"
				set trackName to name of current track
				set trackArtist to artist of current track
				set albumName to album of current track
				set trackDuration to duration of current track
				set playerPosition to player position
				set cover to my itunesArtwork()
				
				return playerState & "::" & trackArtist & "::" & trackName & "::" & albumName & "::" & link & "::" & cover & "::" & playerPosition & "::" & trackDuration
			end if
		end tell
	end if
	
	if application "Spotify" is running then
		tell application "Spotify"
			if player state is playing then
				set link to ""
				set cover to ""
				set playerState to "playing"
				set trackName to name of current track
				set trackArtist to artist of current track
				set albumName to album of current track
				set trackDuration to duration of current track
				set playerPosition to player position
				set trackDuration to trackDuration / 1000
				set trackId to id of current track
				set cover to artwork url of current track
				set link to my spotifyLink(trackId)
				
				return playerState & "::" & trackArtist & "::" & trackName & "::" & albumName & "::" & link & "::" & cover & "::" & playerPosition & "::" & trackDuration
			end if
		end tell
	end if
	
	-- if non of the above are playing, try sonos
	do shell script "python3 ./now-playing/current_track.py"
end if

-- Base64 encoding
on base64encode(str)
	return do shell script "base64 " & quoted form of str
end base64encode

-- Create Spotify links
on spotifyLink(trackId)
	set link to ""
	if trackId is not "" then
		if trackId does not contain "local:" then
			set AppleScript's text item delimiters to "track:"
			set trackId to text item 2 of trackId
			set link to "http://open.spotify.com/track/" & trackId
		end if
	end if
	
	return link
end spotifyLink

-- Create artwork for Music tracks
-- As we can't use local files due to file access permissions
-- we are base64 encoding the image and passing that string to the widget
on itunesArtwork()
	set cover to ""
	
	try
		tell application "Music" to tell artwork 1 of current track
			set srcBytes to raw data
			if format is «class PNG » then
				set ext to ".png"
			else
				set ext to ".jpg"
			end if
		end tell
		
		set fileName to POSIX path of (path to application support from user domain) & "cover" & ext
		set outFile to open for access fileName with write permission
		set eof outFile to 0
		write srcBytes to outFile
		close access outFile
		
		set cover to "data:image/jpeg;charset=utf-8;base64," & my base64encode(fileName)
		tell application "System Events" to delete alias fileName
	end try
	
	return cover
end itunesArtwork
