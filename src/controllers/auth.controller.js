export async function login(req, res, next) {
  try {
    res.oidc.login({
      returnTo: '/user',
      authorizationParams: {
        redirect_uri: 'http://localhost:3000/callback',
      },
    })
  } catch (err) {
    console.error(`Error while authenticating`, err.message);
    next(err);
  }
}
