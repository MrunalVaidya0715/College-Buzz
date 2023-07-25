
export const register = async (req, res, next) => {
    res.send("Register Route");
};

export const login = async (req, res, next) => {
    res.send("Log in Route");
};

export const logout = async (req, res) => {
  res.send("Logout Route");
};