import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import bg3 from "../../asset/images/bg/03.jpg";
import logo from "../../asset/images/logo-icon-80.png";
import axios from "axios";
import { AuthContext } from "./auth-signup"; // Make sure this is correctly exported

export default function AuthLogin(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser: updatedSetUser, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
   const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      console.log("storedFormData:", storedFormData);
      const submitData = JSON.parse(storedFormData);
       if(user){
      submitData.userEmail = user.email;
      console.log("submitData:", submitData);

      axios
        .post("/api/submitForm", submitData)
        .then((response) => {
          console.log("axios response:", response);
          localStorage.removeItem("formData");
          alert("Form submitted successfully!");
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("Error submitting form.");
        });
    }
    
    }
  }, [user]);
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify(formData),      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login.");
      }

      const data = await response.json();
      updatedSetUser(data.user);
      localStorage.setItem("token", data.token);
      const storedFormData = localStorage.getItem("formData");
      if (storedFormData) {
        const submitData = JSON.parse(storedFormData);
        submitData.userEmail = data.user.email;
        axios
          .post("/api/submitForm", submitData)
          .then((response) => {
            console.log("axios response:", response);
            localStorage.removeItem("formData");
            alert("Form submitted successfully!");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            alert("Error submitting form.");
          });
      }
       navigate("/index-seven");
    } catch (error) { 
      setError("Failed to login. Please try again.");
    } finally{
       setLoading(false);
      }
    };

  return (
    <section className="bg-home zoom-image d-flex align-items-center">
      <div
        className="bg-overlay image-wrap"
        style={{ backgroundImage: `url(${bg3})`, backgroundPosition: "center" }}
      ></div>
      <div className="bg-overlay bg-gradient-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="p-4 bg-white rounded-3 shadow-md mx-auto w-100"
              style={{ maxWidth: "400px" }}
            >
              <form onSubmit={handleSubmit}>
                <Link to="/">
                  <img src={logo} className="mb-4 d-block mx-auto" alt="Logo" />
                </Link>
                <h5 className="mb-3">Please sign in</h5>

                <div className="form-floating mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="flexCheckDefault"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <span className="forgot-pass text-muted mb-0">
                    <Link to="/auth-reset-password" className="text-muted">
                      Forgot password?
                    </Link>
                  </span>
                </div>

                {error && <div className="text-danger mb-3">{error}</div>}

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <div className="col-12 text-center mt-3">
                  <span>
                    <span className="text-muted me-2">
                      Don't have an account?
                    </span>
                    <Link to="/auth-signup" className="text-dark fw-medium">
                      Sign Up
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};
