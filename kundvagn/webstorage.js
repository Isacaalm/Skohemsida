function handlaProdukt(id) {
    var produktNamn = document.getElementById('produktNamn' + id).innerText;
    var produktPris = document.getElementById('produktPris' + id).innerText;
    produktPris = produktPris.replace(/ /g, ''); // tar bort mellanrum i produktpris
    var produktAntal = "antal1";
    var produktBild = document.getElementById('produktBild' + id).src;
    var produktInfo = produktPris.concat(produktBild).concat(produktAntal); // lägg ihop stringar
    // Om produktNamn redan finns i localStorage, addera produktAntal. 
    if (localStorage.getItem(produktNamn) === null) {
        localStorage.setItem(produktNamn, produktInfo);  // spara keyn produktNamn med itemet produktInfo
    } else {
        adderaAntal(produktNamn, localStorage.getItem(produktNamn));
    }
    getKundkorg();
    document.getElementById('popup').hidden = false;
    setTimeout(() => document.getElementById('popup').hidden = true, 1000);
}

function adderaAntal(produktNamn, produktInfo) {
    var produktInfoTemp = [];
    var produktAntalTemp = 0;
    produktInfoTemp = produktInfo.split(/(?=antal)/g); // produktInfoTemp=[produktnamn,ProduktBildProduktPris]
    produktInfoTemp[1] = produktInfoTemp[1].replace("antal", ""); // produktInfoTemp=[produktnamn, ProduktBildProduktPris] (tar bort antal från produktInfoTemp[1])
    produktAntalTemp = parseInt(produktInfoTemp[1]) + 1; // produktInfoTemp=[produktnamn, ProduktBildProduktPris] Öka ProduktPris med 1
    produktInfoTemp[1] = produktAntalTemp.toString();
    produktInfoTemp[1] = "antal" + produktInfoTemp[1];
    produktInfoTemp = produktInfoTemp.join("");
    localStorage.setItem(produktNamn, produktInfoTemp);
}

// function visaKundkorg() { // Denna funktionen printar endast ut listan med objekt i localStorage
//     if (CheckBrowser()) {
//         var item = [];
//         var produktNamn = "";
//         var produktPris = "";
//         var produktBild = "";
//         var produktAntal = "";

//         var list = "<tr></tr>\n";
//         var summering = "";
//         var totalKostnad = 0;

//         for (var i = 0; i <= localStorage.length - 1; i++) {
//             pristoInt = 0;
//             produktNamn = localStorage.key(i);
//             item = localStorage.getItem(produktNamn).split(/(?=http)/g); // delar item till vänster om "http"
//             produktPris = item[0];
//             item[2] = item[1].split(/(?=antal)/g);
//             produktBild = item[2][0];
//             produktAntal = item[2][1];
//             produktAntal = produktAntal.replace("antal", "");

//             produktPris = String((parseInt(produktAntal) * parseInt(produktPris.slice(0, -2))));




//             // produktNamn	
//             list += "<tr style='margin-bottom: 40px;' class='card h-100'><td class='fw-bolder' style='padding-right: 50px; font-size: 1.5vh; padding-left: 15px;' id='produktNamn" + i + "'>" + produktNamn + "</td>\n"

//             // produktBild
//             list += "<td style='text-align: center;'><img style='width:0%;' class='card-img-top' src='" + produktBild + "'></img></td>\n";

//             // produktPris
//             totalKostnad += parseInt(produktPris); // tar bort sista två charsen (kr) samt gör om produkt priset till en int
//             list += "<td style='font-size: 1.5vh; font-weight: bold; text-align: right; padding-right: 15px' id='produktPris " + i + "'>" +
//                 parseInt(produktPris).toLocaleString("fr") + " kr" + "</td>";

//             // produktAntal
//             list += "<td style='font-size: 0,4vw; font-weight: bold; text-align: right; padding-right: 15px' id='produktAntal" + i + "'>Antal: " +
//                 produktAntal + "</td>";

//             // produktKnappar
//             list += "<td type='button' class='btn btn-outline-dark mt-auto' onclick=adderaProduktAntal(" + i + ")><a>+</a></td>"
//                 + "<td type='button' class='btn btn-outline-dark mt-auto' onclick=subtraheraProduktAntal(" + i + ")><a>-</a></td></tr>";
//         }

//         // Summeringsruta
//         summering += "<tr class='card h-100'>" + "<td style='padding-left: 10px; padding-top: 10px;'><li type='button' class='btn btn-outline-dark mt-auto' onclick=rensaKundKorg()><a>Töm kundvagn</a></li></td>" + "<td class='fw-bolder' style='font-size: 1.5vh; padding-left: 30px; padding-right: 30px; padding-bottom: 10px; text-align: center;'>"
//             + "Sammanställning" + "</td>";
//         summering += "<td style='text-align: center; padding-bottom: 50px'><a><img src='../Images/logga.png' style='width:40%;'></a></td>";
//         summering += "<td style='padding-left: 30px; padding-right: 30px; font-size: 1.5vh'><b>Beräknad frakt: </b>0 kr";
//         summering += "<td style='padding-left: 30px; padding-right: 30px; font-size: 1.5vh; padding-bottom: 50px'><b>Total Kostnad: </b>" + totalKostnad.toLocaleString("fr") + " kr" + "</td>";
//         summering += "<td style='text-align: left; padding-bottom: 50px; padding-left: 20px; text-align: center;'><a style='font-size: 1.5vh;' href='Checkout.html' class='btn btn-outline-dark mt-auto'>Gå till checkout</a></td>" + "</tr>";



//         if (list == "<tr></tr>\n") {
//             list += "<tr><td class='fw-bolder' style='font-size: 1.5vh;'>Din kundvagn är tom</td></tr>";
//         }

//     } else {
//         alert('Cannot save shopping list as your browser does not support HTML 5');
//     }

//     document.getElementById('list').innerHTML = list;
//     if (document.getElementById('summering')) {
//         document.getElementById('summering').innerHTML = summering;
//     }
//     if (document.getElementById('totalKostnad')) {
//         document.getElementById('totalKostnad').innerHTML = totalKostnad.toLocaleString("fr") + "kr";
//     }
// }


// visaKundkorg och getKundkorg kan inte delas då dessa typer av kod (getElementById = x) ger error om ingen html kod med id x existerar. 
// MÅSTE LIGGA LÄNGST NER I HTML
function getKundkorg() { // Denna funktionen sätter id "antal produkter" till antalet produkter i kundvagnen 
    if (CheckBrowser()) {
        var produktNamn = "";
        var produktAntal = "";
        var antalProdukter = 0;


        for (var i = 0; i <= localStorage.length - 1; i++) { // forloop för att räkna antalet produkter i kundkorgen
            produktNamn = localStorage.key(i);
            item = localStorage.getItem(produktNamn).split(/(?=http)/g); // delar item till vänster om "http"
            item[2] = item[1].split(/(?=antal)/g);
            produktAntal = item[2][1];
            produktAntal = produktAntal.replace("antal", "");
            antalProdukter += parseInt(produktAntal);
        }
        document.getElementById('antalProdukter').innerHTML = antalProdukter;

    } else {
        alert('Cannot save shopping list as your browser does not support HTML 5');
    }
}



// Kundvagns funktioner
function adderaProduktAntal(id) {
    var produktNamn = document.getElementById('produktNamn' + id).innerText;
    var produktAntal = document.getElementById('produktAntal' + id).innerText;
    var produktInfo = localStorage.getItem(produktNamn)
    var produktAntalTemp = produktAntal.replace('Antal: ', '');
    var produktInfoTemp = [];


    produktAntalTemp = parseInt(produktAntalTemp) + 1;
    produktAntal = "antal" + produktAntalTemp;

    produktInfoTemp = produktInfo.split(/(?=antal)/g);
    produktInfoTemp[1] = produktAntal;
    produktInfoTemp = produktInfoTemp.join("");

    localStorage.setItem(produktNamn, produktInfoTemp);
    getKundkorg();
    visaKundkorgCheckout();
}

function subtraheraProduktAntal(id) {
    var produktNamn = document.getElementById('produktNamn' + id).innerText;
    var produktAntal = document.getElementById('produktAntal' + id).innerText;
    var produktInfo = localStorage.getItem(produktNamn)
    var produktAntalTemp = produktAntal.replace('Antal: ', '');
    var produktInfoTemp = [];


    produktAntalTemp = parseInt(produktAntalTemp) - 1;
    if (parseInt(produktAntalTemp) <= 0) {
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
    visaKundkorgCheckout();
}

function rensaKundKorg() {
    localStorage.clear();
    getKundkorg();
    visaKundkorgCheckout();
}




















function CheckBrowser() {
    if ('localStorage' in window && window['localStorage'] !== null) {
        return true;
    } else {
        return false;
    }
}

function DownloadFile() {
    const input = ['fname', 'email', 'adr', 'city', 'zip']; // array med idn för att kunna loopa igenom forms
    const fakeButton = document.createElement('a');
    let formsIfyllda = true;

    // Kolla så att forms är ifyllda, om ej ifyllda markera tomma input röda. Ersätt input[i] från id till value
    for (let i = 0; i < input.length; i++) {
        if (document.getElementById(input[i]).value === "") {
            console.log("Ej ifylld forms");
            document.getElementById(input[i]).style.borderColor = "red";
            formsIfyllda = false;
        }
        else {
            document.getElementById(input[i]).style.borderColor = "";
            input[i] = document.getElementById(input[i]).value;
        }
    }

    if (formsIfyllda === true) { // Om alla forms är ifyllda, fortsätt med kvitto
        fakeButton.href = "data:text/plain;charset=utf-8," + "Tack för att du köpte av oss, " + input[0] + "!" + "%0D%0A %0D%0A" + "Kvittot skickas till" + " " + input[1] + "%0D%0A" + "Produkterna skickas till " + input[2] + ", " + input[3] + " " + input[4] + "%0D%0A" + "%0D%0A"; // %0D%0A = radbyte
        const arr = [];
        for (i = 0; i < localStorage.length; i++) {

            //skapar key för att hitta index 
            const key = (localStorage.key(i))
            // lägger till i array då man först lägger till key "namn" och sedan value "localstorage.getItem(key") ett item, en string
            arr[i] = key + localStorage.getItem(key);
            arr[i] = arr[i].split(/(?=http)/g);
            arr[i][1] = arr[i][1].split(/(?=antal)/g);
            arr[i][2] = arr[i][1][1].replace("antal", "Antal: ");
            arr[i].splice([1], 1);
            arr[i][0] = arr[i][0].replace(key, "");

            const produktNamnKvitto = key;
            const produktPrisKvitto = arr[i][0];
            const produktAntalKvitto = arr[i][1];
            // arr[i] = [2099kr,Antal 1]
            // arr[i][0] = 2099kr  PRIS
            // arr[i][1] = 1    ANTAL

            fakeButton.href += produktNamnKvitto + "%0D%0A" + produktPrisKvitto + " " + produktAntalKvitto + "%0D%0A" + "%0D%0A";
        }

        fakeButton.download = 'Kvitto.txt';
        fakeButton.click();
    }
}


function visaKundkorgCheckout() { // Special version då den printar ut produkterna i sidled istället för horizontellt
    if (CheckBrowser()) {
        var item = [];
        var produktNamn = "";
        var produktPris = "";
        var produktBild = "";
        var produktAntal = "";

        var list = "<tr></tr>\n";
        var summering = "";
        var totalKostnad = 0;
        if (localStorage.length === 1) {   
            pristoInt = 0;
            produktNamn = localStorage.key(i);
            item = localStorage.getItem(produktNamn).split(/(?=http)/g); // delar item till vänster om "http"
            produktPris = item[0];
            item[2] = item[1].split(/(?=antal)/g);
            produktBild = item[2][0];
            produktAntal = item[2][1];
            produktAntal = produktAntal.replace("antal", "");

            produktPris = String((parseInt(produktAntal) * parseInt(produktPris.slice(0, -2))));


            // produktNamn	
            list += "<tr style='border-color:black; border-style: solid; border-width: thin;'><td class='fw-bolder' style='padding-right: 2%; font-size: 1.5vh; padding-left: 1%;' id='produktNamn" + i + "'>" + produktNamn + "</td>\n"

            // produktBild
            list += "<td style='text-align: left;'><img class='produktBildCheckout' src='" + produktBild + "'></img></td>\n";

            // produktPris
            totalKostnad += parseInt(produktPris); // tar bort sista två charsen (kr) samt gör om produkt priset till en int
            list += "<td class='produktPrisCheckout' id='produktPris" + i + "'>" +
                parseInt(produktPris).toLocaleString("fr") + " kr" + "</td>";

            // produktAntal
            list += "<td class='produktAntalCheckout' id='produktAntal" + i + "'>Antal: " +
                produktAntal + "</td>";

            // produktKnappar
            list += "<td type='button' class='btn btn-outline-dark mt-auto btn-sm' onclick=adderaProduktAntal(" + i + ")><a>+</a></td>"
                + "<td type='button' class='btn btn-outline-dark mt-auto btn-sm' onclick=subtraheraProduktAntal(" + i + ")><a>-</a></td>";
        }


        for (var i = 0; i <= localStorage.length -2; i+=2) {
            pristoInt = 0;
            produktNamn = localStorage.key(i);
            item = localStorage.getItem(produktNamn).split(/(?=http)/g); // delar item till vänster om "http"
            produktPris = item[0];
            item[2] = item[1].split(/(?=antal)/g);
            produktBild = item[2][0];
            produktAntal = item[2][1];
            produktAntal = produktAntal.replace("antal", "");

            produktPris = String((parseInt(produktAntal) * parseInt(produktPris.slice(0, -2))));


            // produktNamn	
            list += "<tr style='border-color:black; border-style: solid; border-width: thin;'><td class='fw-bolder' style='padding-right: 2%; font-size: 1.5vh; padding-left: 1%;' id='produktNamn" + i + "'>" + produktNamn + "</td>\n"

            // produktBild
            list += "<td style='text-align: left;'><img class='produktBildCheckout' src='" + produktBild + "'></img></td>\n";

            // produktPris
            totalKostnad += parseInt(produktPris); // tar bort sista två charsen (kr) samt gör om produkt priset till en int
            list += "<td class='produktPrisCheckout' id='produktPris" + i + "'>" +
                parseInt(produktPris).toLocaleString("fr") + " kr" + "</td>";

            // produktAntal
            list += "<td class='produktAntalCheckout' id='produktAntal" + i + "'>Antal: " +
                produktAntal + "</td>";

            // produktKnappar
            list += "<td type='button' class='btn btn-outline-dark mt-auto btn-sm' onclick=adderaProduktAntal(" + i + ")><a>+</a></td>"
                + "<td type='button' class='btn btn-outline-dark mt-auto btn-sm' onclick=subtraheraProduktAntal(" + i + ")><a>-</a></td>";

            
            
            // NY PRODUKT (För att dem ska ligga bredvid varandra i ett 2xY tabell)
            

            if (localStorage.length % 2 && i === (localStorage.length - 3)) { // Skriver ut sista itemet för sig själv
                pristoInt = 0;
                produktNamn = localStorage.key(i+1);
                item = localStorage.getItem(produktNamn).split(/(?=http)/g); // delar item till vänster om "http"
                produktPris = item[0];
                item[2] = item[1].split(/(?=antal)/g);
                produktBild = item[2][0];
                produktAntal = item[2][1];
                produktAntal = produktAntal.replace("antal", "");

                produktPris = String((parseInt(produktAntal) * parseInt(produktPris.slice(0, -2))));

                // produktNamn	
                list += "<td class='fw-bolder' style='padding-right: 2%; font-size: 1.5vh; padding-left: 1%; border-left: 1px solid;' id='produktNamn" + (i+2) + "'>" + produktNamn + "</td>\n"

                // produktBild
                list += "<td style='text-align: left;'><img class='produktBildCheckout' src='" + produktBild + "'></img></td>\n";

                // produktPris
                totalKostnad += parseInt(produktPris); // tar bort sista två charsen (kr) samt gör om produkt priset till en int
                list += "<td class='produktPrisCheckout' id='produktPris" + (i+2) + "'>" +
                    parseInt(produktPris).toLocaleString("fr") + " kr" + "</td>";

                // produktAntal
                list += "<td class='produktAntalCheckout' id='produktAntal" + (i+2) + "'>Antal: " +
                    produktAntal + "</td>";

                // produktKnappar
                list += "<td type='button' class='btn btn-outline-dark mt-auto btn-sm' onclick=adderaProduktAntal(" + (i+2) + ")><a>+</a></td>"
                    + "<td type='button' class='btn btn-outline-dark mt-auto btn-sm' onclick=subtraheraProduktAntal(" + (i+2) + ")><a>-</a></td>";
                
                
                pristoInt = 0;
                produktNamn = localStorage.key(localStorage.length-1);
                item = localStorage.getItem(produktNamn).split(/(?=http)/g); // delar item till vänster om "http"
                produktPris = item[0];
                item[2] = item[1].split(/(?=antal)/g);
                produktBild = item[2][0];
                produktAntal = item[2][1];
                produktAntal = produktAntal.replace("antal", "");
                // produktNamn	
                list += "<tr style='border-color:black; border-style: solid; border-width: thin;'><td class='fw-bolder' style='padding-right: 2%; font-size: 1.5vh; padding-left: 1%;' id='produktNamn" + (i+3) + "'>" + produktNamn + "</td>\n"

                // produktBild
                list += "<td style='text-align: left;'><img class='produktBildCheckout' src='" + produktBild + "'></img></td>\n";

                // produktPris
                totalKostnad += parseInt(produktPris); // tar bort sista två charsen (kr) samt gör om produkt priset till en int
                list += "<td class='produktPrisCheckout' id='produktPris" + (i+3) + "'>" +
                    parseInt(produktPris).toLocaleString("fr") + " kr" + "</td>";

                // produktAntal
                list += "<td class='produktAntalCheckout' id='produktAntal" + (i+3) + "'>Antal: " +
                    produktAntal + "</td>";

                // produktKnappar
                list += "<td type='button' class='btn btn-outline-dark mt-auto btn-sm' onclick=adderaProduktAntal(" + (i+3) + ")><a>+</a></td>"
                + "<td type='button' class='btn btn-outline-dark mt-auto btn-sm' onclick=subtraheraProduktAntal(" + (i+3) + ")><a>-</a></td><td style='border-left: 1px solid;'></td>";
            }
            else {
            pristoInt = 0;
            produktNamn = localStorage.key(i+1);
            item = localStorage.getItem(produktNamn).split(/(?=http)/g); // delar item till vänster om "http"
            produktPris = item[0];
            item[2] = item[1].split(/(?=antal)/g);
            produktBild = item[2][0];
            produktAntal = item[2][1];
            produktAntal = produktAntal.replace("antal", "");

            produktPris = String((parseInt(produktAntal) * parseInt(produktPris.slice(0, -2))));

            // produktNamn	
            list += "<td class='fw-bolder' style='padding-right: 2%; font-size: 1.5vh; padding-left: 1%; border-left: 1px solid;' id='produktNamn" + (i+1) + "'>" + produktNamn + "</td>\n"

            // produktBild
            list += "<td style='text-align: left;'><img class='produktBildCheckout' src='" + produktBild + "'></img></td>\n";

            // produktPris
            totalKostnad += parseInt(produktPris); // tar bort sista två charsen (kr) samt gör om produkt priset till en int
            list += "<td class='produktPrisCheckout' id='produktPris " + (i+1) + "'>" +
                parseInt(produktPris).toLocaleString("fr") + " kr" + "</td>";

            // produktAntal
            list += "<td class='produktAntalCheckout' id='produktAntal" + (i+1) + "'>Antal: " +
                produktAntal + "</td>";

            // produktKnappar
            list += "<td type='button' class='btn btn-outline-dark mt-auto btn-sm' onclick=adderaProduktAntal(" + (i+1) + ")><a>+</a></td>"
                + "<td type='button' class='btn btn-outline-dark mt-auto btn-sm' onclick=subtraheraProduktAntal(" + (i+1) + ")><a>-</a></td>";
            }
        }

        // Summeringsruta
        summering += "<tr class='card h-100'>" + "<td class='fw-bolder' style='font-size: 2vh; padding-left: 30px; padding-right: 30px; padding-bottom: 10px; text-align: center;'>"
            + "Sammanställning" + "</td>";
        summering += "<td style='text-align: center; padding-bottom: 50px'><a><img src='../Images/logga.png' style='width:40%;'></a></td>";
        summering += "<td style='padding-left: 30px; padding-right: 30px; font-size: 1.5vh'><b>Beräknad frakt: </b>0 kr";
        summering += "<td style='padding-left: 30px; padding-right: 30px; font-size: 1.5vh; padding-bottom: 50px'><b>Total Kostnad: </b>" + totalKostnad.toLocaleString("fr") + " kr" + "</td>";
        summering += "<td style='text-align: left; padding-bottom: 50px; padding-left: 20px; text-align: center;'><a style='font-size: 1.5vh;' class='btn btn-outline-dark mt-auto' onclick=DownloadFile()>Köp</a></td>" + "</tr>";



        if (list == "<tr></tr>\n") {
            list += "<tr><td class='fw-bolder' style='font-size: 2vh;'>Din kundvagn är tom</td></tr>";
        }

    } else {
        alert('Cannot save shopping list as your browser does not support HTML 5');
    }

    document.getElementById('list').innerHTML = list;
    if (document.getElementById('summering')) {
        document.getElementById('summering').innerHTML = summering;
    }
    if (document.getElementById('totalKostnad')) {
        document.getElementById('totalKostnad').innerHTML = totalKostnad.toLocaleString("fr") + "kr";
    }
}