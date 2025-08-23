// service worker for offline functionality

// a unique name for ur cache storage
// changing the version string (v1,v2etc) browser na to refresh cached files when u release updates
const CACHE_NAME = "friends-tracker-v1";
// list of files to save("precache") for offline use
const urlsToCache = [
    // so caching homepage , index.html and manifest.json
    '/',
    '/index.html',
    '/manifest.json'
];
// here css , js and images can also be added

// install service worker 
// runs when the service worker is first installed 
self.addEventListener('install', event => {
    event.waitUntil( // ensures the install dont finish until caching completes
        caches.open(CACHE_NAME)  // opens a storage area in the browser
        .then(cache =>{ 
            return cache.addAll(urlsToCache); // saves the listed files offline
        })
    );
});

// fetch from cache
self.addEventListener('fetch',event=>{
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            return response || fetch(event.request);
        })
    )
});

// has all the network request the app makes
// checks if request is already stored offline
// if found return the cached respone
// if not foudn -> fetches it from the internet
// this makes ur app load instantly if cached and works offline for those files

// summary
// on install precaches important files such as html , manifest
// on fetch - provides cached files and if not cached , it will use internet to cache them

// This provides the app with : 1.offline support
// 2. faster loading (since cached files load instantly)
// 3. version control of cache via CACHE_NAME