// --- Knowledge
// szöveg
// Box mert ez nem fog változni futás idő közben
// Itt döntjük el az L1-es hasonlóságot
pub(super) struct Knowledge {
    fingerprint: Box<[L1Fingerprint]>,
    text: String,
}

impl Knowledge {
    fn new(text: String) -> Self {
        todo!()
    }
}

// --- L1Fingerprint
// szó
// Vec-et használok mert miután példányosítottük néhány elemet el kell dobni
// Itt döntjük el a hasonlóságot az l0-ról
struct L1Fingerprint {
    pub fingerprint: Vec<L0Fingerprint>,
    pub count: usize,
}

impl L1Fingerprint {
    fn new(word: &[char]) -> Self {
        let mut pre_l1_fingerprint: Vec<L0Fingerprint> = Vec::new();
        // az i az a "hátső" iteráló
        let mut i: u32 = 0;
        // az j az az "első" iteráló
        let mut j: u32 = 0;
        todo!()
    }
}

// --- L0Fingerprint
// szótag
// Itt csak egy szótagot tárolunk és hogy hány van a szóban belőlle
// Itt nem csinálunk össze hasonlítást ez csak tároló
struct L0Fingerprint {
    pub fingerprint: String,
    pub count: usize,
}

impl L0Fingerprint {
    fn new(syllable: String) -> Self {
        L0Fingerprint {
            fingerprint: syllable,
            count: 1,
        }
    }
}
