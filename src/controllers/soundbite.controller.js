import * as soundBiteService from '../services/soundBite.service.js';

export async function getAll(req, res, next) {
  try {
    const soundbites = await soundBiteService.getByUser(req.oidc.user.sub);
    res.json({ soundbites });
  } catch (err) {
    console.error(`Error while fetching soundbites`, err.message);
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await soundBiteService.remove(req.params.id, req.oidc.user.sub);
    res.status(204).send();
  } catch (err) {
    console.error(`Error while deleting soundbite`, err.message);
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    res.json({
      message: await soundBiteService.create(
        req.body.videoURL, { 
          startTime: req.body.start,
          endTime: req.body.end 
        },
        req.body.soundbiteName,
        req.oidc.user.sub
      )
    });
  } catch (err) {
    console.error(`Error while creating soundbite`, err.message);
    next(err);
  }
}