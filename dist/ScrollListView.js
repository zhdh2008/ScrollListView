!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.ScrollListView=e()}}(function(){return function e(t,i,n){function l(s,o){if(!i[s]){if(!t[s]){var h="function"==typeof require&&require;if(!o&&h)return h(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=i[s]={exports:{}};t[s][0].call(c.exports,function(e){var i=t[s][1][e];return l(i?i:e)},c,c.exports,e,t,i,n)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)l(n[s]);return l}({1:[function(e,t){function i(e){var t=e.element.parentNode||n,i=t.offsetHeight;this.element=e.element,this.elementStyle=e.element.style,this.container=t,this.containerHeight=i,this.cells=null,this.data=e.data,this.CELLHEIGHT=e.cellHeight,this.cellsWithinViewportCount=2*Math.ceil(this.containerHeight/this.CELLHEIGHT),this.cellsOutOfViewportCount=this.cellsWithinViewportCount,this.cellsFrag=document.createDocumentFragment(),this.direction=0,this.isScrollingDown=!0,this.currentCell=null,this.cellIndex=1,this.isTopCellOutOfView=!1,this.renderFn=e.renderFn,this.renderCellFn=e.renderCellFn,this.render(),this.container.addEventListener("scroll",this.onScroll.bind(this),!1),window.addEventListener("resize",this.onResize.bind(this),!1)}var n=(e("./utils").winHeight,e("./utils").body),l=e("./utils").slice,r=e("./utils").orderProp,s=e("./utils").scrollTop,o=e("./utils").lastScrollTop,h=e("./utils").resizeTimer;t.exports=i,i.prototype={render:function(){this.renderFn||console.error("You need to define a renderFn"),this.renderFn.call(this,this.cellsWithinViewportCount)},renderCell:function(e,t){this.renderCellFn||console.error("You need to define a renderCellFn"),this.renderCellFn.call(this,e,t)},isTopElementOutOfViewport:function(e){var t=e.getBoundingClientRect();return!!t&&t.bottom<=-(2*this.CELLHEIGHT)},isBottomElementOutOfViewport:function(e){var t=e.getBoundingClientRect();return!!t&&t.top>this.containerHeight+2*this.CELLHEIGHT},onScroll:function(){s=this.container.scrollTop,this.direction=s-o,this.checkCells()},onResize:function(){clearTimeout(h),h=setTimeout(function(){this.containerHeight=this.container.offsetHeight}.bind(this),250)},getCurrentCell:function(e){return this.cells[e%this.cells.length]},checkCells:function(){this.cells=this.cells||l.call(this.element.children),this.isScrollingDown=this.direction>0,this.currentCell=this.getCurrentCell(this.cellsOutOfViewportCount),this.isScrollingDown?(this.isTopCellOutOfView=this.isTopElementOutOfViewport(this.currentCell),this.isTopCellOutOfView&&this.cellsOutOfViewportCount<this.data.length&&(this.cellsOutOfViewportCount++,this.cellIndex=this.cellsOutOfViewportCount,this.elementStyle.paddingTop=parseInt(this.elementStyle.paddingTop||0,10)+this.CELLHEIGHT+"px",this.currentCell.style[r]=this.cellIndex,this.renderCell(this.currentCell,this.cellIndex-1))):this.isScrollingDown||(this.currentCell=this.getCurrentCell(this.cellsOutOfViewportCount-1),this.isBottomCellOutOfView=this.isBottomElementOutOfViewport(this.currentCell),this.isBottomCellOutOfView&&this.cellsOutOfViewportCount>this.cellsWithinViewportCount&&(this.cellIndex=this.cells[this.cellsOutOfViewportCount--%this.cells.length].style[r]-1,this.elementStyle.paddingTop=parseInt(this.elementStyle.paddingTop||0,10)-this.CELLHEIGHT+"px",this.currentCell.style[r]=this.cellIndex,this.renderCell(this.currentCell,this.cellIndex-1))),o=this.container.scrollTop}}},{"./utils":2}],2:[function(e,t,i){var n,l=window.innerHeight,r=document.body,s=[].slice,o="webkitOrder"in r.style?"webkitOrder":"order",h=r.scrollTop,c=r.scrollTop;i.winHeight=l,i.body=r,i.slice=s,i.orderProp=o,i.scrollTop=h,i.lastScrollTop=c,i.resizeTimer=n},{}]},{},[1])(1)});