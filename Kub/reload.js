// En funktion för att ladda om en sida ifunktionen kan man lägga timer att den räknar tid och startar om sidan automatiskt.
//Men i det här fallet har vi kopplat den till en knapp, så att funktionen aktiveras bara när någon trycker på knappan.
//Skillnaden mellan att ladda om sidan via webbläsare och denn knapp är att funktionen använder sig av locations funktion som
//gör att sidans innehåll är det som laddas om och inte hela sidan, alltså inte hela kommunikationen med sidan och servern, dvs. cache data.
(() => {
  setTimeout(() => {
    document.getElementsByTagName("body")[0];
  }, 50)
})();
function sampleFunction() {
  location.reload(true);
}
