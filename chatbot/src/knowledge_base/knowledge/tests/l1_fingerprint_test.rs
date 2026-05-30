use crate::knowledge_base::knowledge::l1_fingerprint::L1Fingerprint;
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
