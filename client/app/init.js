import { Render } from './render.js';

const render = new Render();


countAllAlbums();

fetchAlbumsByPage(1);

async function countAllAlbums() {
    const res = await fetch('/api/albums/count');

    if (!res.ok || res.status !== 200) {
        console.log(`Data fetch error: ${res.status}`);
        return;
    }

    const data = await res.json();
    render.renderTotalQty(data, fetchAlbumsByPage);

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

async function fetchAlbumsByPage(page) {

    const res = await fetch(`api/albums/pagination/${page}`);

    if (!res.ok || res.status !== 200) {
        console.log(`Fetch error on page ${page}: ${res.status}`);
    }

    const data = await res.json();

    render.renderAlbumList(data);
};