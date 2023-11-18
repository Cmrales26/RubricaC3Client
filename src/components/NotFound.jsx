import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = "/login";
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, []);
  return (
    <div>
      <div className="menssageError">
        <div className="">
          <h4>
            Page Not fund Redirecting to Home <br />{" "}
          </h4>
          <span class="loader404"></span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
