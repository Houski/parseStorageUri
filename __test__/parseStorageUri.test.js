/* eslint-disable jest/no-commented-out-tests */
const parseStorageUri = require("../src/parseStorageUri");

test("local", () =>
  expect(parseStorageUri("local:///home/uploaded")).toEqual({
    source: "local",
    path: "/home/uploaded",
  }));

test("localnothing", () =>
  expect(parseStorageUri("local://")).toEqual({
    source: "local",
    accessKey: undefined,
    secretKey: undefined,
    region: undefined,
    bucket: undefined,
  }));

test("s3full", () =>
  expect(
    parseStorageUri("s3://accesskey:secretkey@ca-central-1/bucket-name")
  ).toEqual({
    source: "s3",
    accessKey: "accesskey",
    secretKey: "secretkey",
    region: "ca-central-1",
    bucket: "bucket-name",
  }));

test("s3nosecret", () =>
  expect(parseStorageUri("s3://accesskey@ca-central-1/bucket-name")).toEqual({
    source: "s3",
    accessKey: "accesskey",
    secretKey: undefined,
    region: "ca-central-1",
    bucket: "bucket-name",
  }));

test("s3noregion", () =>
  expect(parseStorageUri("s3://accesskey:secretkey/bucket-name")).toEqual({
    source: "s3",
    accessKey: "accesskey",
    secretKey: "secretkey",
    region: undefined,
    bucket: "bucket-name",
  }));

test("s3nocred", () =>
  expect(parseStorageUri("s3://@ca-central-1/bucket-name")).toEqual({
    source: "s3",
    accessKey: undefined,
    secretKey: undefined,
    region: "ca-central-1",
    bucket: "bucket-name",
  }));

test("s3justbucket", () =>
  expect(parseStorageUri("s3:///bucket-name")).toEqual({
    source: "s3",
    accessKey: undefined,
    secretKey: undefined,
    region: undefined,
    bucket: "bucket-name",
  }));

test("s3nothing", () =>
  expect(parseStorageUri("s3://")).toEqual({
    source: "s3",
    accessKey: undefined,
    secretKey: undefined,
    region: undefined,
    bucket: undefined,
  }));

test("s3weirdcharacter", () =>
  expect(
    parseStorageUri(
      "s3://AKIA5VPLS46XZKTZMFWD:bm4my7bjShff0rlYW/88BmkEBPzQ0AsL19rW/LGV@ca-central-1/bucket-name"
    )
  ).toEqual({
    source: "s3",
    accessKey: "AKIA5VPLS46XZKTZMFWD",
    secretKey: "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",
    region: "ca-central-1",
    bucket: "bucket-name",
  }));

test("nothing", () => expect(() => parseStorageUri("")).toThrow());

test("unknownTypeShouldError", () =>
  expect(() => parseStorageUri("somethingelse://")).toThrow());

test("unparsableS3shouldError", () =>
  expect(() => parseStorageUri("s3://b:a:z:c/something")).toThrow());
