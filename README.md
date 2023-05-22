# spotify-stats-api
API which will allow you to see your spotify stats - top listened songs in some period, how many times you've listened to a song etc.

Spotify allows you to download your account data which include listening history. Based on this data you'll be able to check your stats using this API.

In privacy settings on the Spotify website you can get listening history from the last year or extended listening history for the lifetime of your account. This data are saved in json files. For the listening history from the last year single item of data is saved in this format:
```
  {
    "endTime" : "2022-06-26 00:34",
    "artistName" : "The Beatles",
    "trackName" : "Yesterday - Remastered 2009",
    "msPlayed" : 125666
  }
```
whereas for the extended listening history single item of data is saved in this format:
```
  {
    "ts": "2022-06-26T00:34:44Z",
    "master_metadata_album_artist_name": "The Beatles",
    "master_metadata_track_name": "Yesterday - Remastered 2009",
    "ms_played": 125666,
    ...
  }
```
Endpoint `POST /trackPlays` which allows you to save track plays in database supports both formats. You can just grab the content of the file with the listening history and put it in request body.

## Technologies
* Node.js
* Express.js
* MongoDB
* TypeScript

## Status
Project is _in progress_
