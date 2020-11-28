export class Render {

    renderTotalQty = (qty, fetchAlbumsByPage) => {
        const albumsTableTotalQty = $('#tableHeader');
        const span = $('<span></span>').text(`${qty}`);

        albumsTableTotalQty.append(span);

        let numberOfPages = Math.floor(qty / 10);
        const restOfItems = qty - numberOfPages * 10;
        if (restOfItems > 0) {
            numberOfPages += 1;
        }

        const ul = $('#pageCounter');

        for (let i = 1; i <= numberOfPages; i++) {

            let li = $('<li></li>').text(`${i}`).click(() => fetchAlbumsByPage(`${i}`));

            ul.append(li);
        }


    }

    renderAlbumList = (albumList) => {

        const table = $('#albumList');
        table.empty();

        table.append($('<thead></thead>').append($('<tr></tr>').append($('<th></th>').attr('scope', 'col').text('#'), $('<th></th>').attr('scope', 'col').text('Title'))));

        const tbody = $('<tbody></tbody>');
        table.append(tbody);

        albumList.forEach(item => {

            tbody.append($('<tr></tr>').append($('<td></td>').text(item.AlbumId), $('<td></td>').text(item.Title)));

        })
    }
}