use crate::knowledge_base::knowledge::l0_fingerprint::L0Fingerprint;

#[test]
fn l0_ascii_negativ_test() {
    let sieve = "123456789ű";
    assert!(
        !L0Fingerprint::has(&'0', sieve),
        "\ta szitán át megy egy érték ami nem fenn kéne akadnia"
    );
}

#[test]
fn l0_ascii_positiv_test() {
    let sieve = "123456789ű";
    assert!(
        L0Fingerprint::has(&'8', sieve),
        "\ta szitán át megy egy érték aminek fenn kéne maradnia"
    );
}

#[test]
fn l0_utf8_test() {
    let sieve = "123456789ű";
    assert!(
        L0Fingerprint::has(&'ű', sieve),
        "\ta szita nem tud utf-8 as karaktereket kezelni"
    );
}
