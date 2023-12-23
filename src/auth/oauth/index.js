import GoogleStrategy from "passport-google-oauth20"
import Author from "../../models/authors.js"
import { createAccessToken } from "./tools.js"

const googleStrategy = new GoogleStrategy(
  {
    clientID:`550294558690-d64l039q1euj1chmnsipvnenrii4r85h.apps.googleusercontent.com`,
    clientSecret:`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`,
    callbackURL: `${process.env.API_URL}login/callback`,
  },
  async (_, __, profile, passportNext) => {
    try {
      const { email, given_name, family_name, sub } = profile._json
      console.log("PROFILE:", profile)
      const user = await Author.findOne({ email })
      console.log(user);
      if (user) {
        console.log("there is a user");
        const accessToken = await createAccessToken({
          _id: user._id,
          role: user.role,
        })
        passportNext(null, { accessToken })
      } else {
        const newUser = new Author({
          name: given_name,
          lastName: family_name,
          email,
          googleId: sub,
        })
        const createdUser = await newUser.save()
        const accessToken = await createAccessToken({
          _id: createdUser._id,
          role: createdUser.role,
        })
        passportNext(null, { accessToken })
      }
    } catch (error) {
      passportNext(error)
    }
  }
)

export default googleStrategy
