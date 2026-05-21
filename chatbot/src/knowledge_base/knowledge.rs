pub(super) struct Knowledge<const T: usize> {
    fingerprint: Fingerprint,
    knowledge: String,
}

type Fingerprint = Box<[SubFingerprint]>;

struct SubFingerprint {
    fingerprint: Box<[String]>,
    count: usize,
}

struct U8Count {
    caracter: u8,
    count: usize,
}
