function handlaProdukt(id) {
	var produktNamn = document.getElementById('produktNamn'+id).innerText;
	var produktPris = document.getElementById('produktPris'+id).innerText;
	localStorage.setItem(produktNamn, produktPris);    
    getKundkorg();
	
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

		document.getElementById('list').innerHTML = list; 
        // visaKundkorg och getKundkorg kan inte delas då dessa typer av kod (getElementById = x) ger error om ingen html kod med id x existerar.
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}

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
