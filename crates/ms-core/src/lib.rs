#![deny(clippy::all)]
mod versions;
mod storage;
use napi_derive::napi;
use versions::test;

#[napi]
pub fn plus_200(input: u32) -> u32 {
  input + 100
}

#[napi]
pub fn minus_200() -> u32 {
  test() as u32
}
