window.onload = function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            document.getElementById("totalCases").innerHTML = myObj[0].positive;
            document.getElementById("recovered").innerHTML = myObj[0].recovered;
            document.getElementById("negativeCases").innerHTML = myObj[0].negative;
            document.getElementById("lastModified").innerHTML = myObj[0].lastModified;
        }
    };
    xmlhttp.open("GET","https://covidtracking.com/api/v1/us/current.json",true);
    xmlhttp.send();
};