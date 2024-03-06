import * as soundBiteService from '../services/soundBite.service.js';
import User from '../models/user.model.js'


export async function create(req, res, next) {
  try {
    await User.create({
      firstName: 'Zoé',
      lastName: 'GSGR',
      // last name omitted, but this is still valid!
    });
    res.json({
      message: await soundBiteService.create(
        req.body.videoURL, { 
          startTime: req.body.start,
          endTime: req.body.end 
        })
      }
    );
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}