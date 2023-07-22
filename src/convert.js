function getJSON(filename) {
  return new Promise(function (r) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.runtime.getURL(filename), true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        r(xhr.responseText);
      }
    };
    xhr.send();
  });
}

function f(n, data) {
  let cs = n.childNodes;

  for (let i = 0; i < cs.length; i++) {
    let c = cs[i];
    if (c.nodeType == Node.TEXT_NODE) {
      Object.keys(data).forEach(function (key) {
        c.textContent = c.textContent.replace(key, data[key]);
      });
    } else {
      f(c, data);
    }
  }
}

getJSON("src/new_to_old.json").then(function (r) {
  const data = JSON.parse(r);
  f(document.body, data);
});
