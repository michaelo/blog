# Om mitt svar til "Hva blir utviklernes største utfordring i 2020? 😲"
## Bakgrunn

Den 9. desember 2019 stilte kode24-redaksjonen følgende spørsmål på deres facebook-gruppe “kode24-klubben”:
> Hva blir utviklernes største utfordring i 2020? 😲

 \- og svarene der ble da lest opp på deres podcast kode24-timen episode #10](https://share.transistor.fm/s/f6221356).

Jeg tok oppfordringen og startet på det som endte opp som en litt komprimert tirade, men det ble allikevel litt mye - og ikke nødvendigvis podcast-vennligt - hvor de da kom med tilbakemeldingen om at jeg kanskje heller burde skrive om dette det f.eks. bloggformat. Så, here goes.

Den [opprinnelige kommentaren](#opprinnelig-post) kan leses i sin helhet nederst.


## TL;DR
Alt jeg kommer til å skrive nedover kommer til syvende å siste handle om at man må vurdere kost mot nytte. Utfordringen er ofte at nytten er åpenbar, mens kostnadene kan være mange og gjerne ikke gi seg til kjenne før langt senere.

Jeg mener utviklernes største utfordring vil være å med høyere presisjon vurdere de reelle kostnadene ved sine valg, eller sett fra den andre siden; bli nødt til å ta konsekvensene av tidligere valg.


## Kommentaren, tema for tema

Jeg vil her gå igjennom de ulike aspektene jeg tar opp i kommentaren. Da jeg favner ganske bredt i alt jeg er innom, såså vil jeg riktignok heller ikke her gå så dypt som jeg kanskje kunne på noe av det. Dette er primært for å få det i en mer strukturert form, samt gi det litt mer fylde og med dette danne grunnlag for fremtidige innlegg hvor jeg der heller går mer i dybden på de enkelte aspektene.


* Obs: Jeg er ikke på noen måte den første til å observere eller mene noe som helst av det jeg skriver her. Bakgrunnen for å iterere over dette er både fordi jeg føler det fortsatt fokuseres for lite på det, og at jeg så langt ikke har funnet så mange som skriver om dette på norsk.
* Obs2: Mine egne løsningnen innfrir heller ikke alle mine "krav" til optimale systemer/løsninger - men jeg tilstreber det alltid innenfor de rammene jeg har å jobbe med, og forsøker alltid å selv bli bedre, samt forbedre litt der jeg kan.
* Obs3: ...

### Om gjenbruk
Det har blitt gjentatt og gjenfortalt så mange ganger i så mange former at man ikke skal finne opp på nytt hva som allerede er funnet opp. Argumentet som blir gjort her er gjerne at det du selv improviserer sammen av en funksjon ikke er like godt kvalitetssikret som noe tredjepartskode, samt at det koste deg mere tid (og dermed i mange tilfeller: penger) enn om du finner en eksisterende løsning og bruker denne.

Dette er ikke kategorisk feil, men i mange tilfeller tas det for langt og/eller gjøres uten tilstrekkelig vurdering av de reelle kostnadene dette har.

De mer eller mindre generelle ferdigløsningene der ute er lagd med forutintatte antakelser om hvordan de skal brukes, som kanskje eller kanskje ikke stemmer med dine faktiske omgivelser (f.eks. arkitektur og generell kodestil i prosjektet du jobber i).

Ser man da på at mange slike løsninger også inneholder mer kode enn du trenger i ditt scenario legger kan man da ofte legge på en gjentakende kostnad for enten deg eller dine brukere:

* Kompileres den så må det tolkes og prosesseres
* Sendes det til nettleser så er det ekstra data å både sende og tolke
* Og selv om det kan optimaliseres bort så gir du her ekstra arbeid til ett eller annet sted i bygge-pipelinen din og på det vis øker tiden _du_ bruker for hver iterasjon

I tillegg har du de velkjente problemene rundt hvorvidt løsningen er vedlikeholdt, at du opererer innenfor lisensvilkårene, og avhengig av hvordan du spesifiserer dine avhengigheter så kan du være utsatt for senere introduksjon av feil i nye versjoner.

Jeg kunne også skrivd litt om misoppfatninger rundt "DRY" (Don't Repeat Yourself) også - men det får bli for en annen gang.


### Om abstraksjoner
En abstraksjon er i all sin enkelhet et forsøk på å trekke seg unna, skjule, eller på annet vis å beskrive noe annerledes enn slik det originalt ble gjort (ref: https://en.wikipedia.org/wiki/Abstraction, https://www.merriam-webster.com/dictionary/abstraction). I programvareutvikling forsøker man ofte å abstrahere vekk:
* detaljer man ikke ønsker å trenge forholde seg til til vanlig - f.eks. gjentakende kode, eller kompliserte operasjoner som kanskje krever spesiell kunnskap for å mestre (f.eks. algoritmer)
* moduler/komponenter/subsystemer man ønsker å frikoble seg fra for å enklere kunne:
    * erstatte
    * teste
    * jobbe med uavhengig av hverandre
* støtte multiple varianter/tilbydere av en funksjon/subsystem (f.eks: periferiutstyr, plugins)

Felles for de alle er at noen gjør en vurdering om hvilke muligheter og hva slags data som skal skjules, og definerer et grensesnitt basert på dette.
TODO: risk/problemstilling
TODO: teknisk gjeld over tid ved endring i interface.


### Om kompleksitet
Hvert nytt lag av noe som helst du legger på løsningen din øker kompleksiteten. Dette er uavhengig av om dette gjøres direkte i koden, i bygge-pipelinen, i deployment-regimet eller i infrastrukturen ellers. Dette er da hensyn som på noe tidspunkt vil være

### Om ytelse, hardware og utviklertid
Det er et knippe utsagn jeg gjør som går innom disse temaene:

> Argumenter som at utviklertid er mer kostbar enn hardware møter seg selv når man man snubler over bugs og flaskehalser som kommer fra alt fra underliggende årsaker som man enten ikke forstår til utilstrekkelige og/eller dype abstraksjoner som det vil være fryktelig kostbare å endre [...]

> [...] det er ikke akkurat som at OSene vi har i dag er veldig HW-effektive og robuste heller... Dette av historiske grunner, men dog.

> [...] det ikke er uvanlig å høre argumenter som at "ubrukt RAM er sløst RAM" [...]


### Om testkode

Jeg kaster inn en liten parantes som lyder som følger:
> [...] gjerne akkompagnert med 2:1 testkode:kode-ratio [...]

Det er ikke slik at jeg er imot testkode (automatiserte tester formulert som kode) - tvert imot.

Det jeg ganske enkelt ønsker at utviklere skal være bevisste på er at også dette er med på å øke egenmassen til kodebasen og har en påvirkning på endringsmomentet til en løsning. Velkjente argumenter er at de lar deg refaktorere uten frykt samt gir deg en ekstra advarsel ved endring på grensesnittene, men om man gjør endringer som enten påvirker de eksplisitte avhengighetene (funksjonssignaturer/API-overflate) eller de implisitte avhengighetene (de som - gjerne utilsiktet og også uønsket - baserer seg på særegenheter i den aktuelle implementasjonen) så må man også oppdatere testkoden tilsvarende. Dette _tar_ tid.

Når det kommer til forholdet mellom antall linjer testkode sett opp mot antall linjer implementasjonskode, som igjen helst bør ha en korrelasjon til faktisk testdekning for å gi mening, så er det naturlig at dette samsvarer med kritikaliteten av programvaren som utvikles: Det er forskjell på enkle kommandolinjegrensesnitt, nettsider, små og store nettapplikasjoner, bibliotekskode, rammeverk og safetykritiske systemer. I tillegg bør det være tatt stilling til de potensielt økonomiske implikasjonene feil vil ha. Eller for å snu rundt på det: antall brukere som potensielt vil være påvirket, og i hvilken grad det da vil påvirke de.


### Om det store bildet
...

## Opprinnelig post

[Svaret mitt](https://www.facebook.com/groups/kode24/permalink/1246653578857041/?comment_id=1246697968852602) (krever medlemskap i gruppen) var som følger:


    En invitasjon til ranting (y) jo =) Jeg tar den jeg.

    <rant>
    Det er nok dessverre ikke det som vil _eksplodere_ i 2020, men jeg antar at vi kommer til å se fortsettelsen på abstraksjons-og-gjenbruks-toget som har pågått i mange år nå:


    Språk, teknologier, rammeverk mm markedsføres (og slukes) på premisset rundt at vi skal i bunn og grunn ikke trenge å forholde oss til det faktum at koden vi skriver faktisk til syvende og sist skal kjøres på hardware, samt en hellig overbevisning at all skriving av egen kode som funksjonelt ligner på noe noen har lagt ut på npm/cargo/maven/nuget/... er unødvendig.


    Argumenter som at utviklertid er mer kostbar enn hardware møter seg selv når man man snubler over bugs og flaskehalser som kommer fra alt fra underliggende årsaker som man enten ikke forstår til utilstrekkelige og/eller dype abstraksjoner som det vil være fryktelig kostbare å endre da "arkitekturen" f.eks. består av (tilfeldig sammensatt eksempel her altså) en kompilert-til-JS-applikasjon (gjerne akkompagnert med 2:1 testkode:kode-ratio) med 100+ avhengigheter, bundlet med Chromium, pakket inn i en docker-container, kjørende i en eller annen sky/cluster-tjeneste (som gjerne er en abstraksjon over Kubernetes igjen) før det til slutt snakker med et faktisk OS.


    Og det er ikke akkurat som at OSene vi har i dag er veldig HW-effektive og robuste heller... Dette av historiske grunner, men dog.


    Kunne også sagt noe her om bruk av RAM også, der det ikke er uvanlig å høre argumenter som at "ubrukt RAM er sløst RAM" (fritt sitert). Argument som sett i isolasjon kan gi mening (OK nok i et embedded miljø der man har full kontroll på alt som skal kjøre), men som i desktop-miljøer fører til at når man sånn som enkelte av oss ønsker å ha flere applikasjoner kjørende samtidig så trenger man 16GB+ RAM bare for å ha et par utviklingsmiljø-instanser.


    (Ja, jeg er klar over at jeg skjærer applikasjon+infrastruktur over samme lest her)
    (Og ja, jeg vet at ingen av disse synspunktene har sitt oppghav fra meg. Men jeg videreformidler med "glede")
    (Og alle tall er semi-tilfeldig plukket basert på observasjoner)
    </rant>


    Obs: Dette var ikke en rant (kun) om web - det har vært symptomatisk innen de områdene jeg har rukket å besøke i mitt yrkesaktive liv.


    Ellers ser jeg lyst på tilværelsen jeg altså!

## Relevante linker
* <a href="#">...</a>