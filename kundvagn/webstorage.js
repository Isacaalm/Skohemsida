function handlaProdukt(id) {
	var produktNamn = document.getElementById('produktNamn'+id).innerText;
	var produktPris = document.getElementById('produktPris'+id).innerText;
    produktPris = produktPris.replace(/ /g,''); // tar bort mellanrum i produktpris
    var produktAntal = "antal1";
	var produktBild = document.getElementById('produktBild'+id).src;
    var produktInfo = produktPris.concat(produktBild).concat(produktAntal); // lägg ihop stringar
    
    // Om produktNamn redan finns i localStorage, addera produktAntal 
    if (produktNamn === localStorage.key(produktNamn)) {
        adderaProdukt(produktNamn, produktInfo);
    } else {
        localStorage.setItem(produktNamn, produktInfo);  // spara keyn produktNamn med itemet produktInfo
    }
    getKundkorg();
}

function adderaProdukt(produktNamn, produktInfo) {
    var produktInfoTemp = [];
    var produktAntalTemp = 0;
    produktInfoTemp = produktInfo.split(/(?=antal)/g);
    produktInfoTemp[1] = produktInfoTemp[1].replace("antal","");
    produktAntalTemp = parseInt(produktInfoTemp[1]) + 1;
    produktInfoTemp[1] = produktAntalTemp.toString();
    produktInfoTemp[1] = "antal" + produktInfoTemp[1];
    produktInfo = produktInfoTemp[0].concat(produktInfoTemp[1]);
    localStorage.setItem(produktNamn, produktInfoTemp);
}

function taBortProdukt() {
	var produktNamn = document.forms.ShoppingList.produktNamn.value;
	document.forms.ShoppingList.produktPris.value = localStorage.taBortProdukt(produktNamn);
	visaKundkorg();
}

function rensaKundKorg() {
	localStorage.clear();
    getKundkorg();
	visaKundkorg();
}

function visaKundkorg() { // Denna funktionen printar endast ut listan med objekt i localStorage
	if (CheckBrowser()) {
		var key = "";
        var item = [];
		var list = "<tr><th></th><th></th></tr>\n";
		var i = 0;
        var totalKostnad = 0;
        
		for (i = 0; i <= localStorage.length-1; i++) {
			pristoInt = 0;
            key = localStorage.key(i);
            item = localStorage.getItem(key).split(/(?=http)/g); // delar item till vänster om "http"
            item[2] = item[1].split(/(?=antal)/g); // FORTSÄTT HÄR
            console.log(item);
            
            // produktNamn
            list += "<tr><td class='fw-bolder' style='padding-right: 50px; font-size: 30px;'>" + key + "</td>\n"
            
            // produktPris
            totalKostnad += parseInt(item[0].slice(0,-2)); // tar bort sista två charsen (kr) samt gör om produkt priset till en int
            list += "<td style='font-size: 20px;'>" +
			item[0] + "</td>";

            // produktBild
            list += "</tr><td><img class='card-img-top' src='" + item[1] + "'></img></td>\n";

            // produktAntal

		}

        
		if (list == "<tr><th></th><th></th></tr>\n") {
			list += "<tr><td class='fw-bolder' style='font-size: 30px;'>Din kundvagn är tom</td></tr>";
		}

        } else {
            alert('Cannot save shopping list as your browser does not support HTML 5');
        }

		document.getElementById('list').innerHTML = list; 
        document.getElementById('totalKostnad').innerHTML = "Total kostnad: " + totalKostnad + "kr";
}

// visaKundkorg och getKundkorg kan inte delas då dessa typer av kod (getElementById = x) ger error om ingen html kod med id x existerar.
function getKundkorg() { // Denna funktionen "hämtar" kundkorgen sedan sätter id "antal produkter" till antalet objekt i localStorage
    // MÅSTE LIGGA LÄNGST NER I HTML
	if (CheckBrowser()) {
		var key = "";
		var list = "<tr><th>Item</th><th>Value</th></tr>\n";
		var i = 0;
        
		for (i = 0; i <= localStorage.length-1; i++) {
			key = localStorage.key(i);
			list += "<tr><td>" + key + "</td>\n<td>"
					+ localStorage.getItem(key) + "</td></tr>\n";
		}

		if (list == "<tr><th>Item</th><th>Value</th></tr>\n") {
			list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
		}

        document.getElementById('antalProdukter').innerHTML = localStorage.length;
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}

function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		return true;
	} else {
			return false;
	}
}
