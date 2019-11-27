# Spelsystem

Grunden i motorn från Eloquent JavaScript, kapitel

* https://eloquentjavascript.net/16_game.html
* https://eloquentjavascript.net/17_canvas.html

Utökat för att basera kartan på en bild

![Map image](https://raw.githubusercontent.com/jensnti/gamesystem/master/docs/img/maps/map1.png)

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
    git clone https://github.com/jensnti/gamesystem

Kör igång din webbserver och vid behov länka mappen från din code map till public_html

    sudo service apache2 restart
    cd ~
    cd public_html
    ln -s ../code/gamesystem

Starta din webbläsare och surfa till localhost/~username/gamesystem

Om det funkar så kan du nu börja ändra saker.

## Ändra

Kartan i spelet laddas från en bild som anges i map.js
Den utgår från en nyckel med färger som bestämmer vad som ska ritas ut och vad det är i spelvärden.
Om du utgår från grundinställningarna så är gräset 255,255,0 och spelarens spawnposition 0,255,0

För att skapa en karta så kör igång Photoshop eller ett annat ritprogram och gör en ny bild.
Bilden kan vara tex. 64 x 64 px stor för att hålla det litet. Varje pixel i bilden utgör en 32 x 32 px stor yta i spelet.
Rita en mark, gräs som spelaren kan stå på genom att göra en pixel bred rad av den gula färgen och rita sedan ut spelarens spawnposition (1px).
Något sånt här

        x
    
    ----------------

Spara bilden som en 8 bitars png, var noga med att färgerna är begränsade till de som finns i din levelkey, annars kommer inte kartan att ladda.
Enklast när du sparar bilden är att använda save for webb and devices (ctrl+shift+alt+s)

Gå nu in i map.js och ändra kartan.
Ladda spelet och håll tummarna.
Funkar det inte så kolla i consolen och se om du får create / undefined fel, det betyder att du har färger i din kartfil som inte är mappade.