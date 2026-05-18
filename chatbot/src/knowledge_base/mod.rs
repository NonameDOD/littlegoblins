pub mod knowledge;

use std::{
    fs::{File, ReadDir, read},
    io::ErrorKind,
    result,
    str::FromStr,
};

use knowledge::Knowledge;

const FINGERPRINT_SIZE: usize = 16;

pub type KnowledgeBase = Vec<Knowledge<FINGERPRINT_SIZE>>;

/*
* A knowledge_base::new() a KnowledgeBase-nek a konstruktora,
*   a "p:String" az elérési utat adja meg a knowledge.md-t tartalmazó mappához.
* Automatukusan le generál egy knowledge.json-t emelé.
* knowledge.json feladata hogy ne keljen minden indításkor fingerprintelni,
*   ha a knowledge.md megváltozik akkor a knowledge.json-t is frissíteni kell.
*/
pub fn new(p: String) -> Result<KnowledgeBase, String> {
    match File::open(format!("{}/knowledge.json", &p)) {
        Ok(json) => {
            todo!();
        }
        Err(_) => match File::open(format!("{}/knowledge.md", &p)) {
            Ok(md) => {
                todo!();
            }
            Err(e) => Err(format!(
                "No json or markdown was found at {},with {} error",
                p, e
            )),
        },
    }
}

fn json_parse(p: &String) -> Result<String, ()> {
    todo!();
}

fn md_parse(p: &String) -> Result<String, ErrorKind> {
    todo!();
}
