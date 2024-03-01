import soundBiteService from '../services/soundBite.service';

export async function create(req, res, next) {
  try {

  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}