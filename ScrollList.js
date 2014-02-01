(function(window, document){

    var winHeight = window.innerHeight,
        body = document.body,
        slice = [].slice,
        CELLHEIGHT = 150,
        listContainer = document.createElement('ul'),
        listContainerStyle = listContainer.style,
        cells = Math.floor(winHeight/CELLHEIGHT) + 4,
        cellsFrag = document.createDocumentFragment(),
        scrollTimer,
        cellOutOfViewCount = 0,
        pageCount = 20,
        scrollPos = 1,
        scrollTop = lastScrollTop = body.scrollTop,
        cellsState = {};

    function isElementInViewport (el) {
      var elemPostion = el.getBoundingClientRect(),
          html = document.documentElement;

      return (
        !!elemPostion &&
        elemPostion.bottom >= 0 &&
        elemPostion.right >= 0 &&
        elemPostion.top <= html.clientHeight &&
        elemPostion.left <= html.clientWidth
      );
    }

    function checkCells() {
        var cells = slice.call(listContainer.children);

        scrollTop = body.scrollTop;

        scrollPos = (scrollTop > lastScrollTop) ? 1 : 0;

        cells.forEach(function(cell, i) {
            cellsState[i] = {
                inViewport: true
            };
            if(!isElementInViewport(cell)) {
                cellOutOfViewCount++;
                cellsState.inViewport = false;
                listContainerStyle.paddingTop = parseInt(listContainerStyle.paddingTop || 0, 10) + CELLHEIGHT + 'px';
                if(scrollPos) {
                    cell.style.order = cells.length + cellOutOfViewCount;
                } else {
                    cell.style.order = '1';
                }
                cell.innerText = 'Cell ' + (i+1) + ' has now become Cell ' + (cells.length + cellOutOfViewCount);
            }
            // else {
            //     if(cell.offsetTop > winHeight && !scrollPos) {
            //         console.log('not really in view');
            //         cell.style.order = '';
            //         listContainerStyle.paddingTop = parseInt(listContainerStyle.paddingTop || 0, 10) - CELLHEIGHT + 'px';
            //     }
            // }
        });

        lastScrollTop = body.scrollTop;
    }

    for(var i = 0; i < cells; i++) {
        var cell = document.createElement('li');
        cell.className = 'scrolllist__cell';
        cell.appendChild(document.createElement('h1').appendChild(document.createTextNode('Cell ' + (i+1))));
        cellsFrag.appendChild(cell);
    }

    listContainer.className = 'scrolllist';
    listContainerStyle.minHeight = pageCount * CELLHEIGHT + 'px';
    listContainer.appendChild(cellsFrag);
    body.appendChild(listContainer);

    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(function() {
            checkCells();
        }, 100);
    });

}(this, this.document));