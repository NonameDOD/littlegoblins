use crate::knowledge_base::fingerprint_traits::Fingerprinteable;

pub(super) struct Knowledge {
    fingerprint: Fingerprint,
    knowledge: String,
}

impl Knowledge {
    fn new(text: String) -> Self {
        Knowledge {
            fingerprint: Fingerprint::new(&text),
            knowledge: text,
        }
    }
}

// --- Fingerprint

// ez a "szöveg"
// fp
struct Fingerprint {
    fingerprint: Box<[SubFingerprint]>,
}

impl Fingerprint {
    fn new(text: &str) -> Self {
        let words: Vec<&str> = text.rsplit(" ").collect();
        let mut pre_SubFingerprint: Vec<Fingerprint> = Vec::new();
        for word in words {}
        todo!()
    }
}

impl Fingerprint {
    // A "szövegnek" a SubFingerprint-eit evaluate-eljük
    fn evaluate(&self, other: &Fingerprint) -> f32 {
        let mut likeliness: f32 = 0.0;
        let mut n_of: usize = 0;
        for this in &self.fingerprint {
            for that in &other.fingerprint {
                if this.fsize()>that.fsize(){
                    likeliness += this.evaluate(that);
                    n_of += 1;
                }else {
                    that.evaluate(this);
                    n_of += 1;
                }
            }
        }
        likeliness/(n_of as f32)
    }
    fn fsize(&self) -> usize {
        self.fingerprint.len()
    }
    // ha roszz a tipus -> Err
    /*
    fn fingerprints<T: Fingerprinteable>(&self) -> Result<&Box<[T]>, ()> {
        Ok(&self.fingerprint)
    }*/
}

// --- SubFingerprint

// v2-ben majd meg csinálom egyenlőre működjön valami
// ezek a "szavak"
// sfp
struct SubFingerprint {
    pub fingerprint: Box<[String]>,
    pub count: usize,
}

impl SubFingerprint {
    //talán krakter lista lenne a jó döntés
    fn new(word: Box<[u8]>) -> Self {
        todo!();
    }
}

impl SubFingerprint {
    // A "szavakat" evaluate-eljük
    fn evaluate(&self, other: &SubFingerprint) -> f32 {
        let mut likeliness: f32 = 0.0;
        let mut n_of: usize = 0;
        for this in &self.fingerprint{
            for that in &other.fingerprint {
                if this == that {
                    likeliness += 1.0;
                    n_of += 1;
                }else {
                    n_of += 1;
                }
            }
        }
        likeliness/(n_of as f32)
    }
    fn fsize(&self) -> usize {
        self.fingerprint.len()
    }
    // ha roszz a tipus -> Err
    /* 
    fn sub_fingerprints<T: Fingerprinteable>(&self) -> Result<&Box<[String]>, ()> {
        Ok(&self.fingerprint)
    }*/
}

// --- statikus funkciók

// mindig a nagyban keressük a kicsit
// ez kész
pub(super) fn evaluate(this: Fingerprint, that: Fingerprint) -> f32 {
    if this.fsize() > that.fsize() {
        this.evaluate(that)
    } else {
        that.evaluate(this)
    }
}
