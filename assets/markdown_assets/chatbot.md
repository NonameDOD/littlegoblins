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

A `Fingerprint`-et `SubFingerprint`-ek teszik ki

### SubFingerprint

A `SubFingerprint` feladata hogy aszisztálja a `Fingerprint`-et.
