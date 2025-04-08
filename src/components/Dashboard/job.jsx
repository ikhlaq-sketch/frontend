import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FaMapMarkerAlt , FaMoneyBillWave} from "react-icons/fa";

 function Job() {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    workPreference: "",
    employmentType: "",
    expectedSalary: ""
  });
  const [stateRecommendations, setStateRecommendations] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("username"); // Get the username from localStorage

    console.log(userId);

    // If username does not exist, navigate to the login page
    if (!userId) {
      navigate("/login");
      return;
    }

   

    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://nextstep-backend-production.up.railway.app/api/user/profile/', {
          headers: {
            "Content-Type": "application/json",
          }
        });
        
        setProfile({
          workPreference: response.data.work_preference || "",
          employmentType: response.data.employment_type || "",
          expectedSalary: response.data.expected_salary || ""
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();

    // Handle recommendations
    if (Array.isArray(location.state?.recommendations) && location.state.recommendations.length > 0) {
      setStateRecommendations(location.state.recommendations);
      setRecommendations(location.state.recommendations);
      localStorage.setItem(`${userId}_recommendations`, JSON.stringify(location.state.recommendations));
    } else {
      const storedRecommendations = localStorage.getItem(`${userId}_recommendations`);
      if (storedRecommendations) {
        setRecommendations(JSON.parse(storedRecommendations) || []);
      }
    }
  }, [navigate, location.state]);

  const fetchJobs = async (career) => {
    if (!career || !profile) return;
  
    setLoading(true);
    setJobs([]);
    
    try {
      let searchQuery = career;
      
      if (profile.employmentType) {
        searchQuery += ` ${profile.employmentType}`;
      }
      if (profile.workPreference === "Remote") {
        searchQuery += " remote";
      }
  
      // Initialize query parameters
      const queryParams = new URLSearchParams();
      queryParams.append("query", searchQuery);
  
      // Handle expected salary filtering
      if (profile.expectedSalary) {
        const salaryNumber = Number(String(profile.expectedSalary).replace(/\D/g, ""));
        if (!isNaN(salaryNumber)) {
          queryParams.append("salary_gt", salaryNumber);
        }
      }
  
      // Fetch jobs from API
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "205fd467a6msh46fa28326e53b2fp13cc72jsn8d9a2714b0bd",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        }
      );
  
      const data = await response.json();
      setJobs(data.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (selectedCareer) {
      fetchJobs(selectedCareer);
    }
  }, [selectedCareer, profile]); // Added profile to dependencies to refetch when profile changes

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          Job Opportunities Based on Your Profile
        </h2>

        <div className="bg-teal-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Your Preferences</h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <p><span className="text-gray-600">Work:</span> {profile.workPreference || "Not specified"}</p>
            <p><span className="text-gray-600">Type:</span> {profile.employmentType || "Not specified"}</p>
            <p><span className="text-gray-600">Salary:</span> {profile.expectedSalary ? `$${profile.expectedSalary}` : "Not specified"}</p>
          </div>
        </div>

        <select
          className="w-full p-2 mb-4 border rounded"
          value={selectedCareer}
          onChange={(e) => setSelectedCareer(e.target.value)}
        >
          <option value="">Select a Career</option>
          {recommendations.map((rec, index) => (
            <option key={index} value={rec.career}>
              {rec.career}
            </option>
          ))}
        </select>

        {loading ? (
        <p style={styles.loadingText}>Loading matching jobs...</p>
      ) : jobs.length > 0 ? (
        <div style={styles.jobsGrid}>
          {jobs.map((job, index) => (
            <div key={index} style={styles.jobCard}>
              <h3 style={styles.jobTitle}>{job.job_title}</h3>
              <p style={styles.jobLocation}>
              <p className="text-gray-600">
  <FaMapMarkerAlt className="inline text-red-500" /> {job.job_city}, {job.job_country}
</p> {job.job_city}, {job.job_country}
                <span style={styles.jobType}> • {job.job_employment_type}</span>
              </p>
              <p style={styles.jobSalary}><p className="text-gray-600">
  <FaMoneyBillWave className="inline text-green-500" /> {job.job_salary || "Salary not specified"}
</p> {job.job_salary || "Salary not specified"}</p>
              <a 
                href={job.job_apply_link} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.applyButton}
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noJobsText}>
          {selectedCareer ? "No matching jobs found" : "Select a career to see recommendations"}
        </p>
      )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
  },
  loadingText: {
    textAlign: "center",
    color: "#319795",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  jobsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  jobCard: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #E2E8F0",
    display: "flex",
    flexDirection: "column",
  },
  jobTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: "0.5rem",
  },
  jobLocation: {
    color: "#4A5568",
    fontSize: "0.875rem",
    marginBottom: "0.25rem",
  },
  jobType: {
    color: "#718096",
  },
  jobSalary: {
    color: "#4A5568",
    fontSize: "0.875rem",
  },
  applyButton: {
    display: "inline-block",
    padding: "0.5rem 1rem",
    backgroundColor: "#319795",
    color: "white",
    borderRadius: "0.375rem",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "0.875rem",
    transition: "background-color 0.2s",
    textAlign: "center",
    marginTop: "1rem",
  },
  noJobsText: {
    textAlign: "center",
    color: "#4A5568",
    fontSize: "1rem",
  },
};

export default Job;
