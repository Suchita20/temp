const payload = {
    exp: SecurityService.anyIpAddressExpiryTimestamp(maxRole),
    iat: SecurityService.currentTimestamp(),
    nbf: SecurityService.currentTimestamp(),
    iss: config.authTokens.issuer,
    sub: encrypt(email),
    aud: aud || config.authTokens.audience.web,
    version: config.authTokens.version,
    role : maxRole,
    exp2: {
      ip: ipAddress,
      time: SecurityService.sameIpAddressExpiryTimestamp(maxRole),
    }
  };