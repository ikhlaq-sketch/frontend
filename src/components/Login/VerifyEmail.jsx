import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../services/api";

const VerifyEmail = () => {
  const { token } = useParams();  // Get the token from the URL
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const response = await verifyEmail(token);
        setMessage("Email verified successfully! You can now log in.");
        console.log(response.data);

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setMessage("Invalid or expired verification link.");
        console.error("Verification Error:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    verifyUserEmail();
  }, [token, navigate]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
        {loading ? (
          <p className="text-lg text-[#002D74] dark:text-white">Verifying your email...</p>
        ) : (
          <p className={`text-lg ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default VerifyEmail;
