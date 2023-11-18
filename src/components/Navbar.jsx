import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { slide as Menu } from "react-burger-menu";
const Navbar = () => {
  const { handleSubmit } = useForm();
  const { signout, isAuth, user } = useAuth();

  const onSubmit = handleSubmit(() => {
    signout();
  });

  return (
    <nav>
      {isAuth ? (
        <Menu className="MenuHa" right width={"80%"}>
          {isAuth && user ? (
            <div className="">
              {user.rol === "admin" ? (
                <div className="navegation">
                  <a className="menu-item" href="/create/products">
                    {" "}
                    Create Product
                  </a>

                  <a className="menu-item" href="/products">
                    {" "}
                    Products{" "}
                  </a>
                  <form onSubmit={onSubmit}>
                    <button className="btnlogout">Log Out</button>
                  </form>
                </div>
              ) : (
                <div className="navegation">
                  <a className="menu-item" href="/buy">
                    {" "}
                    Buy
                  </a>

                  <a className="menu-item" href="/mybuys">
                    {" "}
                    My Buys
                  </a>
                  <form onSubmit={onSubmit}>
                    <button className="btnlogout">Log Out</button>
                  </form>
                </div>
              )}
            </div>
          ) : null}
        </Menu>
      ) : null}
      <div className="navegacion">
        <ul>
          <div className="logo">
            <li>
              <a href="/">
                <h1>ICON</h1>
              </a>
            </li>
          </div>
          <div className="WelcomeUser">
            {isAuth && user ? (
              <div>
                <h3>Welcome {user.name}</h3>
              </div>
            ) : null}
          </div>
          <div className="navegation">
            <div className="MenuHa-desk">
              {isAuth && user ? (
                <div className="">
                  {user.rol === "admin" ? (
                    <div className="navegation">
                      <a className="menu-item" href="/create/products">
                        {" "}
                        Create Product
                      </a>

                      <a className="menu-item" href="/products">
                        {" "}
                        Products{" "}
                      </a>
                      <form onSubmit={onSubmit}>
                        <button className="btnlogout">Log Out</button>
                      </form>
                    </div>
                  ) : (
                    <div className="navegation">
                      <a className="menu-item" href="/buy">
                        {" "}
                        Buy
                      </a>

                      <a className="menu-item" href="/mybuys">
                        {" "}
                        My Buys
                      </a>
                      <form onSubmit={onSubmit}>
                        <button className="btnlogout">Log Out</button>
                      </form>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            {isAuth ? null : (
              <div className="navegation">
                <li>
                  <a className="register" href="/create">
                    Register
                  </a>
                </li>
                <li>
                  <a className="loginbtn" href="/login">
                    Login
                  </a>
                </li>
              </div>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
