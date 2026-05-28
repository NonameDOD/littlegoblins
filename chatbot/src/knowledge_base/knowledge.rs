use std::ops::Add;

// --- Knowledge
// szöveg
// Box mert ez nem fog változni futás idő közben
// Itt döntjük el az L1-es hasonlóságot
pub(super) struct Knowledge {
    fingerprint: Vec<L1Fingerprint>,
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

// "regex"
static CONSONANT: &str = "bdgjlmnrvzptckhfs";
static VOWEL: &str = "aeioöuüáéíóőúű";
static BRAKER: &str ="0123456789@.,;-!?$#&%\"\'+-*/\\";

impl L1Fingerprint {
    fn new(word: &str) -> Self {
        let mut pre_l1_fingerprint: Vec<L0Fingerprint> = Vec::new();
        // az i az a "hátső" iteráló (legutóbbi magán hangzó+1)
        let mut i: usize = 0;
        // az j az az "első" iteráló
        let mut j: usize = 0;

        let mut has_vowel: bool = false;
        let mut n_consonant: usize = 0;
        while i<word.len() {
            while j<word.len() {
                if has(word[j],VOWEL){
                    has_vowel = true;
                }
                if has(word[j], CONSONANT) {
                    n_consonant+=1;   
                }
                if has(word[j], BRAKER) {
                    i=word.len();
                    j=word.len();
                    return L1Fingerprint{
                        fingerprint: vec![L0Fingerprint::new(word.to_string())],
                        count: 1,
                    };
                }
                if has_vowel && n_consonant>=2{
                    let l0 = L0Fingerprint::new(word[i..j].to_string());
                    match l1_exist(l0, pre_l1_fingerprint) {
                        Some(i)=> &mut pre_l1_fingerprint.add(i),
                        None=>pre_l1_fingerprint.push(l0),
                }
            }
        }
        L0Fingerprint { fingerprint: pre_l1_fingerprint, count: 1 }
    }

    fn evaluat(&self,other: L1Fingerprint)->f32{

    }
}

// --- L0Fingerprint
// szótag
// Itt csak egy szótagot tárolunk és hogy hány van a szóban belőlle
// Itt nem csinálunk össze hasonlítást ez csak tároló
// A Magyar szótagolásnak nem fog megfelelni de általánosságban alanit eredetű
// nyelvek szótagolására meg felel
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
    fn add(&self, i:usize){
        self.count += i;
    }
}

impl PartialEq for L0Fingerprint {
    fn eq(&self, other: &Self) -> bool {
        self.fingerprint==other.fingerprint
    }
    fn ne(&self, other: &Self) -> bool {
        self.fingerprint!=other.fingerprint
    }
    
}

fn has(char: u8, sieve: &str)->bool{
    let mut i: usize = 0;
    while i<sieve.len()&&!(char==sieve.as_bytes()[i]) {
        i += 1;
    }
    i<sieve.len()
}

fn l0_exist(cmp:L0Fingerprint, sieve: Vec<L0Fingerprint>)->Option<usize>{
    let mut i: usize = 0;
    while i<sieve.len()&&!(cmp==sieve[i]) {
        i += 1;
    }
    if i<sieve.len(){
        Some(i)
    }else {
        None
    }
}
