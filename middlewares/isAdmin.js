module.exports = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        req.flash("error", "You are not authorized to create products!");
        return res.redirect("/shop");
    }
    next();
};
