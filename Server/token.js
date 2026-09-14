// const { sign } = require("jsonwebtoken");

// const CreateAccessToken = (userID, role) => {
//     return sign(
//         { userID, role },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: "25m",
//         }
//     );
// };

// const CreateRefreshToken = (userID, role) => {
//     return sign(
//         { userID, role },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: "7d",
//         }
//     );
// };

// module.exports = {
//     CreateAccessToken,
//     CreateRefreshToken,
// };



const { jwt } = require("jsonwebtoken");

export const CreateAccessToken = (userID, role) => {

    return jwt.sign(
        { userID, role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m",
        }
    );

};



export const CreateRefreshToken = (userID, role) => {

    return jwt.sign(
        { userID, role },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );

};