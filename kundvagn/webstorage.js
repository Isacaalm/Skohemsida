function handlaProdukt(id) {
	var produktNamn = document.getElementById('produktNamn'+id).innerText;
	var produktPris = document.getElementById('produktPris'+id).innerText;
    produktPris = produktPris.replace(/ /g,''); // tar bort mellanrum i produktpris
    var produktAntal = "antal1";
	var produktBild = document.getElementById('produktBild'+id).src;
    var produktInfo = produktPris.concat(produktBild).concat(produktAntal); // lägg ihop stringar
    
    // Om produktNamn redan finns i localStorage, addera produktAntal 
    if (produktNamn === localStorage.key(produktNamn)) {
        adderaAntal(produktNamn, localStorage.getItem(produktNamn));
    } else {
        localStorage.setItem(produktNamn, produktInfo);  // spara keyn produktNamn med itemet produktInfo
    }
    getKundkorg();
}

function adderaAntal(produktNamn, produktInfo) {
    var produktInfoTemp = [];
    var produktAntalTemp = 0;
    produktInfoTemp = produktInfo.split(/(?=antal)/g); // produktInfoTemp=[produktnamn,ProduktBildProduktPris]
    produktInfoTemp[1] = produktInfoTemp[1].replace("antal",""); // produktInfoTemp=[produktnamn, ProduktBildProduktPris] (tar bort antal från produktInfoTemp[1])
    produktAntalTemp = parseInt(produktInfoTemp[1]) + 1; // produktInfoTemp=[produktnamn, ProduktBildProduktPris] Öka ProduktPris med 1
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
            
            // produktNamn
            list += "<tr><td class='fw-bolder' style='padding-right: 50px; font-size: 30px;'>" + produktNamn + "</td>\n"
            
            // produktPris
            totalKostnad += parseInt(item[0].slice(0,-2)); // tar bort sista två charsen (kr) samt gör om produkt priset till en int
            list += "<td style='font-size: 20px;'>" +
			produktPris + "</td>";

            // produktBild
            list += "</tr><td><img class='card-img-top' src='" + produktBild + "'></img></td>\n";

            // produktAntal
            list += "<td style='font-size: 20px;'>Antal: " +
			produktAntal + "</td>";

            // produktKnappar
            list += "<ul><li type='button' class='btn btn-outline-dark mt-auto' onclick=rensaKundKorg()><a>+</a></li>" 
            + "<li type='button' class='btn btn-outline-dark mt-auto' onclick=rensaKundKorg()><a>-</a></li></ul>";
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
function modifieraProduktAntal(produktNamn) {
    var item = [];
    var produktNamn = "";
    var produktPris = "";
    var produktBild = "";
    var produktAntal = "";




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

function DownloadFile(){
	const fakeButton = document.createElement('a');
	const arr = [];
    let fnamn = "";
    fnamn = document.getElementById('fname').value;
    console.log(fnamn);
    fakeButton.href = "data:text/plain;charset=utf-8," + "Tack för att du köpte av oss, " + fnamn + "!%0D%0A %0D%0A"; // %0D%0A = radbyte
	for(i=0; i < localStorage.length; i++){

		//skapar key för att hitta index 
		const key = (localStorage.key(i))
	// lägger till i array då man först lägger till key "namn" och sedan value "localstorage.getItem(key") ett item, en string
		arr[i] = key + localStorage.getItem(key);
        arr[i] = arr[i].split(/(?=http)/g);
        arr[i][1] = arr[i][1].split(/(?=antal)/g);
        arr[i][2] = arr[i][1][1].replace("antal","Antal: ");
        arr[i].splice([1], 1);
        arr[i][0] = arr[i][0].replace(key, "");

        const produktNamnKvitto = key;
        const produktPrisKvitto = arr[i][0];
        const produktAntalKvitto = arr[i][1];
        // arr[i] = [2099kr,Antal 1]
        // arr[i][0] = 2099kr  PRIS
        // arr[i][1] = 1    ANTAL

        fakeButton.href +=  produktNamnKvitto + "%0D%0A" + produktPrisKvitto + " " + produktAntalKvitto + "%0D%0A";
	}

 


	//skriver till   dokumentet 
	fakeButton.download = 'Kvitto.txt';
	fakeButton.click();
}
