import{np as l,nq as _}from"./vendor.d423bc92.js";function c(t,e){for(var r=0;r<e.length;r++){const n=e[r];if(typeof n!="string"&&!Array.isArray(n)){for(const a in n)if(a!=="default"&&!(a in t)){const o=Object.getOwnPropertyDescriptor(n,a);o&&Object.defineProperty(t,a,o.get?o:{enumerable:!0,get:()=>n[a]})}}}return Object.freeze(t)}var s,u,d,m,i={exports:{}};s=i,u=i.exports,d=function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={_decimalSeparator:".",_thousandSeparator:"'",_big_number_suffix_3:"K",_big_number_suffix_6:"Mio",_big_number_suffix_9:"Mrd",_big_number_suffix_12:"Bio",_big_number_suffix_15:"Brd",_big_number_suffix_18:"Trill",_big_number_suffix_21:"Trd",_big_number_suffix_24:"Y",_small_number_suffix_3:"m",_small_number_suffix_6:"\u03BC",_small_number_suffix_9:"n",_small_number_suffix_12:"p",_small_number_suffix_15:"f",_small_number_suffix_18:"a",_small_number_suffix_21:"z",_small_number_suffix_24:"y",_byte_suffix_B:"B",_byte_suffix_KB:"KB",_byte_suffix_MB:"MB",_byte_suffix_GB:"GB",_byte_suffix_TB:"TB",_byte_suffix_PB:"PB",_date_millisecond:"mm:ss SSS",_date_second:"HH:mm:ss",_date_minute:"HH:mm",_date_hour:"HH:mm",_date_day:"dd. MMM",_date_week:"ww",_date_month:"MMM",_date_year:"yyyy",_duration_millisecond:"SSS",_duration_second:"ss",_duration_minute:"mm",_duration_hour:"hh",_duration_day:"dd",_duration_week:"ww",_duration_month:"MM",_duration_year:"yyyy",_era_ad:"v. Chr.",_era_bc:"n. Chr.",A:"",P:"",AM:"",PM:"","A.M.":"","P.M.":"",January:"Januar",February:"Februar",March:"M\xE4rz",April:"April",May:"Mai",June:"Juni",July:"Juli",August:"August",September:"September",October:"Oktober",November:"November",December:"Dezember",Jan:"Jan.",Feb:"Febr.",Mar:"M\xE4rz",Apr:"Apr.","May(short)":"Mai",Jun:"Juni",Jul:"Juli",Aug:"Aug.",Sep:"Sept.",Oct:"Okt.",Nov:"Nov.",Dec:"Dez.",Sunday:"Sonntag",Monday:"Montag",Tuesday:"Dienstag",Wednesday:"Mittwoch",Thursday:"Donnerstag",Friday:"Freitag",Saturday:"Samstag",Sun:"So.",Mon:"Mo.",Tue:"Di.",Wed:"Mi.",Thu:"Do.",Fri:"Fr.",Sat:"Sa.",_dateOrd:function(r){return r+"."},"Zoom Out":"Herauszoomen",Play:"Abspielen",Stop:"Stop",Legend:"Legende","Click, tap or press ENTER to toggle":"Klicken, tippen oder ENTER dr\xFCcken zum Umschalten",Loading:"Wird geladen",Home:"Home",Chart:"Diagramm","Serial chart":"Seriendiagramm","X/Y chart":"X-Y-Diagramm","Pie chart":"Kreisdiagramm","Gauge chart":"Messdiagramm","Radar chart":"Netzdiagramm","Sankey diagram":"Sankey-Diagramm","Chord diagram":"","Flow diagram":"Flussdiagramm","TreeMap chart":"Baumdiagramm",Series:"Serie","Candlestick Series":"Kerzendiagramm","Column Series":"Balkendiagramm","Line Series":"Liniendiagramm","Pie Slice Series":"Kreisdiagramm","X/Y Series":"Punktdiagramm",Map:"Karte","Press ENTER to zoom in":"Dr\xFCcke ENTER zum Hereinzoomen","Press ENTER to zoom out":"Dr\xFCcke ENTER zum Herauszoomen","Use arrow keys to zoom in and out":"Benutze die Pfeiltasten zum Zoomen","Use plus and minus keys on your keyboard to zoom in and out":"Benutze Plus- und Minustasten zum Zoomen",Export:"Export",Image:"Bild",Data:"Daten",Print:"Drucken","Click, tap or press ENTER to open":"Zum \xD6ffnen klicken, tippen oder ENTER dr\xFCcken","Click, tap or press ENTER to print.":"Zum Drucken klicken, tippen oder ENTER dr\xFCcken.","Click, tap or press ENTER to export as %1.":"Klicken, tippen oder ENTER dr\xFCcken um als %1 zu exportieren",'To save the image, right-click this link and choose "Save picture as..."':'Um das Bild zu speichern, Rechtsklicken und "Bild speichern unter ..." ausw\xE4hlen','To save the image, right-click thumbnail on the left and choose "Save picture as..."':'Um das Bild zu speichern, Rechtsklick auf das Vorschaubild links und "Bild speichern unter ..." ausw\xE4hlen',"(Press ESC to close this message)":"ESC dr\xFCcken um diese Nachricht zu schlie\xDFen","Image Export Complete":"Bildexport komplett","Export operation took longer than expected. Something might have gone wrong.":"Der Export dauert l\xE4nger als geplant. Vielleicht ist etwas schiefgelaufen.","Saved from":"Gespeichert von",PNG:"",JPG:"",GIF:"",SVG:"",PDF:"",JSON:"",CSV:"",XLSX:"","Use TAB to select grip buttons or left and right arrows to change selection":"TAB nutzen, um Ankerpunkte auszuw\xE4hlen oder linke und rechte Pfeiltaste um die Auswahl zu \xE4ndern","Use left and right arrows to move selection":"Linke und rechte Pfeiltaste nutzen um die Auswahl zu verschieben","Use left and right arrows to move left selection":"Linke und rechte Pfeiltaste nutzen um die linke Auswahl zu verschieben","Use left and right arrows to move right selection":"Linke und rechte Pfeiltaste nutzen um die rechte Auswahl zu verschieben","Use TAB select grip buttons or up and down arrows to change selection":"TAB nutzen, um Ankerpunkte auszuw\xE4hlen oder Pfeiltaste nach oben und unten dr\xFCcken, um die Auswahl zu \xE4ndern","Use up and down arrows to move selection":"Pfeiltaste nach oben und unten dr\xFCcken, um die Auswahl zu verschieben","Use up and down arrows to move lower selection":"Pfeiltaste nach oben und unten dr\xFCcken, um die untere Auswahl zu verschieben","Use up and down arrows to move upper selection":"Pfeiltaste nach oben und unten dr\xFCcken, um die obere Auswahl zu verschieben","From %1 to %2":"Von %1 bis %2","From %1":"Von %1","To %1":"Bis %1","No parser available for file: %1":"Kein Parser f\xFCr Datei %1 verf\xFCgbar","Error parsing file: %1":"Fehler beim Parsen von Datei %1","Unable to load file: %1":"Datei %1 konnte nicht geladen werden","Invalid date":"Kein Datum"}},(m=d(l,u))!==void 0&&(s.exports=m);const f=_(i.exports),p=Object.freeze(c({__proto__:null,default:f},[i.exports]));export{p as d};
