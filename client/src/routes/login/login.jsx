import React, { useContext, useState } from 'react'; // Cleaned up imports
import "./login.css";
import { useNavigate } from 'react-router-dom';
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from '../../context/AuthContext';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const {updateUser} = useContext(AuthContext);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const res = await apiRequest.post("/auth/login", {
                username,
                password,
            });

            
            // Updating the key user
            updateUser(res.data);


            navigate("/admin/home")
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login_body">
            <div className="login_body_wrapper">
                <div className="logo_login"></div>
                <div className="login_form">
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="input_group">
                            <input 
                                name='username'
                                placeholder="Email" 
                                minLength={3}
                                maxLength={20}
                                type='text'
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="input_group">
                            <input 
                                name='password'
                                type="password" 
                                placeholder="Password" 
                                minLength={5}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <div className='button_login'>
                            <a href="">forgot password?</a>
                            <button disabled={isLoading} type="submit" className="login_btn">
                                Sign In
                            </button>
                        </div>
                        {error && <span className='login-err'><i>{error}</i></span>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;