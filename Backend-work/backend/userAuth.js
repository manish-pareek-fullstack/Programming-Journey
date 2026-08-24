exports.userAuth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No Token"
        });
    }
    try {

        const Token = token.split(" ")[1]

        const decoded = jwt.verify(
            actualToken,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};