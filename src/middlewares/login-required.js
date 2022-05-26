import passport from 'passport';

const loginRequired = passport.authenticate('jwt', { session: false }); // 유저 인증을 해주는 미들웨어

export { loginRequired };

