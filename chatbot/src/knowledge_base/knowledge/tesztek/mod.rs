use crate::{
    knowledge_base::knowledge::{L0Fingerprint, L1Fingerprint},
    *,
};

#[test]
fn l0_teszt() {
    let sieve = "123456789ű";
    assert!(
        !L0Fingerprint::has('0' as u8, &sieve),
        "a szitán át megy egy érték ami nem fenn kéne akadnia"
    );
    assert!(
        L0Fingerprint::has('8' as u8, &sieve),
        "a szitán át megy egy érték aminek fenn kéne maradnia"
    );
    assert!(
        !L0Fingerprint::has('ű' as u8, &sieve),
        "a szita nem tud utf-8 as karaktereket kezelni"
    );
}

#[test]
fn l1_teszt1() {
    let t1 = L1Fingerprint::new("alma");
    let t2 = L1Fingerprint::new("maal.");
    let a = t1.evaluat(&t2);
    assert!(
        a == 1f32,
        "\ta szavakat nem megfelelően hasonlítja össze vagy darabolja fel"
    );
}

#[test]
fn l1_teszt2() {
    let t1 = L1Fingerprint::new("al.ma");
    let t2 = L1Fingerprint::new("ma.al");
    let a = t1.evaluat(&t2);
    assert!(
        a == 0f32,
        "\tA szavak ban a \"sepciális\" karaktereket nem kezeli jól"
    );
}

#[test]
fn l1_teszt3() {
    let t1 = L1Fingerprint::new("alma");
    assert!(
        t1.fingerprint.len() == 2,
        "\ta konstrukrot nem darabolja fel a szavakat jól"
    )
}
