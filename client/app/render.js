export class Render {

    renderTotalQty = (qty) => {
        const albumsTableTotalQty = document.getElementById('tableHeader');
        const span = document.createElement('span');
        span.innerText = `(${qty})`;

        albumsTableTotalQty.appendChild(span);


    }

    renderAlbumList = (albumList) => {
        const table = $('#albumList');
        table.append($('<thead></thead>').append($('<tr></tr>').append($('<th></th>').attr('scope', 'col').text('#'), $('<th></th>').attr('scope', 'col').text('Title'))));

        const tbody = $('<tbody></tbody>');
        table.append(tbody);

        albumList.forEach(item => {

            tbody.append($('<tr></tr>').append($('<td></td>').text(item.AlbumId), $('<td></td>').text(item.Title)));

        })
    }
}