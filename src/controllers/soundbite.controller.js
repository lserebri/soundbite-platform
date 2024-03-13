import * as soundBiteService from '../services/soundBite.service.js';

export async function create(req, res, next) {
  try {
    res.json({
      message: await soundBiteService.create(
        req.body.videoURL, { 
          startTime: req.body.start,
          endTime: req.body.end 
        })
      }
    );
  } catch (err) {
    console.error(`Error while creating soundbite`, err.message);
    next(err);
  }
}