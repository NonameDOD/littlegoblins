pub(super) trait Fingerprinteable {
    fn evaluate<T: Fingerprinteable>(&self, other: T) -> f32;
    fn fsize(&self) -> usize;
    fn fingerprints<T: Fingerprinteable>(&self) -> Result<&Box<[T]>, ()> {
        Err(())
    }
    fn sub_fingerprints<T: Fingerprinteable>(&self) -> Result<&Box<[String]>, ()> {
        Err(())
    }
}
