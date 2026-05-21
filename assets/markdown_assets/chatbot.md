# Chatbot

### Általános tervezési elvek

- a kód futási ideje előnyt élvez
  > ha egy konvenció megtörésével ~20%-kal gyorsabban fut
- tbd

---

## Knowledges

### KnowledgesBase

Ennek a struktútának a feladata hogy a `Knowledge`-okat tárolja
és a lehető legjobb `Knowledge` találatot hozza vissza.
json file-ból lehet hydratálni.

### Knowledge

Ennek a struktúrának a feladata hogy a szöveget és a fingerprintet tárolja.
A KnowledgeBase hydratálásánál ez is hydratálódik.

---

## Fingerprints

### Fingerprint

A `Fingerprint`-ek feladata hogy egy szöveghez rendeljen egy ~egyedi azonosítót.
  > Tisztába vagyok vele hogy ez nem elérhető de a jelenlegi esetben
  > a tökéletességre törekszünk és elfogadjuk ami lessz.

A `Fingerprint`-et `SubFingerprint`-ek teszik ki, van hozzá egy statikus fügvény ami a `fingerprint`-kekt
össze hasonlítja és egy súlyozott átlagot hoz vissza ami a `SubFingerprint`-ek ből jön ki 0..=1 között.
1: teljes egyezés
0: "semmi" nem egyezik

Példa hogy a `fingerprint`-ek hogy jönnek létre a szövegből:

```
v---v------v-----v---v--------- Fingerprints
Egy|almafa|van|a|11.|körzetbe
```

Az `a` kimarad mert nem elég hosszú hogy bármi "értelmet" tároljon

### SubFingerprint

A `SubFingerprint` feladata hogy aszisztálja a `Fingerprint`-et.
A `SubFingerprint`-eket szótagok teszik ki.
Példa hogy a `SubFingerprint`-ek hogy jönnek létre szavakból:

```
 v----SubFingerprint
|Egy|

 v--v--v---SubFingerprint
|al|ma|fa|

 v----SubFingerprint
|1986|

 v-----------SubFingerprint
|adobc029uid|

 v--------------SubFingerprint
|valami@mail.hu|

 v--v--v---v---SubFingerprint
|be|bo|rít|ja|.
```

Ha szám ról van szó akkor nem bontjuk, ha speciális jarakter van a szövegben akkor ugyan csak nem bontjuk
