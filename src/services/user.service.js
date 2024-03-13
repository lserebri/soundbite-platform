import User from '../models/user.model.js';

async function handleUser(user) {
  let existingUser = await User.findOne({ where: { externalId: user.sub } });

    if (!existingUser) {
      const newUser = await User.create({
        email: user.email,
        name: user.name,
        picture: user.picture,
        externalId: user.sub,
      });
      return newUser;
    }

    return existingUser;
};

export { handleUser };