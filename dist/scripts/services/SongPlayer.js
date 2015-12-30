(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc current album
        * @type {Object}
        */
        
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc play a song
        * @param {Object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function stopSong
        * @desc stop a song
        * @param {Object} song
        */
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };
        
        /**
        * @function getSongIndex
        * @desc get index of song in the songs array
        * @param {Object} song
        * @returns {Number}
        */
        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }; 
                
        /**
        * @desc active song object from list of songs
        * @type {Object}
        */
        
        SongPlayer.currentSong = null;
        
        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }   
        };
        
        /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function previous
        * @desc stop the currently playing song and set to previous song in album
        * @param {Object} song
        */
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function next
        * @desc stop the currently playing song and set to next song in album
        * @param {Object} song
        */
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            var lastSongIndex = currentAlbum.songs.length - 1;
            
            if (currentSongIndex > lastSongIndex) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    };
 
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();