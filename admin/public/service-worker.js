if (workbox) {
    console.log(`Workbox is loaded`);

    self.__precacheManifest = [].concat(self.__precacheManifest || []);
    workbox.precaching.suppressWarnings();
    workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

} else {
    console.log(`Workbox didn't load`);
}