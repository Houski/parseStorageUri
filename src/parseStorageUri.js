function parseStorageUri(uri) {
  /* eslint-disable no-unused-vars */
  /* eslint-disable no-useless-escape */

  if (uri === null || uri === undefined || uri === "") {
    throw new Error(`uri must be provided, got: ${uri}`);
  }

  const r =
    /^(local|s3):\/\/((([^:@\/]+)?(:([^:@]+))?)?(@([^@:\/]+))?(\/[^&@:,$=+?:; \\^`><{}\[\]#%"~|]+))?$/i;
  const m = uri.match(r);

  if (m === null) {
    throw new Error(`Could not parse URI: ${uri}`);
  }

  const [
    fullMatch,
    source,
    fullNonSource,
    fullCredentials,
    accessKey,
    prefixedSecretKey,
    secretKey,
    suffixedRegion,
    region,
    pathOrBucket,
  ] = m;

  const result =
    source === "local"
      ? { source, path: pathOrBucket }
      : {
          source,
          accessKey,
          secretKey,
          region,
          bucket: pathOrBucket?.replace(/^\//, ""),
        };

  return result;
}

module.exports = parseStorageUri;
