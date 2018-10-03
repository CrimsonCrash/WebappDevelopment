$(window).load(function () {
    $.getJSON("http://192.168.4.34:3000/Brugere", function (data) {
        var arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.
        $.each(data, function (index, value) {
            arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
        });
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < arrItems.length; i++) {

            li = document.createElement('li');
            li.setAttribute('class','bar');
            li.setAttribute('id',i);
            span = document.createElement('span');
            span.innerHTML = "&times;";
            span.setAttribute("onclick","slet("+i+")");
            span.setAttribute("class","remove");
            li.appendChild(span);
            img = document.createElement('img');
            img.setAttribute('src',arrItems[i].Bruger_type + '.png');
            img.setAttribute('class','bar_item image');
            li.appendChild(img);
            div = document.createElement('div');
            div.setAttribute('class','bar_item');
            li.appendChild(div);
            span2 = document.createElement('span');
            span2.innerHTML = arrItems[i].Navn;
            span2.setAttribute("class","large");
            div.appendChild(span2);
            br = document.createElement('br');
            div.appendChild(br);
            span3 = document.createElement('span');
            span3.innerHTML = arrItems[i].Bruger_type;
            div.appendChild(span3);

            document.getElementById("liste").appendChild(li);

        }
    });
});

function slet(i) {
    var r = confirm("Er du sikker på at du vil slette brugeren?!");
if (r == true) {
    document.getElementById(i).style.display = "none";
    $.ajax({
        url: 'http://192.168.4.34/Bruger/'+i,
        method: 'DELETE',
      })
} else {
    
} 
    

}