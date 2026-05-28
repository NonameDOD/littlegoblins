// --- Knowledge
// -[ ] Knowledge
// szöveg
// Box mert ez nem fog változni futás idő közben
// Itt döntjük el az L1-es hasonlóságot
pub(super) struct Knowledge {
    fingerprint: Vec<L1Fingerprint>,
    text: String,
}

impl Knowledge {
    fn new(text: String) -> Self {
        let pre_fingerprint: Vec<L1Fingerprint> = Vec::new();
        let words: Vec<String> = text.split(" ").collect();
        Knowledge {
            fingerprint: pre_fingerprint,
            text,
        }
    }
}

// --- L1Fingerprint
// -[~] L1Fingerprint
// szó
// Vec-et használok mert miután példányosítottük néhány elemet el kell dobni
// Itt döntjük el a hasonlóságot az l0-ról
struct L1Fingerprint {
    pub fingerprint: Vec<L0Fingerprint>,
    pub count: usize,
}

// "regex"
static CONSONANT: &str = "bdgjlmnrvzptckhfsy";
static VOWEL: &str = "aeioöuüáéíóőúű";
static BRAKER: &str = "0123456789@.,;-_!?$#&%\"\'+*/\\";

impl L1Fingerprint {
    fn new(word: &str) -> Self {
        let mut pre_l1_fingerprint: Vec<L0Fingerprint> = Vec::new();
        // az i az a "hátső" iteráló (legutóbbi magán hangzó+1)
        let mut i: usize = 0;
        // az j az az "első" iteráló
        let mut j: usize = 0;

        let mut has_vowel: bool = false;
        let mut n_consonant: usize = 0;
        while j < word.len() && i < word.len() {
            if L0Fingerprint::has(word.as_bytes()[j], VOWEL) {
                has_vowel = true;
            }

            if L0Fingerprint::has(word.as_bytes()[j], CONSONANT) {
                n_consonant += 1;
            }

            if L0Fingerprint::has(word.as_bytes()[j], BRAKER) || n_consonant >= 3 {
                return L1Fingerprint {
                    fingerprint: vec![L0Fingerprint::new(word.to_string())],
                    count: 1,
                };
            }

            if has_vowel && n_consonant >= 2 {
                let l0 = L0Fingerprint::new(word[i..j].to_string());

                match l0_exist(&l0, &pre_l1_fingerprint) {
                    Some(i) => pre_l1_fingerprint[i].count += 1,
                    None => pre_l1_fingerprint.push(l0),
                }
                i = j;
                has_vowel = false;
                n_consonant = 0;
            }
        }

        L1Fingerprint {
            fingerprint: pre_l1_fingerprint,
            count: 1,
        }
    }

    // mennyier hasonlít egy szó egy másik szóra
    fn evaluat(&self, other: L1Fingerprint) -> f32 {
        let mut likeliness: f32 = 0.0;
        let mut count: usize = 0;
        for this in &self.fingerprint {
            if L1Fingerprint::has(this, &other.fingerprint) {
                likeliness += 1.0;
            }
            count += this.count;
        }
        likeliness / (count as f32)
    }

    fn has(cmp: &L0Fingerprint, sieve: &[L0Fingerprint]) -> bool {
        let mut i: usize = 0;
        while i < sieve.len() && !(*cmp == sieve[i]) {
            i += 1;
        }
        i < sieve.len()
    }
}

// --- L0Fingerprint
// -[x] L0Fingerprint
// szótag
// Itt csak egy szótagot tárolunk és hogy hány van a szóban belőlle
// Itt nem csinálunk össze hasonlítást ez csak tároló
// A Magyar szótagolásnak nem fog megfelelni de általánosságban alanit eredetű
// nyelvek szótagolására meg felel
struct L0Fingerprint {
    pub fingerprint: Box<str>,
    pub count: usize,
}

impl L0Fingerprint {
    fn new(syllable: String) -> Self {
        L0Fingerprint {
            fingerprint: syllable.into_boxed_str(),
            count: 1,
        }
    }

    fn has(char: u8, sieve: &str) -> bool {
        let mut i: usize = 0;
        while i < sieve.len() && (char != sieve.as_bytes()[i]) {
            i += 1;
        }
        i < sieve.len()
    }
}

impl PartialEq for L0Fingerprint {
    fn eq(&self, other: &Self) -> bool {
        self.fingerprint == other.fingerprint
    }
}

fn l0_exist(cmp: &L0Fingerprint, sieve: &[L0Fingerprint]) -> Option<usize> {
    let mut i: usize = 0;
    while i < sieve.len() && !(*cmp == sieve[i]) {
        i += 1;
    }
    if i < sieve.len() { Some(i) } else { None }
}
