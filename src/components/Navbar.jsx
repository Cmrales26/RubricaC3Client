import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { handleSubmit } = useForm();
  const { signout, isAuth, user } = useAuth();

  const onSubmit = handleSubmit(() => {
    signout();
  });
  return (
    <nav>
      <ul>
        <div className="logo">
          <li>
            <a href="/">
              <h1>LOGO</h1>
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
          {isAuth && user ? (
            <div className="navegation">
              {user.rol === "admin" ? (
                <div className="navegation">
                  <li>
                    <a href="/create/products">Create Product</a>
                  </li>

                  <li>
                    <a href="/products">Products</a>
                  </li>
                </div>
              ) : (
                <div className="navegation">
                  <li>
                    <a href="/buy">Buy</a>
                  </li>
                  <li>
                    <a href="/mybuys">My Buys</a>
                  </li>
                </div>
              )}
            </div>
          ) : null}

          {isAuth ? (
            <li>
              <form onSubmit={onSubmit}>
                <button className="btnlogout">Log Out</button>
              </form>
            </li>
          ) : (
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
    </nav>
  );
};

export default Navbar;
