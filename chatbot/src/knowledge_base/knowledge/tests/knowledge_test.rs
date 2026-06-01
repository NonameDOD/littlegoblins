use crate::knowledge_base::Knowledge;
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

#[test]
fn knowledge_compersion_test2() {
    let text = String::from("az alma piros");
    let text2 = String::from("az alma zold");
    let k1 = Knowledge::new(text);
    let k2 = Knowledge::new(text2);
    let a = k1.evaluat(&k2);
    assert!(a == 0.5f32, "\tKnowledge nem tudja normálisan evaluat-elni");
}
