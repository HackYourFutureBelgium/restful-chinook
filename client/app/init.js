import { Render } from './render.js';

const render = new Render();


countAllAlbums();
fetchAlbumList();

async function countAllAlbums() {
    const res = await fetch('/api/albums/count');

    if (!res.ok || res.status !== 200) {
        console.log(`Data fetch error: ${res.status}`);
        return;
    }

    const data = await res.json();
    render.renderTotalQty(data);
}

async function fetchAlbumList() {
    const res = await fetch('/api/albums');

    if (!res.ok || res.status !== 200) {
        console.log(`Data fetch error: ${res.status}`);
        return;
    }

    const data = await res.json();

    render.renderAlbumList(data);
}

async function fetchAlbumById() {
    const res = await fetch('/api/albums/2');

    if (!res.ok || res.status !== 200) {
        console.log(`Data fetch error: ${res.status}`);
        return;
    }

    console.log(res);

    const data = await res.json();

    document.getElementById('root');

    console.log('Name of a Album #2: ' + data.Title);
}