export async function authenticate(req, res, next) {
  try {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}