//add new key=>value to the HTML5 storage
function sparaProdukt() {
			
	var produktNamn = document.getElementById('produktNamn').innerText;
	var produktPris = document.getElementById('produktPris').innerText;
	localStorage.setItem(produktNamn, produktPris);
	visaKundkorg();
	
}

//delete an existing key=>value from the HTML5 storage
function taBortProdukt() {
	var produktNamn = document.forms.ShoppingList.produktNamn.value;
	document.forms.ShoppingList.produktPris.value = localStorage.taBortProdukt(produktNamn);
	visaKundkorg();
}
//-------------------------------------------------------------------------------------
//restart the local storage
function rensaKundKorg() {
	localStorage.clear();
	visaKundkorg();
}
//--------------------------------------------------------------------------------------
// dynamically populate the table with shopping list items
//below step can be done via PHP and AJAX too. 
function visaKundkorg() {
	if (CheckBrowser()) {
		var key = "";
		var list = "<tr><th>Item</th><th>Value</th></tr>\n";
		var i = 0;
		//for more advance feature, you can set cap on max items in the cart
		for (i = 0; i <= localStorage.length-1; i++) {
			key = localStorage.key(i);
			list += "<tr><td>" + key + "</td>\n<td>"
					+ localStorage.getItem(key) + "</td></tr>\n";
		}
		//if no item exists in the cart
		if (list == "<tr><th>Item</th><th>Value</th></tr>\n") {
			list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
		}
		//bind the produktPris to html table
		//you can use jQuery too....
		document.getElementById('list').innerHTML = list;
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}

/*
 =====> Checking the browser support
 //this step may not be required as most of modern browsers do support HTML5
 */
 //below function may be redundant
function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store produktPris
		return true;
	} else {
			return false;
	}
}
//-------------------------------------------------
/*
You can extend this script by inserting produktPris to produktPrisbase or adding payment processing API to shopping cart..
*/