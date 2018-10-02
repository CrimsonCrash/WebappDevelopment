$(window).load(function () {
    $.getJSON("http://192.168.4.34:3000/Ordre", function (data) {

        var arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.
        $.each(data, function (index, value) {
            arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
        });

        // EXTRACT VALUE FOR TABLE HEADER.
        var col = [];
        for (var i = 0; i < arrItems.length; i++) {
            for (var key in arrItems[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.setAttribute("class", "table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.
        tr.className = 'table_head';

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }


        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < arrItems.length; i++) {

            tr2 = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr2.insertCell(-1);
                tabCell.innerHTML = arrItems[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("tabeldiv");
        divContainer.appendChild(table);
    });
});

function rediger() {
    document.getElementById('Ordre_ID').value = document.getElementById('Ordre-id').value;
    var ordre_nummer = document.getElementById('Ordre_ID').value;
    var url = 'http://192.168.4.34:3000/Ordre/' + ordre_nummer;
    alert("url: " + url);

    $.getJSON(url, function (data) {
        document.getElementById('Navn').value = data[0].Navn;
        document.getElementById('Email').value = data[0].Email;
        document.getElementById('Tlf').value = data[0].Tlf;
        document.getElementById('Adresse').value = data[0].Adresse;
        document.getElementById('Model').value = data[0].Model;
        document.getElementById('Mærke').value = data[0].Maerke;
        document.getElementById('PCID').value = data[0].PC_ID;
    });
    document.getElementById('Rediger2').style.display = 'block'; document.getElementById('Rediger').style.display = 'none'
}