const User = require('./models/user');
const Issue = require('./models/issue');





export const SignUp = async () => {
    const { email, password, firstname, lastname } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            firstname,
            lastname
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const Login = async () => {
    const { email, password, } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //else if all matches

        const accessToken = CreateAccessToken(user._id, user.role)
        const refreshToken = CreateRefreshToken(user._id, user.role)


        // Save refresh token in DB
        user.refreshToken = refreshToken;
        await user.save();

        // Send refresh token as cookie
        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        // Send access token in response
        res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


// LOGOUT
export const LogOut = async () => {
    res.clearCookie('refreshtoken');
    return res.status(200).json({ message: "Logout successful" });
}