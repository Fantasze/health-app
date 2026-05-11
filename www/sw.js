// Service Worker for PWA
// v7.13: network-first to avoid stale login/register pages during testing
const CACHE_NAME = 'health-app-v713';
const ASSETS = [
  './index.html',
  './login.html',
  './student_register.html',
  './app.html',
  './diet.html',
  './stats.html',
  './profile.html',
  './browse_coaches.html',
  './firebase-config.js',
  './auth_utils.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS).catch(() => undefined))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map((name) => {
      if (name !== CACHE_NAME) return caches.delete(name);
    }))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => undefined);
      return response;
    }).catch(() => caches.match(event.request))
  );
});
