use crate::knowledge_base::knowledge::l0_fingerprint::L0Fingerprint;
// --- L1Fingerprint
// -[~] L1Fingerprint
// szó
// Vec-et használok mert miután példányosítottük néhány elemet el kell dobni
// Itt döntjük el a hasonlóságot az l0-ról
pub struct L1Fingerprint {
    pub fingerprint: Vec<L0Fingerprint>,
    pub count: usize,
}

// poor mans "regex"
static CONSONANT: &str = "bdgjlmnrvzptckhfsy";
static VOWEL: &str = "aeioöuüáéíóőúű";
static BRAKER: &str = "0123456789@.,;-_!?$#&%\"\'+*/\\";

impl L1Fingerprint {
    pub fn new(word: &str) -> Self {
        let word = word.trim().trim_end_matches(['.', '!', '?', ',', ';']);
        let word_chars: Vec<_> = word.chars().collect();
        let mut pre_l1_fingerprint: Vec<L0Fingerprint> = Vec::new();
        // az i az a "hátső" iteráló (legutóbbi magán hangzó+1)
        let mut i: usize = 0;
        // az j az az "első" iteráló
        let mut j: usize = 0;

        let mut has_vowel: bool = false;
        let mut n_consonant: usize = 0;
        while j < word.len() && i < word.len() {
            if L0Fingerprint::has(word_chars[j], VOWEL) {
                has_vowel = true;
            }

            if L0Fingerprint::has(word_chars[j], CONSONANT) {
                n_consonant += 1;
            }

            if L0Fingerprint::has(word_chars[j], BRAKER) || n_consonant >= 3 {
                return L1Fingerprint {
                    fingerprint: vec![L0Fingerprint::new(word.to_string())],
                    count: 1,
                };
            }

            if has_vowel && n_consonant >= 2 {
                let l0 = L0Fingerprint::new(word[i..=j].to_string());

                match L0Fingerprint::l0_exist_at(&l0, &pre_l1_fingerprint) {
                    Some(i) => pre_l1_fingerprint[i].count += 1,
                    None => pre_l1_fingerprint.push(l0),
                }
                i = j + 1;
                has_vowel = false;
                n_consonant = 0;
            }
            j += 1;
        }

        L1Fingerprint {
            fingerprint: pre_l1_fingerprint,
            count: 1,
        }
    }

    // mennyier hasonlít egy szó egy másik szóra
    pub fn evaluat(&self, other: &L1Fingerprint) -> f32 {
        let mut likeliness: f32 = 0.0;
        let mut count: usize = 0;
        for this in &self.fingerprint {
            if L1Fingerprint::has(this, &other.fingerprint) {
                likeliness += this.count as f32;
            }
            count += this.count;
        }
        likeliness / (count as f32)
    }

    pub fn has(cmp: &L0Fingerprint, sieve: &[L0Fingerprint]) -> bool {
        let mut i: usize = 0;
        while i < sieve.len() && !(*cmp == sieve[i]) {
            i += 1;
        }
        i < sieve.len()
    }
}
