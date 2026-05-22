pub(super) struct Knowledge {
    fingerprint: Fingerprint,
    knowledge: String,
}

// fp
struct Fingerprint {
    sub_fingerprints: Box<[SubFingerprint]>,
    count: usize,
}

// v2-ben majd meg csinálom egyenlőre működjön valami
// sfp
struct SubFingerprint {
    fingerprint: Box<[String]>,
    count: usize,
}

impl Knowledge {
    //Konstruktor
    fn new(text: String) -> Self {
        let words: Vec<&str> = text.rsplit(" ").collect();
        let pre_fingerprint: Vec<Fingerprint>;
        todo!()
    }
}

impl Fingerprint {
    fn new(word: &str) -> Self {
        todo!();
    }
}

impl SubFingerprint {
    //talán krakter lista lenne a jód döntés
    fn new(word: [u8]) -> Self {
        todo!();
    }
}
