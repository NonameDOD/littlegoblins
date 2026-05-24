pub(super) struct Knowledge {
    fingerprint: Fingerprint,
    knowledge: String,
}

type Fingerprint = Box<[SubFingerprint]>;

struct SubFingerprint {
    fingerprint: Box<[String]>,
    count: usize,
}
