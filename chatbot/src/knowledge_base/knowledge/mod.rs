mod l0_fingerprint;
mod l1_fingerprint;
mod tests;

use std::os::windows::fs::FileTypeExt;

use crate::knowledge_base::knowledge::l1_fingerprint::L1Fingerprint;
// --- Knowledge
// -[~] Knowledge
// szöveg
// Box mert ez nem fog változni futás idő közben
// Itt döntjük el az L1-es hasonlóságot
pub(super) struct Knowledge {
    fingerprint: Vec<L1Fingerprint>,
    text: String,
}

impl Knowledge {
    const NEW_THRESHOLD: f32 = 0.8;
    const WORK_THRESHOLD: f32 = 0.4;

    fn new(text: String) -> Self {
        let mut pre_fingerprint: Vec<L1Fingerprint> = Vec::new();
        let l_text: String = text.clone().to_lowercase();
        let words: Vec<&str> = l_text.split(" ").collect();
        for word in words {
            if word.len() > 2 {
                let l1: L1Fingerprint = L1Fingerprint::new(word);
                match Knowledge::has(&l1, &pre_fingerprint) {
                    Some(i) => pre_fingerprint[i].count += 1,
                    None => pre_fingerprint.push(l1),
                }
            }
        }
        Knowledge {
            fingerprint: pre_fingerprint,
            text,
        }
    }

    fn has(cmp: &L1Fingerprint, sieve: &[L1Fingerprint]) -> Option<usize> {
        let mut i: usize = 0;
        while i < sieve.len() && (Knowledge::NEW_THRESHOLD >= sieve[i].evaluat(cmp)) {
            i += 1;
        }
        if i < sieve.len() { Some(i) } else { None }
    }

    fn cmp(cmp: &L1Fingerprint, sieve: &[L1Fingerprint]) -> Option<f32> {
        let mut i: usize = 0;
        let mut likeliness = sieve[i].evaluat(cmp);
        while i < sieve.len() && (Knowledge::WORK_THRESHOLD >= likeliness) {
            likeliness = sieve[i].evaluat(cmp);
            i += 1;
        }
        if i < sieve.len() {
            Some(likeliness)
        } else {
            None
        }
    }

    fn evaluat(&self, other: &Knowledge) -> f32 {
        let mut likeliness: f32 = 0.0;
        let mut count: usize = 0;
        //let mut cmp: Option<f32> = Some(0.0);
        for this in &self.fingerprint {
            //cmp = Knowledge::cmp(this, &other.fingerprint);
            if let Some(l) = Knowledge::cmp(this, &other.fingerprint) {
                likeliness += (this.count as f32) * l;
            }
            count += this.count;
        }
        likeliness / (count as f32)
    }
}
