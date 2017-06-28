var HNSM=function(){"use strict";function e(t){for(var r=[],a=0,n=t.length;a<n;a++){var s=t[a],i=s.content,o=[m.trust(i),m(".stats",s.time_ago+" by "+s.user)];s.comments.length&&o.push(e(s.comments)),0==s.level&&o.push(m(".divider")),r.push(m(".comment[style=margin-left: "+2*s.level+"rem]",o))}return r}function t(e){for(var t=0,r=this.length;t<r;t++)n.rmClass(this[t],"active");var a=e.target;a&&"a"==a.tagName.toLowerCase()&&n.adClass(a.parentNode,"active")}var r={base:"https://api.hackerwebapp.com/"},a=console.log.bind(console),n={items2dom:function(e){for(var t=[],r=0,a=e.length;r<a;r++){var n=e[r],s=n.title;n.domain&&(s+=" ("+n.domain+")");var i=[];null!==n.points&&i.push(m("span.badge[data-badge="+n.points+"]","Points")),i.push(m("span.badge[data-badge="+n.comments_count+"]",m("a[href=#!/item/"+n.id+"]","Comments"))),n.user&&i.push(m("span.user",m("a[href=#!/user/"+n.user+"]","by "+n.user))),i.push(m("span.time",n.time_ago));for(var o=[],u=0,c=i.length;u<c;u++)o.push(m(".text-center.column.col-"+12/c,i[u]));var l=m(".news-item",[m("h5",m("a[href="+n.url+"][target=_blank][rel=noopener]",s)),m(".columns",o),m(".divider")]);t.push(l)}return t},comms2dom:e,adClass:function(e,t){var r=e.className.trim();return""==r?(e.className=t,1):r==t?0:r.indexOf(" "+t)>=0||r.indexOf(t+" ")>=0?0:(e.className+=" "+t,1)},rmClass:function(e,t){var r=e.className.trim();if(""==r)return 0;if(r==t)return e.className="",0;var a=" "+t;return r.indexOf(a)>=0?(e.className=e.className.replace(a,""),1):(a=t+" ",r.indexOf(a)>=0?(e.className=e.className.replace(a,""),1):0)},request:function(e){var t=!0;"object"==(typeof e).toLowerCase()&&("cache"in e&&(t=e.cache),e=e.url);var r,n=sessionStorage;if(n&&t&&(r=n.getItem(s+e)))try{var i=JSON.parse(r);return new Promise(function(e){e(i)})}catch(e){a(e)}return m.request(e).then(function(t){return n&&n.setItem(s+e,JSON.stringify(t)),t})},log:a},s="hnsm-",i=function(e){return{loading:!0,items:[],oninit:function(){this.loading=!0;var t=m.route.param("page")||1,a=r.base+e+"?page="+t,s=this;n.request(a).then(function(e){s.items=e,s.loading=!1,m.redraw()})},view:function(){return this.loading?m(".loading"):n.items2dom(this.items)}}},o={loading:!0,user:!1,oninit:function(){this.loading=!0;var e=m.route.param("user"),t=r.base+"user/"+e,a=this;n.request(t).then(function(e){a.user=e,a.loading=!1})},view:function(){return this.loading?m(".loading"):(n.log(this.user),[m("h4",this.user.id),m(".karma","karma: "+this.user.karma),m(".time","created: "+this.user.created),m.trust(this.user.about)])}},u={loading:!0,item:!1,oninit:function(){this.loading=!0;var e=m.route.param("id"),t=r.base+"item/"+e,a=this;n.request({url:t,cache:!1}).then(function(e){a.item=e,a.loading=!1})},view:function(){if(this.loading)return m(".loading");var e=[m("h4",this.item.title)];return 0!=this.item.url.indexOf("item?")&&e.push(m(".url",m("a[rel=noopener][target=_blank][href="+this.item.url+"]",this.item.url))),e.push(m(".stats",this.item.time_ago+" by "+this.item.user)),e.push(m("h5","Comments")),e.push(n.comms2dom(this.item.comments)),e}},c=document.getElementById("container");return function(){var e=location.hostname;if("localhost"==e||e.match(/\.localhost$/))return 0;if("https:"==location.protocol)return 0;var t=location.href.replace(/^http:/,"https:");location.href=t}(),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(e){n.log("ServiceWorker registration successful with scope: ",e.scope)},function(e){n.log("ServiceWorker registration failed: ",e)})}),function(){var e,r=document.getElementById("navigation"),a=document.querySelector("head meta[name=theme-color]");a&&(e=a.getAttribute("content"))&&(r.style.backgroundColor=e);var n=r.querySelectorAll(".tab-item");r.addEventListener("click",t.bind(n));var s=location.hash.substr(3).replace(/\/.*/,"");""==s&&(s="news");var i=r.querySelector("a[data-link="+s+"]");t.call(n,{target:i})}(),{router:m.route(c,"/",{"/":i("news"),"/news/:page":i("news"),"/newest/:page":i("newest"),"/ask/:page":i("ask"),"/show/:page":i("show"),"/jobs/:page":i("jobs"),"/user/:user":o,"/item/:id":u})}}();
//# sourceMappingURL=main.js.map
