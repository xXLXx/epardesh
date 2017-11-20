
 angular.module("ui.bootstrap.pagination", []).constant("paginationConfig", {boundaryLinks: !1, directionLinks: !0, firstText: "First", previousText: "Previous", nextText: "Next", lastText: "Last"}).directive("pagination", ["paginationConfig", function(t) {
        return{restrict: "EA", scope: {numPages: "=", currentPage: "=", maxSize: "=", onSelectPage: "&"}, templateUrl: "template/pagination/pagination.html", replace: !0, link: function(e, n, o) {
                function a(t, e, n, o) {
                    return{number: t, text: e, active: n, disabled: o}
                }
                var i = angular.isDefined(o.boundaryLinks) ? e.$eval(o.boundaryLinks) : t.boundaryLinks, r = angular.isDefined(o.directionLinks) ? e.$eval(o.directionLinks) : t.directionLinks, l = angular.isDefined(o.firstText) ? o.firstText : t.firstText, s = angular.isDefined(o.previousText) ? o.previousText : t.previousText, c = angular.isDefined(o.nextText) ? o.nextText : t.nextText, u = angular.isDefined(o.lastText) ? o.lastText : t.lastText;
                e.$watch("numPages + currentPage + maxSize", function() {
                    e.pages = [];
                    var t = 1, n = e.numPages;
                    e.maxSize && e.maxSize < e.numPages && (t = Math.max(e.currentPage - Math.floor(e.maxSize / 2), 1), n = t + e.maxSize - 1, n > e.numPages && (n = e.numPages, t = n - e.maxSize + 1));
                    for (var o = t; n >= o; o++) {
                        var p = a(o, o, e.isActive(o), !1);
                        e.pages.push(p)
                    }
                    if (r) {
                        var d = a(e.currentPage - 1, s, !1, e.noPrevious());
                        e.pages.unshift(d);
                        var f = a(e.currentPage + 1, c, !1, e.noNext());
                        e.pages.push(f)
                    }
                    if (i) {
                        var g = a(1, l, !1, e.noPrevious());
                        e.pages.unshift(g);
                        var m = a(e.numPages, u, !1, e.noNext());
                        e.pages.push(m)
                    }
                    e.currentPage > e.numPages && e.selectPage(e.numPages)
                }), e.noPrevious = function() {
                    return 1 === e.currentPage
                }, e.noNext = function() {
                    return e.currentPage === e.numPages
                }, e.isActive = function(t) {
                    return e.currentPage === t
                }, e.selectPage = function(t) {
                    !e.isActive(t) && t > 0 && e.numPages >= t && (e.currentPage = t, e.onSelectPage({page: t}))
                }
            }}
    }]),    angular.module("template/pagination/pagination.html", []).run(["$templateCache", function(t) {
        t.put("template/pagination/pagination.html", '<div class="pagination"><ul>\n  <li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  </ul>\n</div>\n')
    }]);