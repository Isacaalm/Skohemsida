function handlaProdukt(id) {
	var produktNamn = document.getElementById('produktNamn'+id).innerText;
	var produktPris = document.getElementById('produktPris'+id).innerText;
    produktPris = produktPris.replace(/ /g,''); // tar bort mellanrum i produktpris
    var produktAntal = "antal1";
	var produktBild = document.getElementById('produktBild'+id).src;
    var produktInfo = produktPris.concat(produktBild).concat(produktAntal); // lägg ihop stringar
    // Om produktNamn redan finns i localStorage, addera produktAntal. 
    if (localStorage.getItem(produktNamn) === null) {
        localStorage.setItem(produktNamn, produktInfo);  // spara keyn produktNamn med itemet produktInfo
    } else {
        adderaAntal(produktNamn, localStorage.getItem(produktNamn));
    }
    getKundkorg();
    document.getElementById('popup').hidden = false;
    setTimeout(()=> document.getElementById('popup').hidden = true, 1000);
}

function adderaAntal(produktNamn, produktInfo) {
    var produktInfoTemp = [];
    var produktAntalTemp = 0;
    produktInfoTemp = produktInfo.split(/(?=antal)/g);
    produktInfoTemp[1] = produktInfoTemp[1].replace("antal","");
    produktAntalTemp = parseInt(produktInfoTemp[1]) + 1;
    produktInfoTemp[1] = produktAntalTemp.toString();
    produktInfoTemp[1] = "antal" + produktInfoTemp[1];
    produktInfoTemp = produktInfoTemp.join("");
    localStorage.setItem(produktNamn, produktInfoTemp);
}

function visaKundkorg() { // Denna funktionen printar endast ut listan med objekt i localStorage
	if (CheckBrowser()) {
        var item = [];
        var produktNamn = "";
        var produktPris = "";
        var produktBild = "";
        var produktAntal = "";
        
		var list = "<tr><th></th><th></th></tr>\n";
        var totalKostnad = 0;
        
		for (var i = 0; i <= localStorage.length-1; i++) {
			pristoInt = 0;
            produktNamn = localStorage.key(i);
            item = localStorage.getItem(produktNamn).split(/(?=http)/g); // delar item till vänster om "http"
            produktPris = item[0];
            item[2] = item[1].split(/(?=antal)/g); 
            produktBild = item[2][0];
            produktAntal = item[2][1];
            produktAntal = produktAntal.replace("antal","");
            
            produktPris = String((parseInt(produktAntal) * parseInt(produktPris.slice(0,-2)))); 

            

            
            // produktNamn
            list += "<tr style='margin-bottom: 40px;' class='card h-100'><td class='fw-bolder' style='padding-right: 50px; white-space: nowrap; overflow: hidden; text-overflow: clip; font-size: 30px; padding-left: 15px;' id='produktNamn" + i + "'>" + produktNamn + "</td>\n"
            
    		// produktBild
            list += "<td style='text-align: center;'><img style='width:60%; height:60%;' class='card-img-top' src='" + produktBild + "'></img></td>\n";

			// produktPris
            totalKostnad += parseInt(produktPris); // tar bort sista två charsen (kr) samt gör om produkt priset till en int
            list += "<td style='font-size: 20px; font-weight: bold; text-align: right' id='produktPris " + i + "'>" +
			produktPris + " kr" +"</td>";

            // produktAntal
            list += "<td style='font-size : 20px; font-weight: bold; text-align: right' id='produktAntal" + i + "'>Antal: " +
			produktAntal + "</td>";

            // produktKnappar
            list += "<td type='button' class='btn btn-outline-dark mt-auto' onclick=adderaProduktAntal(" + i + ")><a>+</a></td>" 
            + "<td type='button' class='btn btn-outline-dark mt-auto' onclick=subtraheraProduktAntal(" + i + ")><a>-</a></td></tr>";
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
// MÅSTE LIGGA LÄNGST NER I HTML
function getKundkorg() { // Denna funktionen sätter id "antal produkter" till antalet produkter i kundvagnen 
	if (CheckBrowser()) {
        var produktNamn = "";
        var produktAntal = "";
        var antalProdukter = 0;


		for (var i = 0; i <= localStorage.length-1; i++) { // forloop för att räkna antalet produkter i kundkorgen
            produktNamn = localStorage.key(i);
            item = localStorage.getItem(produktNamn).split(/(?=http)/g); // delar item till vänster om "http"
            item[2] = item[1].split(/(?=antal)/g); 
            produktAntal = item[2][1];
            produktAntal = produktAntal.replace("antal","");
            antalProdukter += parseInt(produktAntal);
		}
        document.getElementById('antalProdukter').innerHTML = antalProdukter;
     
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}



// Kundvagns funktioner
function adderaProduktAntal(id) {
    var produktNamn = document.getElementById('produktNamn'+id).innerText;
    var produktAntal = document.getElementById('produktAntal'+id).innerText;
    var produktInfo = localStorage.getItem(produktNamn)
    var produktAntalTemp = produktAntal.replace('Antal: ','');
    var produktInfoTemp = [];


    produktAntalTemp = parseInt(produktAntalTemp) + 1;
    produktAntal = "antal" + produktAntalTemp;

    produktInfoTemp = produktInfo.split(/(?=antal)/g);
    produktInfoTemp[1] = produktAntal;
    produktInfoTemp = produktInfoTemp.join("");

    localStorage.setItem(produktNamn, produktInfoTemp);
    getKundkorg();
	visaKundkorg();
}

function subtraheraProduktAntal(id) {
    var produktNamn = document.getElementById('produktNamn'+id).innerText;
    var produktAntal = document.getElementById('produktAntal'+id).innerText;
    var produktInfo = localStorage.getItem(produktNamn)
    var produktAntalTemp = produktAntal.replace('Antal: ','');
    var produktInfoTemp = [];


    produktAntalTemp = parseInt(produktAntalTemp) - 1;
    if(parseInt(produktAntalTemp) <= 0)
    {
        localStorage.removeItem(produktNamn);
    }
    else {
        produktAntal = "antal" + produktAntalTemp;

        produktInfoTemp = produktInfo.split(/(?=antal)/g);
        produktInfoTemp[1] = produktAntal;
        produktInfoTemp = produktInfoTemp.join("");
    
        localStorage.setItem(produktNamn, produktInfoTemp);
    }

    getKundkorg();
	visaKundkorg();
}

function rensaKundKorg() {
	localStorage.clear();
    getKundkorg();
	visaKundkorg();
}




















function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		return true;
	} else {
			return false;
	}
}
