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

## How to use this API
To run this API you should first create a MongoDB database instance. Also you should create app in spotify for developers page (https://developer.spotify.com/).

In order to be able to reach endpoints, you'll have to create `.env` in the root folder file containing three environment variables: `MONGO_URI` (URI of your MongoDB database), `CLIENT_ID` (Client ID which you can see in settings of your app in spotify for developers) and `CLIENT_SECRET` (Client secret which you can see in settings of your app in spotify for developers).

After running API, first you should authorize which you can do by reaching `/login` endpoint - since you'll be redirected to the spotify login page, the best option would be to do it in browser. After logging in using your credentials you'll see a json containing access token and refresh token. Now you can reach all endpoint by adding the refresh token (with `Bearer ` prefix) to `Authorization` header. 

## Technologies
* Node.js
* Express.js
* MongoDB
* TypeScript

## Status
Project is _in progress_
