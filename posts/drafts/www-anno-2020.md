# www anno 2020

_Viktig: Dette er ikke hakking på React - de løser et problem på det beste viset de kan innenfor sine rammer og tilbyr verdi til utviklere og deres sluttbrukere. Dette er ganske enkelt ment som en liten observasjon på hvor vi er kommet generelt sett, og dette dukket nylig opp som interessant manifestasjon av det hele._

Det flagges som en nyhet at det nå har blitt implementert en [schedulingsløsning i React](https://reactjs.org/docs/concurrent-mode-intro.html) for å kunne gi styring/prioritering av f.eks. rendring av brukergrensesnitt opp mot IO-håndtering.

Dette får meg til å tenke.

Vi har nå da en datamaskin, typisk med en CPU med multiple kjerner (2+) og gjerne med støtte for multiple eksekveringstråder på maskinvarenivå pr kjerne. Oppå dette legger vi et operativsystem som har en scheduler for å administrere hvor og når de ulike prosessene og applikasjonstrådene vi ønsker kjørende skal få nettopp kjøretid. Typisk er denne scheduleren preemptiv slik at vi får en følelse av samtidighet, selv ved multiple oppgaver på samme CPU-tråd.

En av applikasjonene vi kjører på dette OSet er en nettleser, som typisk kjører et knippe applikasjons-tråder pr fane du har åpen, i tillegg til noen for generell funksjonalitet som brukergrensesnitt (vi ønsker jo ikke at brukeren skal ha en dårligere enn nødvendig brukeropplevelse generelt selv om noen sider skulle henge litt - som i praksis er det samme argumentet som gjøres for overnevnte funksjonstilvekst i React) og oppdateringssjekker mm. Disse gis da til OS-scheduleren for å iblant få kjøretid på maskinvaren.

I en av disse trådene som kjøres opp for en fane så kjøres det en javascript-motor (f.eks. [V8](https://v8.dev/)) hvis en av sine egenskaper er sin enkelttrådede [event-loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) som skal la utviklere skrive effektiv asynkron, IO-drevet kode, hvilket vi tar nytte av med callbacks og løfter.

I en slik applikasjonstråd gjenimplementerer vi da i praksis et subset av en scheduler tilsvarende det operativsystemet allerede har gjort mot maskinvaren (Concurrent mode/Susponse er noe mer meningsstyrt rundt bruk, men i bunn og grunn...).

I tillegg kan vi da legge på [denne](https://mightyapp.com/) som flytter nettleseren til "skyen".

La spesielt tanken på denne siste synke litt.

...

...

...

Siden dagens nettløsninger totalt sett bruker så mye ressurser som de gjør så tenkes det at løsningen er å flytte håndteringen av alt dette til “skyen”, og heller streame det til deg lokalt.

Vi har da: en klientklient <-> klient-i-skyen-som-også-er-en-server <-> backend-løsning.

Min umiddelbare tanke: www er overmodent for et redesign.

Jeg er ikke sint - bare veldig fascinert.
