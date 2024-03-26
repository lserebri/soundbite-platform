import { handleUserData } from '../services/user.service.js';

export async function getUser(req, res) {
  try {
    const user = await handleUserData(req.oidc.user);
    
    // Respond with the user object
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
