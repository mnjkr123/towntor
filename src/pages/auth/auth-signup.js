import React, { useState, createContext, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import bg3 from "../../asset/images/bg/03.jpg"
import logo from "../../asset/images/logo-icon-80.png"

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updatedSetUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return <AuthContext.Provider value={{ user, setUser: updatedSetUser }}>{children}</AuthContext.Provider>;
};

export default function Signup(){

    const navigate = useNavigate();
    const { setUser : updatedSetUser, user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
              });
            if (response.ok){
                const data = await response.json();
                updatedSetUser(data.user);
                navigate("/");
            } else{
                const errorData = await response.json();
                setError(errorData.message || 'Failed to register');
            }
        
        } catch (err) {
            console.error("error", err)
            setError('Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
      };
    
    return(
        <>
          <section className="bg-home zoom-image d-flex align-items-center">
              <div className="bg-overlay image-wrap" style={{backgroundImage:`url(${bg3})`, backgroundPosition:'center'}}></div>
              <div className="bg-overlay bg-gradient-overlay"></div>
              <div className="container">
                  <div className="row">
                      <div className="col-12">
                          <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                              <form>
                                  <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt=""/></Link>
                                  <h5 className="mb-3">Register your account</h5>
                              
                                  <div className="form-floating mb-2">                            
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="firstName"
                                          placeholder="Harry"
                                          value={formData.firstName}
                                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                      />
                                      <label htmlFor="firstName">First Name</label>
                                  </div>
  
                                  <div className="form-floating mb-2">
                                      <input type="text" className="form-control" id="lastName" placeholder="Potter" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}/>
                                      <label htmlFor="lastName">Last Name</label>
                                  </div>
  
                                  <div className="form-floating mb-2">
                                      <input type="email" className="form-control" id="email" placeholder="name@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                                      <label htmlFor="email">Email Address</label>
                                  </div>
                                  <div className="form-floating mb-3">
                                      <input type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
                                      <label htmlFor="password">Password</label>
                                  </div>
                              
                                  <div className="form-check mb-3">
                                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                      <label className="form-check-label text-muted" htmlFor="flexCheckDefault">I Accept <Link to="#" className="text-primary">Terms And Condition</Link></label>
                                  </div>
                                  {error && <div className="text-danger">{error}</div>}
  
  
                                  <button className="btn btn-primary w-100" type="submit" onClick={handleSubmit} disabled={loading}>Register</button>
  
                                  <div className="col-12 text-center mt-3">
                                      <span><span className="text-muted me-2">Already have an account ? </span> <Link to="/auth-login" className="text-dark fw-medium">Sign in</Link></span>
                                  </div>
                              </form>
                          </div>
                      </div>
                    </div>
                </div>
          </section>
        </>
    )
}