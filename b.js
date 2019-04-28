<script type='text/javascript'>
// Configuration -----------
var postsDatePrefix = false;
var accessOnly = false;
 
var useApiV3 = false;
var apiKey = "AIzaSyDcPVlpXDnjoVWBOW2rOx0EAjkyufamY4c";
var blogId = "blogid";
// -------------------------
var postsOrPages=["pages","posts"],urlTotal,jsonIndex=1,secondRequest=!0,feedPriority=0,amp="&amp;"[0],nextPageToken;function urlVal(){var url=window.location.pathname;var length=url.length;var urlEnd=url.substring(length-5);if(urlEnd===".html")return 0;else if(length&gt;1)return 1;else return 2}
function urlMod(){var url=window.location.pathname;if(url.substring(1,2)==="p"){url=url.substring(url.indexOf("/",1)+1);url=url.substr(0,url.indexOf(".html"));history.replaceState(null,null,"../"+url)}
else{if(!postsDatePrefix)url=url.substring(url.indexOf("/",7)+1);else url=url.substring(1);url=url.substr(0,url.indexOf(".html"));history.replaceState(null,null,"../../"+url)}}
function urlSearch(url,database){var pathname=url+".html";database.forEach(function(element){var search=element.search(pathname);if(search!==-1)window.location=element})}
function urlManager(){var validation=urlVal();if(validation===0){if(!accessOnly)urlMod()}
else if(validation===1){getJSON(postsOrPages[feedPriority],1)}
else if(validation===2){if(!accessOnly)history.replaceState(null,null,"/")}}
function getJSON(postsOrPages,index){var script=document.createElement('script');if(useApiV3){var jsonUrl="https://www.googleapis.com/blogger/v3/blogs/"+blogId+"/"+postsOrPages+"?key="+apiKey+"#maxResults=500#fields=nextPageToken%2Citems(url)#callback=bloggerJSON";if(nextPageToken)jsonUrl+="#pageToken="+nextPageToken;nextPageToken=undefined}
else var jsonUrl=window.location.protocol+"//"+window.location.hostname+"/feeds/"+postsOrPages+"/default?start-index="+index+"#max-results=150#orderby=published#alt=json-in-script#callback=bloggerJSON";jsonUrl=jsonUrl.replace(/#/g,amp);script.type='text/javascript';script.src=jsonUrl;document.getElementsByTagName('head')[0].appendChild(script)}
function bloggerJSON(json){var database=[];if(!useApiV3)if(urlTotal===undefined)urlTotal=parseInt(json.feed.openSearch$totalResults.$t);if(!useApiV3){try{json.feed.entry.forEach(function(element,index){var entry=json.feed.entry[index];entry.link.forEach(function(element,index){if(entry.link[index].rel==="alternate")database.push(entry.link[index].href)})})}
catch(e){}}
else{try{json.items.forEach(function(element,index){database.push(element.url)})}
catch(e){}
nextPageToken=json.nextPageToken}
urlSearch(window.location.pathname,database);if(urlTotal&gt;150){jsonIndex+=150;urlTotal-=150;getJSON(postsOrPages[feedPriority],jsonIndex)}
else if(nextPageToken){getJSON(postsOrPages[feedPriority])}
else if(secondRequest){nextPageToken=undefined;urlTotal=undefined;jsonIndex=1;secondRequest=!1;if(feedPriority===0){feedPriority=1;getJSON("posts",1)}
else if(feedPriority===1){feedPriority=0;getJSON("pages",1)}}}
function bloggerJS(priority){if(priority)feedPriority=priority;urlManager()}
bloggerJS();
</script>
