
(function(){
    var oContainer = document.querySelector("#page-box");
    var page = new LHYPage({
        container: oContainer,
        curPage: 88,
        allPage: 100,
        callBack: function(curPage) {
            console.log(curPage);
        }
    });
})();

