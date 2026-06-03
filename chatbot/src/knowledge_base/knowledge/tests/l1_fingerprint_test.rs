use crate::knowledge_base::knowledge::l1_fingerprint::L1Fingerprint;
#[test]
fn l1_standard_and_reward_test() {
    let t1 = L1Fingerprint::new("alma");
    let t2 = L1Fingerprint::new("maal.");
    let a = t1.evaluat(&t2);
    assert!(
        a == 2f32,
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
fn l1_len_correctnes1() {
    let t1 = L1Fingerprint::new("alma");
    assert!(
        t1.fingerprint.len() == 2,
        "\tAz l1 konstruktor nem darabolja fel a szavakat jól"
    )
}

#[test]
fn l1_len_correctnes2() {
    let t1 = L1Fingerprint::new("paprika");
    assert!(
        t1.fingerprint.len() == 3,
        "\tAz l1 konstruktor nem darabolja fel a szavakat jól"
    )
}

#[test]
fn l1_len_correctnes3() {
    let t1 = L1Fingerprint::new("káposztásnyéken");
    assert!(
        t1.fingerprint.len() == 5,
        "\tAz l1 konstruktor nem darabolja fel a szavakat jól"
    )
}

#[test]
fn l1_switch_reverse_test1() {
    let l1_1 = L1Fingerprint::new("paprika");
    let l1_2 = L1Fingerprint::new("fapipa");
    let a1 = l1_1.evaluat(&l1_2);
    let a2 = l1_2.evaluat(&l1_1);
    assert!(a1==a2,"\tAz L1 nem tudja a rövid/rövid szavakat konzisztensen kiértékelni");
}

#[test]
fn l1_switch_reverse_long_words_test2() {
    let l1_1 = L1Fingerprint::new("káposztásnyéken");
    let l1_2 = L1Fingerprint::new("kábosztás");
    let a1 = l1_1.evaluat(&l1_2);
    let a2 = l1_2.evaluat(&l1_1);
    assert!(a1==a2,"\tAz L1 nem tudja a hosszü/rövid szavakat konzisztensen kiértékelni");
}