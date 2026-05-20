use crate::knowledge_base::fingerprint_traits::*;

pub(super) struct Knowledge {
    fingerprint: Box<[WFingerprint]>,
    knowledge: String,
}

struct WFingerprint {
    fingerprint: Box<[U8Count]>,
}

struct U8Count {
    caracter: u8,
    count: usize,
}

impl Fingerprint for WFingerprint {}

impl FingerprintChar for U8Count {}

pub fn evaluate() -> f32 {
    todo!()
}

fn evaluateChar() -> f32 {
    todo!()
}
