const http = require('http');
const fs = require('fs');

const artists = JSON.parse(fs.readFileSync('./seeds/artists.json'));
const albums = JSON.parse(fs.readFileSync('./seeds/albums.json'));
const songs = JSON.parse(fs.readFileSync('./seeds/songs.json'));

let nextArtistId = 2;
let nextAlbumId = 2;
let nextSongId = 2;

function getNextId(entityName) {
  let nextId;
  switch (entityName) {

    case 'artists':
          nextId = nextArtistId;
          nextArtistId++;
          return nextId;
          break;

    case 'albums':
          nextId = nextAlbumId;
          nextAlbumId++;
          return nextId;
          break;      

    case 'songs':
          nextId = nextSongId;
          nextSongId++;
          return nextId;
          break;   

    case 'default':
          break;          
  }
  
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
    if (reqBody) {
      switch(req.headers['content-type']) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    // GET /artists
    if (req.method === "GET" && req.url === "/artists") {
      const resBody = JSON.stringify(Object.values(artists));
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(resBody);
      return res.end();
    }
    
    //GET /artists/:artistId
    if (req.method === 'GET' && req.url.startsWith('/artists/') && req.url.split('/').length === 3) {
       const artistId = req.url.split('/')[2];
       let resBody = artists[artistId];
       if (resBody === undefined) resBody = {message: `There is no artist with artistId = ${artistId}`};
  
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(resBody));
      return res.end();
    }


    //POST /artists
    if (req.method === 'POST' && req.url === '/artists') {
  
      const newArtistObject = {
                                "artistId": nextArtistId,
                                "name": req.body.name
                              }

      artists[nextArtistId] = newArtistObject;     
      console.log(artists);
      getNextId('artists');

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(newArtistObject));
      return res.end();
    }

    // PUT /artists/:artistId
    if ((req.method === 'PUT' || req.method === 'PATCH') && req.url.startsWith('/artists/') && req.url.split('/').length === 3) {
      const artistId = req.url.split('/')[2];
      if (Object.keys(artists).includes(artistId)) artists[artistId].name = req.body.name;
      let resBody = artists[artistId] !== undefined ? artists[artistId] : {message: `There is no artist with artistId = ${artistId}`};

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(resBody));
      return res.end();
      
    }
   
    //DELETE /artists/:artistId
    if (req.method === 'DELETE' && req.url.startsWith('/artists/') && req.url.split('/').length === 3) {
       const artistId = req.url.split('/')[2];
       let resBody;

       if (Object.keys(artists).includes(artistId)) {
          delete artists[artistId];
          resBody = {message: "Succesfully deleted"};
       } else {
          resBody =  {message: `There is no artist with artistId = ${artistId}`};
       }  
  
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.write(JSON.stringify(resBody));
       return res.end();
    }

    //GET /artists/:artistId/albums
    if (req.method === 'GET' && req.url.startsWith('/artists/') && req.url.endsWith('/albums') && req.url.split('/').length === 4) {
       const artistId = req.url.split('/')[2]; 
       let albumsByArtist = {};
       for (let album in albums) {
            if (albums[album].artistId === parseInt(artistId)) albumsByArtist[album] = albums[album];
       }

       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.write(JSON.stringify(albumsByArtist));
       return res.end();
       
    }

    //GET /albums/:albumId
    if (req.method === 'GET' && req.url.startsWith('/albums/') && req.url.split('/').length === 3) {
        const albumId = req.url.split('/')[2];
        const album = albums[albumId];
        let resBody = album ? album : {message: `There is no album with albumId = ${albumId}`};
   
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(resBody));
        return res.end();
    } 

    //POST /artists/:artistId/albums
    if (req.method === 'POST' && req.url.startsWith('/artists') && req.url.endsWith('/albums') && req.url.split('/').length === 4) {
        const artistId = parseInt(req.url.split('/')[2]);  
        let resBody;

        if (Object.keys(artists).includes(artistId.toString())) {
            const newAlbumObject = {
                                    "albumId": nextAlbumId,
                                    "name": req.body.name,
                                    "artistId": artistId
                                   }  
  
            albums[nextAlbumId] = newAlbumObject;
            getNextId('albums');
            resBody = newAlbumObject;
        }  else {
            resBody =  {message: `There is no artist with artistId = ${artistId}`};
        }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(resBody));
            return res.end();
        
    }

    //PUT /albums/:albumId
    if ((req.method === 'PUT' || req.method === 'PATCH') && req.url.startsWith('/albums/') && req.url.split('/').length === 3) {
        const albumId = req.url.split('/')[2];
        let resBody;
            console.log('1.albumId', albumId);
        if (albums[albumId]) {
           albums[albumId].name  = req.body.name;
           resBody = albums[albumId];
        } else {
           resBody = {message: `There is no album with albumId = ${albumId}`};
        } 
          
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(resBody));
        return res.end();
    }

    //DELETE /albums/:albumId
    if (req.method === 'DELETE' && req.url.startsWith('/albums/') && req.url.split('/').length === 3) {
       const albumId = req.url.split('/')[2];
       let resBody;

         if (albums[albumId]) {
          const deleteResult = delete albums[albumId];
          resBody = {message: "Succesfully deleted"};
         } else {
           resBody = {message: `There is no album with albumId = ${albumId}`};
        }  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(resBody));
        return res.end();
       
    }

    // GET /artists/:artistId/songs
    if (req.method === 'GET' && req.url.startsWith('/artists/') && req.url.endsWith('/songs') && req.url.split('/').length === 4) {
       const artistId = req.url.split('/')[2];

       let albumsIdByArtist = [];
       for (let album in albums) {
         if (albums[album].artistId === parseInt(artistId)) {
            albumsIdByArtist.push(albums[album].albumId);
         }
       }
      
       let songsByArtistObject = {}
       for (let song in songs) {
         if (albumsIdByArtist.indexOf(songs[song].albumId) >= 0) {
            songsByArtistObject[song] = songs[song];
         }
       }

       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.write(JSON.stringify(songsByArtistObject));
       return res.end();

    }

    // GET /albums/:albumId/songs
    if (req.method === 'GET' && req.url.startsWith('/albums/') && req.url.endsWith('/songs') && req.url.split('/').length === 4) {
        const albumId = req.url.split('/')[2]    
        let songsByAlbumId = {};
        for (let song in songs) {
            if (songs[song].albumId === parseInt(albumId)) songsByAlbumId[song] = songs[song];
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(songsByAlbumId));
        return res.end(); 
    }

    //GET /songs/:songId
    if (req.method === 'GET' && req.url.startsWith('/songs/') && req.url.split('/').length === 3 ) {
       const songId = req.url.split('/')[2];
       let resBody = songs[songId] ? songs[songId] : {message: `There is no album with songId = ${songId}`};
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.write(JSON.stringify(resBody));
       return res.end();
    } 

    //POST /albums/:albumId/songs
    if (req.method === 'POST' && req.url.startsWith('/albums/') && req.url.endsWith('/songs') && req.url.split('/').length === 4) {
        const albumId = parseInt(req.url.split('/')[2]);        
        const newSongObject = { 
                                "songId": nextSongId,
                                "name": req.body.name,
                                "trackNumber": req.body.trackNumber,      
                                "albumId": albumId,
                                "lyrics": req.body.lyrics
        }

         songs[nextSongId] = newSongObject;
         getNextId('songs');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(newSongObject));
        return res.end();
    }


    //PUT songs/:songId 
    if ((req.method === 'PUT') || (req.method === 'PATCH') && req.url.startsWith('/songs/') && req.url.split('/').length === 3) {
       const songId = req.url.split('/')[2];
       let resBody;
       if (songs[songId]) {

         if (req.method === 'PUT') {
          songs[songId].name = req.body.name;
          songs[songId].trackNumber = req.body.trackNumber;
          songs[songId].lyrics = req.body.lyrics;
         } else {
          if (req.body.name) songs[songId].name = req.body.name;
          if (req.body.trackNumber) songs[songId].trackNumber = req.body.trackNumber;
          if (req.body.lyrics) songs[songId].lyrics = req.body.lyrics;
         }

         resBody = songs[songId];
       } else {
         resBody = {message: `There is no album with songId = ${songId}`};
       }
       
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(resBody));
      return res.end();
    }


    //DELETE /songs/:songId
    if (req.method === 'DELETE' && req.url.startsWith('/songs/') && req.url.split('/').length === 3) {
        const songId = req.url.split('/')[2];
        let resBody;

        if (songs[songId]) {
          const deleteResult = delete songs[songId];
          resBody = {message: "Succesfully deleted"};
        } else {
           resBody = {message: `There is no album with songId = ${songId}`};
        } 

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(resBody));
        return res.end();
      
    }
  
    

    // Route handlers here
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write("Endpoint not found");
    return res.end();
  });

});

const port = 3000;

server.listen(port, () => console.log('Server is listening on port', port));
