import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { selectUserForLogin } from "../repositories/auth.repository.js";
import { findUserById } from "../repositories/users.repository.js";

passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            const user = await selectUserForLogin(username);         
            if (!user) return done(null, false);

            const passwordMatch = await bcrypt.compare(password, user.password);         
            if (!passwordMatch) return done(null, false);

            console.log(`${username} logged in successfully!`)
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});