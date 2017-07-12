/**
 * Created by guojv on 2017/7/9.
 */

function  insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement)
        parent.appendChild(newElement);
    else{
        parent.insertBefore(newElement,targetElement.nextSibling);  //把新元素插入到目标元素和目标元素的下一个兄弟元素之间。
    }
}

function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

function addClass(element,value){
    if(!element.claseeName) {
        element.claseeName = value;
    }else{
        newClassName = element.className;
        newClassName+= " ";
        newClassName+= value;
        element.claseeName = newClassName;
    }
}

function highlightPage(){
    if(!document.getElementsByTagName)
    return false;
    if(!document.getElementById)
    return false;
    var headers = document.getElementsByTagName('header');
    if(headers.length == 0)
    return false;
    var navs = headers[0].getElementsByTagName('nav');
    if(navs.length == 0)
    return false;
    var links = navs[0].getElementsByTagName('a');
    for(var i=0;i<links.length;i++)
    {
        linkurl = links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl)!=-1)
        {
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }

}
addLoadEvent(highlightPage);

function moveElement(elementID,final_x,final_y,interval){   //elementID元素ID，目的地左位置，目的地上位置，时间间隔
    if(!document.getElementById)
        return false;
    if (!document.getElementById(elementID))
        return false;
    var elem = document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left = "0px";
    }
    if(!elem.style.top){
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos == final_x && ypos == final_y){
        return true;}
    if(xpos<final_x)            //else if只要又符合条件的则不会对后面的else if进行判断
    {
        xpos++;
    }
    if(xpos>final_x)
    {
        xpos--;
    }
    if(ypos<final_y)
    {
        ypos++;
    }
    if(ypos>final_y)
    {
        ypos--;
    }
    elem.style.left = xpos+"px";
    elem.style.top = ypos +"px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";   //递归
    elem.movement = setTimeout(repeat,interval);

}

function prepareSlideshow(){
    if(!document.getElementsByTagName)
    return false;
    if(!document.getElementById)
    return false;
    if(!document.getElementById("intro"))
    return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src","images/mate.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links = intro.getElementsByTagName("a");
    var destination;
    for(var i=0;i<links.length;i++){
        links[i].onmouseover = function(){
            destination =this.getAttribute("href");
            if(destination.indexOf("index.html")!= -1){
                moverElement("preview",0,0,5);
            }
            if(destination.indexOf(("about.html")!= -1)){
                moveElement("preview",-150,0,5);
            }
            if(destination.indexOf("photos.html")!= -1)
            {
                moveElement("preview",-300,0,5);
            }
            if(destination.indexOf("live.html")!= -1){
                moveElement("preview",-450,0,5);
            }
            if(destination.indexOf("contact.html")!= -1){
                moveElement("preview",-600,0,5);
            }
        }
    }
}

addLoadEvent(prepareSlideshow);

function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav(){
    if(!document.getElementsByTagName)
    return false;
    if(!document.getElementById)
        return false;
    var articles = document.getElementsByTagName("article");
    if(articles.length == 0)
    return false;
    var navs = articles[0].getElementsByTagName("nav");
    if(navs.length == 0)
    return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        var  sectionId = links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId))
        continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function () {
           showSection(this.destination);
            return false;
        }
    }
}


function showPic(whichpic) {
    if (!document.getElementById("placeholder"))return true;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    if (!document.getElementById("description"))
        return false;
    if(whichpic.getAttribute("title"))
    {
        var text = whichpic.getAttribute("title");
    } else{
        text = "";
    }
    var description = document.getElementById("description");
    if(description.firstChild.nodeType == 3){
        description.firstChild.nodeValue = text;
    }
    return false;
}

function preparePlaceholder() {
    if(!document.createElement) return false;                    //判断是否可以使用接下来要使用的方法，保证平稳退化
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/logo.gif");
    placeholder.setAttribute("alt","my images gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);
    //   document.getElementsByTagName("body")[0].appendChild(img);
    //  document.getElementsByTagName("body")[0].appendChild(para);
    var gallery = document.getElementById("imagegallery");      //获取图片库对象
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

function prepareGallery(){
    if(!document.getElementById||!document.getElementsByTagName)
        return false;
    if(!document.getElementById("imagegallery"))
        return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
    {
        links[i].onclick = function(){
            return showPic(this);
        }
    }
}

function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if(1 == (j % 2)){
            rows[j].setAttribute("class","odd");    //addClass方法在原有基础上覆盖，而live.html文档中没有预设的class属性，所以我打算用setAtrribute方法去添加class属性
            }
        }
    }
}

function highlightRows(){   //鼠标悬停表格行上方时，文本加黑加粗
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for(var i= 0;i<rows.length;i++)
    {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseout = function() {
           addClass(this,"highlight");      //失效
        };
        rows[i].onmouseover = function(){
            this.className = this.oldClassName;
        };
    }
}

function displayAbbreviations(){            //缩略语表
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode)
        return false;
    var abbreviations = document.getElementsByTagName("abbr");
    if(abbreviations.length < 1)    //判断是否含有缩略语
    {
        return false;
    }
    var defs = new Array();
    for(var i=0;i<abbreviations.length;i++)     //遍历abbr元素的title属性
    {
        var current_abbr = abbreviations[i];
        // defs[key] = abbreviations[i].getAttribute("title");
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.firstChild.nodeValue;
        defs[key] = definition;
        //用文本节点的值用作数组的值，title属性用作数组下标
    }
    var dlist = document.createElement("dl");
    for( key in defs ){          //对于defs关联数组里的每个键，把它的值赋给变量key
        var definition = defs[key];
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddsec = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddsec.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddsec);

    }
    if(dlist.childNodes.length<1){
        return false;
    }
    var header = document.createElement("h3");          //对于结构复杂的文档，或许还需要借助于特定的id才能把新创建的元素插入到文档里的特定位置
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles= document.getElementsByTagName("article");
    if(articles.length == 0 )
    return false;
    var container =articles[0];
   container.appendChild(header);
    container.appendChild(dlist);
}

function focusLabels(){
    if(!document.getElementsByTagName)
    return false;
    var labels = document.getElementsByTagName("label");
    for(var i=0;i<labels.length;i++)
    {
        if(!labels[i].getAttribute("for"))
            continue;
        labels[i].onclick = function(){
            var id = this.getAttribute("id");
            if(!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }

    }
}

function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function () {
            if (!validateForm(this))
                return false;
            var article = document.getElementsByTagName('article')[0];
             if (submitFormWithAjax(this,article)) return false;
        return true;
    }
}
}
function resetFields(whichform){
    if(!document.getElementById("placeholder"))
    return false;
     for(var i=0;i<whichform.length;i++){
         var element = whichform.element[i];
         if(element.type=="submit")
         continue;
         var check = element.placeholder|| element.getAttribute('placeholder');
         if(!check)
         continue;
         element.onfocus = function(){
             var text = this.placeholder||this.getAttribute('placeholder');
             if(text==this.value){
                 this.value="";
                 this.className='';
             }
         };
         element.onblur = function(){
             if(this.value==""){
                 this.className = 'placeholder';
                 this.value=this.placeholder||this.getAttribute('placeholder');
             }
         };
         element.onblur();
     }
}

function isFilled(field){
    if(field.value.replace(' ','').length==0)
    return false;
    var palceholder=field.placeholder||field.getAttribute("placeholder");
    return (field.value!= placeholder);
}


function getHTTPObject(){
    if(typeof XMLThhpRequest == "undefined")
        XMLHttpRequest = function(){
            try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
            catch (e){}
            try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
            catch (e){}
            try{return new ActiveXObject("Msxml2.XMLHTTP");}
            catch (e){}
            return false;
        };
    return new XMLHttpRequest();
}

function displayAjaxLoading(element){
    while (element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute("src","images/loading.gif");
    content.setAttribute("alt","Loading....");
    element.appendChild(content);
}

function submitFormWithAjax(whichform,thetarget){
    var request = getHTTPObject();
    if(!request){
        return false;
    }
    displayAjaxLoading(thetarget);
    var dataParts = [];
    var element;
    for(var i=0;i<whichform.element.length;i++){
        element = whichform.element[i];
        dataParts[i] = element.name+'='+encodeURIComponent(element.value);
    }
    var data=dataParts.join('&');
    request.open('post',whichform.getAttribute("action"),true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.onreadystatechange = function(){
        if(request.readyState ==4 ){
            if(request.status == 200 || request.status ==0 ){
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if(matches.length > 0){
                    thetarget.innerHTML = matches[1];
                }else{
                    thetarget.innerHTML = '<p>Oops,threr was an error. Srry.</p>';
                }
            }else{
                thetarget.innerHTML = '<p>'+ request.statusText+'</p>';
            }
        }
    };
    request.send(data);
    return true;
}

addLoadEvent(prepareForms);
addLoadEvent(focusLabels);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(prepareInternalnav);