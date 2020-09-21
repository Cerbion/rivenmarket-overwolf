function log(content) {
    console.log(content);
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function not(bool) {
    return !bool;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function stripHTML(string) {
    return string.replace(/<(?:.|\n)*?>/gm, '');
}

function reload() {
    window.location.replace(window.location.href);
}

function notice(html) {
    alert(html);
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


async function loadAJAX(div, path) // Load file from "path" into "div"
{
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                div.innerHTML = xmlhttp.responseText;
            }
        }
    };

    xmlhttp.open("GET", path + "&time=" + Date.now(), true);
    xmlhttp.send();
}
async function loadJSON(path) // Load file from "path" and use method "callback" once a response has arrived
{
    let url = path + "&time=" + Date.now();

    fetch(url)
        .then(response => response.json())
        .then((data) => {
            var finalHTML = "<h1>Latest Rivens:</h1>";
            finalHTML += "<table>";
            finalHTML += "<tr><th>Weapon / Name</th><th>Stats</th><th>Price</th><th>Seller</th><th>Posted</th></tr>";

            data.forEach(element => {
                finalHTML += "<tr><td>" + element['weapon'].replaceAll("_", " ") + " " + element['name'] + "</td><td>" +
                    element['stat1amount'] + " " + element['stat1'] +
                    "<br>" + element['stat2amount'] + " " + element['stat2'];
                if (element['stat3'] != "")
                    finalHTML += "<br>" + element['stat3amount'] + " " + element['stat3'];
                if (element['stat4'] != "")
                    finalHTML += "<br>" + element['stat4amount'] + " " + element['stat4'];
                finalHTML += "</td><td>" + element['price'] + "p</td><td>" + element['wfaccount'] + "</td><td>" + element['time'] + "</td></tr>";
            });

            finalHTML += "</table>";

            $("#left").innerHTML = finalHTML;
        })
        .catch(err => { throw err });
}

function $(node = document) {
    if (node.startsWith("#")) {
        // By ID
        return document.getElementById(node.substring(1));
    }
}

function trigger(elem, ev) {
    var event = new Event(ev);
    elem.dispatchEvent(event);
}

// Dynamic Favicon / Title
function setFaviconNew() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = php_baseurl + '/_img/favicon_new.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}

function setFaviconDefault() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = php_baseurl + '_img/favicon.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}