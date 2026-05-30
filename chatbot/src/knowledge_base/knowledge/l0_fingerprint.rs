// --- L0Fingerprint
// -[x] L0Fingerprint
// szótag
// Itt csak egy szótagot tárolunk és hogy hány van a szóban belőlle
// Itt nem csinálunk össze hasonlítást ez csak tároló
// A Magyar szótagolásnak nem fog megfelelni de általánosságban alanit eredetű
// nyelvek szótagolására meg felel
pub struct L0Fingerprint {
    pub fingerprint: Box<str>,
    pub count: usize,
}

impl L0Fingerprint {
    pub fn new(syllable: String) -> Self {
        L0Fingerprint {
            fingerprint: syllable.into_boxed_str(),
            count: 1,
        }
    }

    pub fn has(char: char, sieve: &str) -> bool {
        let mut i: usize = 0;
        let sieve: Vec<_> = sieve.chars().collect();
        while i < sieve.len() && (char != sieve[i]) {
            i += 1;
        }
        i < sieve.len()
    }

    pub fn l0_exist_at(cmp: &L0Fingerprint, sieve: &[L0Fingerprint]) -> Option<usize> {
        let mut i: usize = 0;
        while i < sieve.len() && !(*cmp == sieve[i]) {
            i += 1;
        }
        if i < sieve.len() { Some(i) } else { None }
    }
}

impl PartialEq for L0Fingerprint {
    fn eq(&self, other: &Self) -> bool {
        self.fingerprint == other.fingerprint
    }
}
