"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}
/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */

// Ok, the big problem was that the middleware auth route was a bit off. I had to refactor it a lot.
// Some main issues: req doesn't have any information here because nothing was passed in via form or url.
// Everything is in JSON body, even the user admin info.So when you were trying to get user info from req.user, nothing was there.
// You actually new res.locals.user.You also had an ExpressError, but you hadn't defined ExpressError at the top of the app.Also,
// it's good to make these routes try catch.So here's what I got to work:


//origonal code didnt work 
// function ensureAdmin(req, res, next) {
//   console.log("dsfsdfsdfsdfsdvsfvsdfsdfdsfdsfdsfsdfsdfsdfsfd");
//   if (req.user.is_admin) {
//     return next();
//   } else {
//     const adminErr = new ExpressError("Only admin users allow access", 401);
//     return next(adminErr);
//   }
// }

// function isAdmin(req, res, next) {
//   try {
//     const token = req.body._token || req.query._token;
//     const payload = jwt.verify(token, SECRET_KEY);

//     req.username = payload;

//     if (req.username.is_admin) return next();
//     throw new ExpressError("Unauthorized, admin privileges required", 401);
//   } catch (err) {
//     return next(err);
//   }
// }

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}
//export all middleware functions
module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
};
