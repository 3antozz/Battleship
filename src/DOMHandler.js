function DOMHandler () {
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
        if (cell.isShipCell && cell.player === 'player') {
            button.classList.add('unhit-ship');
            button.dataset.ship = cell.ship.name;
        }
        if (cell.isHit) {
            button.classList.add('hit-cell');
            if (cell.isShipCell) {
                button.classList.remove('hit-cell');
                button.classList.remove('unhit-ship');
                button.classList.add('hit-ship');
            }
        }
    
        if (cell.player === "player") {
            const gridDiv = document.querySelector(".left-player");
            gridDiv.appendChild(button);
        } else {
            const gridDiv = document.querySelector(".right-player");
            gridDiv.appendChild(button);
        }
    }
    
    function clearGrid (gridDom) {
        gridDom.textContent = "";
    }
    
    function renderShotStatus (message) {
        const p = document.querySelector(".hit");
        p.textContent = message;
    
    }
    return {renderGrid, clearGrid, renderShotStatus}
}

module.exports = DOMHandler;
