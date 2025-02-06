# spotify-stats-api endpoints
## GET /login
Open a login page in Spotify in order to get your token which will allow you to use this API.

No parameters are required.

## POST /trackPlays
Add track plays from your listening history to database. You can get listening history from Spotify privacy settings (https://developer.spotify.com/).

Requires an array of objects with parameters:
* `endTime` or `ts` (string) - track end time
* `artistName` or `master_metadata_album_artist_name` (string) - artist name
* `trackName` or `master_metadata_track_name` (string) - track name
* `msPlayed` or `ms_played` (number) - milliseconds played

Parameters names are based on the content of listening history files from Spotify. Because parameters names are different for the listening history from the last year and for the extended listening history, there are 2 possible parameters names. You can just grab content of those files and send it to this endpoint.

## DELETE /trackPlays/{id}
Delete track play with given `id` from database.

## GET /trackPlays
Get your track plays from database.

Optional query parameters:
* `startDate` (date) - since when track plays will be taken into account
* `endDate` (date) - until when track plays will be taken into account

Returns an array of track plays which contain parameters:
* `endTime` (date) - track end time
* `artistName` (string) - artist name
* `trackName` (string) - track name
* `msPlayed` (number) - milliseconds played

## GET /stats/songs
Get a ranking of your most played songs.

Optional query parameters:
* `startDate` (date) - since when track plays will be taken into account
* `endDate` (date) - until when track plays will be taken into account

Returns an array of tracks which contain parameters:
* `position` (number) - position of the track in the ranking of the most played tracks
* `artistName` (string) - artist name
* `trackName` (string) - track name
* `totalMsPlayed` (number) - total milliseconds played

## GET /stats/artists
Get a ranking of your most played artists.

Optional query parameters:
* `startDate` (date) - since when track plays will be taken into account
* `endDate` (date) - until when track plays will be taken into account

Returns an array of artists which contain parameters:
* `position` (number) - position of the artist in the ranking of the most played artists
* `artistName` (string) - artist name
* `totalMsPlayed` (number) - total milliseconds played

## GET /stats/song
Get song stats.

Required body parameters:
* `artistName` (string) - artist name
* `trackName` (string) - track name

Returns an object with parameters:
* `artistName` (string) - artist name
* `trackName` (string) - track name
* `firstPlay` (date) - date of the first play
* `totalMsPlayed` (number) - total milliseconds played
* `fullSongPlays` (number) - how many times the track was fully played
* `mostPopularDays` (array) - returns an array of days when the track was most played - they contain `date` (string) and  `fullSongPlays` (number)

