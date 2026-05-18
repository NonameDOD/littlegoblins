pub(super) struct Knowledge<const T: usize> {
    fingerprint: Box<[String; T]>,
    knowledge: String,
}
