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
        k1.evaluat(&k2).round() >= 1f32,
        "\tKnowledge nem tudja normálisan evaluat-elni"
    );
}

#[test]
fn knowledge_compersion_test2() {
    let text = String::from("az alma piros");
    let text2 = String::from("az alma zöld");
    let k1 = Knowledge::new(text);
    let k2 = Knowledge::new(text2);
    let a = k1.evaluat(&k2);
    assert!(a >= 0.5f32, "\tKnowledge nem tudja normálisan evaluat-elni");
}

#[test]
fn knowledge_compersion_test3() {
    let text = String::from("kiskacsa felmászott a fára, reggelente kissé álmosan érzi magát az energia ital függősége miatt.");
    let text2 = String::from("kiskacsa álmos az energia ital miatt");
    let k1 = Knowledge::new(text);
    let k2 = Knowledge::new(text2);
    let a = k1.evaluat(&k2);
    assert!(a >= 0.5f32, "\tKnowledge nem tudja normálisan evaluat-elni");
}


#[test]
fn knowledge_switch_reverse_test1() {
    let text = String::from("az alma piros");
    let text2 = String::from("az alma zöld");
    let k1 = Knowledge::new(text);
    let k2 = Knowledge::new(text2);
    let a1 = k1.evaluat(&k2);
    let a2 = k2.evaluat(&k1);
    assert!(a1 == a2, "\tRövid szövegeknél Knowledge nem tudja konzisztensen evaluat-elni a két szöveget");
}

#[test]
fn knowledge_switch_reverse_long_text_test2() {
    let text = String::from("kiskacsa felmászott a fára, reggelente kissé álmosan érzi magát az energia ital függősége miatt.");
    let text2 = String::from("kiskacsa álmos az energia ital miatt");
    let k1 = Knowledge::new(text);
    let k2 = Knowledge::new(text2);
    let a1 = k1.evaluat(&k2);
    let a2 = k2.evaluat(&k1);
    assert!(a1 == a2, "\tHosszú szövegeknél Knowledge nem tudja konzisztensen evaluat-elni a két szöveget");
}

#[test]
fn knowledge_compersion_fail_test() {
    let text = String::from("kiskacsa felmászott a fára, reggelente kissé álmosan érzi magát az energia ital függősége miatt.");
    let text2 = String::from("legók nagyon jók a környezetnek");
    let k1 = Knowledge::new(text);
    let k2 = Knowledge::new(text2);
    let a = k1.evaluat(&k2);
    assert!(a <= 0.1f32, "\tKnowledge nem tudja normálisan evaluat-elni");
}

#[test]
fn knowledge_inner_text_correctnes_test() {
    let text = String::from("kiskacsa felmászott a fára, reggelente kissé álmosan érzi magát az energia ital függősége miatt.");
    let k1 = Knowledge::new(text.clone());
    assert!(k1.text == text, "\tKnowledge nem jól tárolja el a text-et");
}
