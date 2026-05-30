use crate::{
    knowledge_base::{
        Knowledge,
        knowledge::{L0Fingerprint, L1Fingerprint},
    },
    *,
};

mod knowledge_test;
mod l0_fingerprint_test;
mod l1_fingerprint_test;

#[test]
fn l0_ascii_negativ_test() {
    let sieve = "123456789ű";
    assert!(
        !L0Fingerprint::has('0', sieve),
        "\ta szitán át megy egy érték ami nem fenn kéne akadnia"
    );
}
#[test]

fn l0_ascii_positiv_test() {
    let sieve = "123456789ű";
    assert!(
        L0Fingerprint::has('8', sieve),
        "\ta szitán át megy egy érték aminek fenn kéne maradnia"
    );
}

#[test]
fn l0_utf8_test() {
    let sieve = "123456789ű";
    assert!(
        L0Fingerprint::has('ű', sieve),
        "\ta szita nem tud utf-8 as karaktereket kezelni"
    );
}

// --- l1
#[test]
fn l1_standard_test() {
    let t1 = L1Fingerprint::new("alma");
    let t2 = L1Fingerprint::new("maal.");
    let a = t1.evaluat(&t2);
    assert!(
        a == 1f32,
        "\ta szavakat nem megfelelően hasonlítja össze vagy darabolja fel"
    );
}

#[test]
fn l1_special_test() {
    let t1 = L1Fingerprint::new("al.ma");
    let t2 = L1Fingerprint::new("ma.al");
    let a = t1.evaluat(&t2);
    assert!(
        a == 0f32,
        "\tA szavak ban a \"sepciális\" karaktereket nem kezeli jól"
    );
}

#[test]
fn l1_len_correctnes() {
    let t1 = L1Fingerprint::new("alma");
    assert!(
        t1.fingerprint.len() == 2,
        "\tAz l1 konstruktor nem darabolja fel a szavakat jól"
    )
}

// --- knowledge
#[test]
fn knowledge_len_test() {
    let text = String::from("az alma piros");
    let k1 = Knowledge::new(text);
    assert!(
        k1.fingerprint.len() == 2,
        "\tKnowledge konstruktor nem működik jól"
    );
}

#[test]
fn knowledge_compersion_test() {
    let text = String::from("az alma piros");
    let k1 = Knowledge::new(text.clone());
    let k2 = Knowledge::new(text);
    assert!(
        k1.evaluat(&k2) == 1f32,
        "\tKnowledge nem tudja normálisan evaluat-elni"
    );
}
