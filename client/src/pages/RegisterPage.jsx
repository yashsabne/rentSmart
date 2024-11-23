import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../styles/Register.css";

const RegisterPage = () => {

    const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
    });

    const [step, setStep] = useState(1);  
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [otp, setOtp] = useState("");  
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);  
    useEffect(() => {
        setPasswordMatch(
            formData.password === formData.confirmPassword || formData.confirmPassword === ""
        );
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === "profileImage" ? files[0] : value,
        });
    };

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
 
        try {
            const response = await fetch(`${backendUrl}/auth/send-otp-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: formData.email }),  
            });

            const result = await response.json();

            if (response.ok) {
                setOtpSent(true);  
                setStep(2);  
            } else {
                alert("Failed to send OTP: " + result.message);
            }
        } catch (err) {
            console.log("Error sending OTP", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        console.log(otp)

        try {
            const response = await fetch(`${backendUrl}/auth/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp }),  
            });

            const result = await response.json();


            if (result.success) { 
                try {
                    const register_form = new FormData();
                    for (var key in formData) {
                        register_form.append(key, formData[key]);
                    }

 
                    const registrationResponse = await fetch(`${backendUrl}/auth/register`, {
                        method: "POST",
                        body: register_form,
                    });

                    const registrationResult = await registrationResponse.json();

                    if (registrationResponse.ok) {
                        navigate("/login");
                    } else {
                        alert("Registration failed: " + registrationResult.message);
                    }
                } catch (err) {
                    console.log("Registration failed", err.message);
                }
            } else {
                alert("Invalid OTP. Please try again.");
            }
        } catch (err) {
            console.log("Error verifying OTP", err.message);
        }
    };

    return (
        <div className="register">
            <div className="register_content">
                {step === 1 ? (
                    <form className="register_content_form" onSubmit={handleRegister}>
                        <input
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            placeholder="Phone"
                            name="phone"
                            type="number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            required
                        />
                        <input
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            required
                        />

                        {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match!</p>}

                        <input
                            id="image"
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="image">
                            <img src="/assets/addImage.png" alt="add profile photo" className="uploadImg" />
                            <p>Upload Your Photo</p>
                        </label>

                        {formData.profileImage && (
                            <img
                                src={URL.createObjectURL(formData.profileImage)}
                                alt="profile photo"
                                style={{ maxWidth: "80px" }}
                            />
                        )}

                        <button type="submit" disabled={!passwordMatch || isLoading}>
                            {isLoading ? "Registering..." : "REGISTER"}
                        </button>
                    </form>
                ) : (
                    <form className="otp_form" onSubmit={handleOtpSubmit}>
                        <h3>Verify Your Email</h3>
                        <p style={{ color: 'white' }}>We sent an OTP to {formData.email}. Please enter it below:</p>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <button type="submit">Verify OTP</button>
                    </form>
                )}
                <Link to="/login">Already have an account? Log In Here</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
