function renderGrid(grid) {
    grid.forEach((row) => {
        row.forEach((column) => {
            renderCell(column);
        });
    });
}

function renderCell(cell) {
    const button = document.createElement("button");
    button.dataset.row = cell.row;
    button.dataset.column = cell.column;
    button.dataset.player = cell.player;
    if (cell.isShipCell) {
        button.classList.add('unhit-ship');
    }

    if (cell.player === "player") {
        const gridDiv = document.querySelector(".left-player");
        gridDiv.appendChild(button);
    } else {
        const gridDiv = document.querySelector(".right-player");
        gridDiv.appendChild(button);
    }
}

export { renderGrid };
