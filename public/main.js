var HNSM=function(){"use strict";function e(e){for(var a=0,i=this.length;a<i;a++)n(this[a],"active");var o=e.target;o&&"a"==o.tagName.toLowerCase()&&t(o.parentNode,"active")}function t(e,t){var n=e.className.trim();return""==n?(e.className=t,1):n==t?0:n.indexOf(" "+t)>=0||n.indexOf(t+" ")>=0?0:(e.className+=" "+t,1)}function n(e,t){var n=e.className.trim();if(""==n)return 0;if(n==t)return e.className="",0;var a=" "+t;return n.indexOf(a)>=0?(e.className=e.className.replace(a,""),1):(a=t+" ",n.indexOf(a)>=0?(e.className=e.className.replace(a,""),1):0)}var a={base:"https://api.hackerwebapp.com/"},i={items2dom:function(e){for(var t=[],n=0,a=e.length;n<a;n++){var i=e[n],o="#!/comments/"+i.id,r=i.title;i.domain&&(r+=" ("+i.domain+")");var s=m("span.badge[data-badge="+i.points+"]","Points");null===i.points&&(s="");var c=[m("h5",m("a[href="+i.url+"][target=_blank][rel=noopener]",r)),m(".columns",[m(".column.col-3",s),m(".column.col-3",m("span.badge[data-badge="+i.comments_count+"]",m("a[href="+o+"]","Comments"))),m(".column.col-3",m("span.user","by "+i.user)),m(".column.col-3",m("span.time",i.time_ago))]),m(".divider")];t.push(c)}return t}},o=function(e){return{loading:!0,items:[],oninit:function(){this.loading=!0;var t=m.route.param("page")||1,n=a.base+e+"?page="+t,i=this;m.request(n).then(function(e){i.items=e,i.loading=!1})},view:function(){return this.loading?m(".loading"):i.items2dom(this.items)}}},r={loading:!0,items:[],oninit:function(){this.loading=!0;var e=m.route.param("user"),t=a.base+"user/"+e,n=this;m.request(t).then(function(e){n.items=e,n.loading=!1})},view:function(){return this.loading?m(".loading"):i.items2dom(this.items)}},s={loading:!0,items:[],oninit:function(){this.loading=!0;var e=m.route.param("user"),t=a.base+"user/"+e,n=this;m.request(t).then(function(e){n.items=e,n.loading=!1})},view:function(){return this.loading?m(".loading"):i.items2dom(this.items)}},c=document.getElementById("container"),l=console.log.bind(console);!function(){var e=location.hostname;if("localhost"==e||e.match(/\.localhost$/))return 0;if("https:"==location.protocol)return 0;var t=location.href.replace(/^http:/,"https:");location.href=t}(),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(e){l("ServiceWorker registration successful with scope: ",e.scope)},function(e){l("ServiceWorker registration failed: ",e)})}),function(){var t=document.getElementById("navigation"),n=t.querySelectorAll(".tab-item");t.addEventListener("click",e.bind(n));var a=location.hash.substr(3).replace(/\/.*/,"");""==a&&(a="news");var i=t.querySelector("a[data-link="+a+"]");e.call(n,{target:i})}();var u={router:m.route(c,"/",{"/":o("news"),"/news/:page":o("news"),"/newest/:page":o("newest"),"/ask/:page":o("ask"),"/show/:page":o("show"),"/jobs/:page":o("jobs"),"/user/:user":r,"/comm/:item":s})};return function(){var e=document.createElement("link");e.rel="stylesheet",e.href="ext/spectre.css",document.querySelector("head").appendChild(e)}(),u}();
//# sourceMappingURL=main.js.map
