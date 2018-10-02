$(document).ready(function () {
    $('#rep2').hide();
    $('#res2').hide();
    $('#rep4').hide();
    $('#res4').hide();
    $('#rep').click(function () {
        var $this = $(this);
        if ($this.is(':checked')) {
            $('#rep2').show();
        } else {
            $('#rep2').hide();
        }
    });
    $('#res').click(function () {
        var $this = $(this);
        if ($this.is(':checked')) {
            $('#res2').show();
        } else {
            $('#res2').hide();
        }
    });
    $('#rep3').click(function () {
        var $this = $(this);
        if ($this.is(':checked')) {
            $('#rep4').show();
        } else {
            $('#rep4').hide();
        }
    });
    $('#res3').click(function () {
        var $this = $(this);
        if ($this.is(':checked')) {
            $('#res4').show();
        } else {
            $('#res4').hide();
        }
    });
});

$(window).load(function () {
    $.getJSON("http://192.168.4.34:3000/PCer", function (data) {

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
    document.getElementById('pcID2').value = document.getElementById('pcID').value;
    var pcid = document.getElementById('pcID').value;
    var url = 'http://192.168.4.34:3000/PCer/' + pcid;
    alert("url: " + url);

    $.getJSON(url, function (data) {
        document.getElementById('Maerke').value = data[0].Maerke;
        document.getElementById('Model').value = data[0].Model;
        document.getElementById('Reperation2').value = data[0].Reparation_txt;
        document.getElementById('Reservedele2').value = data[0].Reservedele_txt;
        document.getElementById('OS').value = data[0].OS;

        if (data[0].Reparation == 0) {
            $('#rep3').prop('checked', false)
        } else if (data[0].Reparation == 1) {
            $('#rep3').prop('checked', true)
        }
        if (data[0].Reservedele == 0) {
            $('#res3').prop('checked', false)
        } else if (data[0].Reservedele == 1) {
            $('#res3').prop('checked', true)
        }
        if (data[0].Salg == 0) {
            $('#Salg').prop('checked', false)
        } else if (data[0].Salg == 1) {
            $('#Salg').prop('checked', true)
        }
        if (data[0].skrottet == 0) {
            $('#Skrottet').prop('checked', false)
        } else if (data[0].skrottet == 1) {
            $('#Skrottet').prop('checked', true)
        }
    });
    document.getElementById('Rediger2').style.display='block'; document.getElementById('Rediger').style.display='none'
}