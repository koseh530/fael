function loadDoc(src, failCallback, successCallback) {
  let xReq = new XMLHttpRequest();
  if (!xReq) {
    alert('cannnot make XMLHTTP instance.');
    return false;
  }
  xReq.onreadystatechange = function() {
    switch (this.readyState) {
      //readyState (0:uninitialized) (1:loading) (2:loaded) (3:interactive) (4:complete)
      case 0:
        failCallback("Object uninitialized.");
        break;
      case 1:
        failCallback("Object loading...");
        break;
      case 2:
        failCallback("Object loaded!");
        break;
      case 3:
        failCallback( "Data receiving...");
        break;
      case 4:
        if (this.status >= 200 && this.status < 300) {
          //status 200 OK
          successCallback(this.responseText);
        }
        else if (this.status === 403){
          failCallback("Forbidden(403)");
        }
        else if (this.status === 404){
          failCallback("Not Found(404)");
        }
        else if (this.status === 500){
          failCallback("Internal Server Error (500)");
        }
        else if (this.status === 502){
          failCallback("Bad Gateway (502)");
        }
        else {
          failCallback("Other Reason Error");
        }
        break;
      default:
        failCallback("Page cannot load.");
    }

  }
  xReq.open('GET', src);
  xReq.send();
}

function getYest(n, d) {
  let vc = new Date(d.substr(0, 4), d.substr(4, 2) - 1, d.substr(6, 2));
  //let vc = new Date();
  vc.setDate(vc.getDate() - n);
  let yy = vc.getFullYear();
  let mm = vc.getMonth();
  let dd = vc.getDate();
  return yy + (mm < 9 ? "0" : "") + (mm + 1) + (dd < 10 ? "0" : "") + dd;
}
