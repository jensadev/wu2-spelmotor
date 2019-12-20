# Spelmotor

Grunden i motorn kommer från boken Eloquent JavaScript, den har utökats på diverse sätt.
Framförallt så läser motorn in kartan från en bild.
Vill du läsa mer se kapitel:

* https://eloquentjavascript.net/16_game.html
* https://eloquentjavascript.net/17_canvas.html

![Map image](https://raw.githubusercontent.com/jensnti/wu2-spelmotor/master/docs/img/maps/map1.png)

##Struktur

    docs/
        css/
            style.css
            reset.css
        img/
            maps/
                map1.png
            sprites/
                player.png
            item.png
        js/
            main.js
            CLASSES.js
        index.html

## Kom igång och testa

Klona detta repo

    cd ~
    cd code
    git clone https://github.com/jensnti/wu2-spelmotor

Kör igång din webbserver och vid behov länka mappen från din code map till public_html.
Anledningen till detta är att vi ritar ut bilder på ett canvas och återanvänder dem, så då kan vi inte bara
ladda lokala filer.

    sudo service apache2 restart
    cd ~
    cd public_html
    ln -s ../code/wu2-spelmotor

Starta din webbläsare och surfa till localhost/~username/wu2-spelmotor

Om det funkar så kan du nu börja ändra saker.

## Din första karta

Kartan i spelet laddas från en bild som anges i map.js / demo.js
Den utgår från en nyckel med färger som bestämmer vad som ska ritas ut och vad det är i spelvärden.
Om du utgår från grundinställningarna så är gräset 255,255,0 och spelarens spawnposition 0,255,0

För att skapa en karta så kör igång Photoshop eller ett annat ritprogram och gör en ny bild.
Bilden kan vara tex. 64 x 64 px stor för att hålla det litet. Varje pixel i bilden utgör en 32 x 32 px stor yta i spelet.
Rita en mark, gräs som spelaren kan stå på genom att göra en pixel bred rad av den gula färgen och rita sedan ut spelarens spawnposition (1px).
Något sånt här

        x
    
    ----------------

Spara bilden som en 8 bitars png, var noga med att färgerna är begränsade till de som finns i din levelkey, annars kommer inte kartan att ladda.
Enklast när du sparar bilden är att använda save for webb and devices (ctrl+shift+alt+s) du kan då även se vilka färger som bilden innehåller.
Om färgerna inte är mappade så kommer kartan misslyckas med att laddas. Kolla utvecklarverktygen i webbläsaren (ctrl+shift+i / f12).

Gå nu in i demo.js och ändra kartan.
Ladda spelet och håll tummarna.

## Ett nytt spelobjekt

Kopiera filen för Item klassen. Döp om hänvisningarna från Item till Smile.
I demo.js sp lägger du sedan till en färg samt en hänvisning till Smile klassen.
Provkör nu med debugColorMode satt till true. Lägg sedan till en hänvisning i
sources till smile.png spriten.

Fungerar din smile, prova med att ändra storleken.

### En fiende

I klassen Enemy finns koden för att lägga till en fiende i spelet. Prova att lägga till den på din demokarta,
lägg till en färg som ska mappas till fienden i levelKey, lägg till fienden i sources (du kan använda spriten enemy.png)