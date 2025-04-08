import { useState, useEffect } from "react";
import { FaUser, FaBriefcase, FaChartLine, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, saveUserProfile } from "../../services/api";
import Select from "react-select";

export default function Profile() {
  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: null,
    city: "",
    dob: "",
    gender: "",
    skills: "",
    experienceLevel: "",
    jobPreference: "",
    education: "",
    personalInterests: "",
    job_market_demand_score: "",
    careerTransform: "no",
    previousJob: "",
    totalExperience: "",
    skillLevel: "",
    careerField: "",
    futureGoal: "",
    employmentType: "",
    workPreference: "",
  });

  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [phoneError, setPhoneError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch countries on mount
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryOptions = data
          .map((country) => ({
            label: country.name.common,
            value: country.name.common,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryOptions);
      })
      .catch(console.error);

    loadUserProfile();
  }, []);

  // Update active step when tab changes
  useEffect(() => {
    const index = steps.findIndex((step) => step.id === activeTab);
    if (index !== -1) setActiveStep(index);
  }, [activeTab]);

  const loadUserProfile = async () => {
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        console.error("No username found!");
        navigate("/login");
        return;
      }
      const response = await fetchUserProfile(username);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const validatePhone = (phone) => {
    if (!phone) return true;
    return /^\+\d{10,15}$/.test(phone);
  };

  const validateCurrentTab = () => {
    const errors = {};
    let isValid = true;

    // Personal tab validation
    if (activeTab === "personal") {
      if (!profileData.firstName.trim()) {
        errors.firstName = "First name is required";
        isValid = false;
      }
      if (!profileData.lastName.trim()) {
        errors.lastName = "Last name is required";
        isValid = false;
      }
      if (!profileData.dob) {
        errors.dob = "Date of birth is required";
        isValid = false;
      }
      if (!profileData.gender) {
        errors.gender = "Gender is required";
        isValid = false;
      }
      if (!profileData.country) {
        errors.country = "Country is required";
        isValid = false;
      }
      if (!profileData.city.trim()) {
        errors.city = "City is required";
        isValid = false;
      }
      if (profileData.phone && !validatePhone(profileData.phone)) {
        errors.phone = "Phone must start with + and be 10-15 digits";
        isValid = false;
      }
    }

    // Professional tab validation
    if (activeTab === "professional") {
      if (!profileData.skills.trim()) {
        errors.skills = "Skills are required";
        isValid = false;
      }
      if (!profileData.experienceLevel) {
        errors.experienceLevel = "Experience level is required";
        isValid = false;
      }
      if (!profileData.education) {
        errors.education = "Education level is required";
        isValid = false;
      }
      if (!profileData.personalInterests) {
        errors.personalInterests = "Personal interest is required";
        isValid = false;
      }
      if (!profileData.job_market_demand_score) {
        errors.job_market_demand_score = "Market demand is required";
        isValid = false;
      }
    }

    // Career tab validation (only if transforming career)
    if (activeTab === "career" && profileData.careerTransform === "yes") {
      if (!profileData.previousJob.trim()) {
        errors.previousJob = "Previous job is required";
        isValid = false;
      }
      if (!profileData.totalExperience) {
        errors.totalExperience = "Total experience is required";
        isValid = false;
      }
      if (!profileData.skillLevel) {
        errors.skillLevel = "Skill level is required";
        isValid = false;
      }
      if (!profileData.careerField.trim()) {
        errors.careerField = "Career field is required";
        isValid = false;
      }
      if (!profileData.futureGoal.trim()) {
        errors.futureGoal = "Future goal is required";
        isValid = false;
      }
      if (!profileData.employmentType) {
        errors.employmentType = "Employment type is required";
        isValid = false;
      }
      if (!profileData.workPreference) {
        errors.workPreference = "Work preference is required";
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleNext = () => {
    if (!validateCurrentTab()) return;

    const currentIndex = steps.findIndex((step) => step.id === activeTab);
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1].id);
    }
  };

  const handleProfileSubmit = async () => {
    if (!validateCurrentTab()) return;

    setIsSubmitting(true);
    try {
      const username = localStorage.getItem("username");
      await saveUserProfile({ ...profileData, username });
      alert("Profile saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: "personal", icon: <FaUser size={20} />, label: "Personal Info" },
    { id: "professional", icon: <FaBriefcase size={20} />, label: "Professional Info" },
    { id: "career", icon: <FaChartLine size={20} />, label: "Career Goals" },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <button
        onClick={() => navigate("/dashboard")}
        className="text-teal-500 flex items-center mb-4 hover:text-teal-700 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>
      
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Edit Profile</h2>

      {/* Stepper */}
      <div className="flex justify-between w-full relative mb-8">
  {steps.map((step, index) => (
    <div
      key={step.id}
      className="flex-1 flex flex-col items-center relative cursor-pointer"
      onClick={() => setActiveTab(step.id)}
    >
      {/* Step Circle - Centered */}
      <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${
        index < activeStep
          ? "bg-green-500 text-white"
          : index === activeStep
          ? "bg-teal-500 text-white"
          : "bg-gray-200 text-gray-500"
      }`}>
        {step.icon}
      </div>

      {/* Step Label - Centered with equal width */}
      <div className="w-full text-center">
        <p className={`mt-2 text-sm font-medium transition-all duration-300 ${
          index <= activeStep ? "text-teal-600 font-semibold" : "text-gray-500"
        }`}>
          {step.label}
        </p>
      </div>

      {/* Active indicator */}
      {index === activeStep && (
        <div className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-teal-500 transition-all duration-300" />
      )}
    </div>
  ))}
</div>

      {/* Personal Information Form */}
      {activeTab === "personal" && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                className={`w-full p-2 border rounded mt-1 ${formErrors.firstName ? "border-red-500" : "border-gray-300"}`}
              />
              {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                className={`w-full p-2 border rounded mt-1 ${formErrors.lastName ? "border-red-500" : "border-gray-300"}`}
              />
              {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={profileData.dob}
                onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                className={`w-full p-2 border rounded mt-1 ${formErrors.dob ? "border-red-500" : "border-gray-300"}`}
              />
              {formErrors.dob && <p className="text-red-500 text-xs mt-1">{formErrors.dob}</p>}
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Gender<span className="text-red-500">*</span>
              </label>
              <select
                value={profileData.gender}
                onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                className={`w-full p-2 border rounded mt-1 ${formErrors.gender ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formErrors.gender && <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>}
            </div>
          </div>

           <div className="flex gap-4">
      <div className="w-1/2">
        <label className="block text-sm font-medium text-gray-700">
          Country<span className="text-red-500">*</span>
        </label>

        {countries.length > 0 ? (
          <Select
            options={countries}
            placeholder="Select your country"
            value={profileData.country ? { label: profileData.country, value: profileData.country } : null}
            onChange={handleCountryChange}
            className={`react-select-container ${formErrors.country ? 'react-select-error' : ''}`}
            classNamePrefix="react-select"
          />
        ) : (
          <input
            type="text"
            value={profileData.country}
            onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
            placeholder="Enter your country"
            className={`react-select-container ${formErrors.country ? 'react-select-error' : ''}`}
          />
        )}

        {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
      </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your city"
                value={profileData.city}
                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                className={`w-full p-2 border rounded mt-1 ${formErrors.city ? "border-red-500" : "border-gray-300"}`}
              />
              {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="+1234567890"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className={`w-full p-2 border rounded mt-1 ${formErrors.phone ? "border-red-500" : "border-gray-300"}`}
            />
            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
          </div>
        </div>
      )}

      {/* Professional Information Form */}
      {activeTab === "professional" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter skills, separated by commas"
              value={profileData.skills}
              onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
              className={`w-full p-2 border rounded mt-1 ${formErrors.skills ? "border-red-500" : "border-gray-300"}`}
            />
            {formErrors.skills && <p className="text-red-500 text-xs mt-1">{formErrors.skills}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience Level<span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4 mt-2">
              {["Entry", "Mid", "Senior"].map((level) => (
                <label key={level} className="flex items-center">
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={level}
                    checked={profileData.experienceLevel === level}
                    onChange={(e) => setProfileData({ ...profileData, experienceLevel: e.target.value })}
                    className="mr-2"
                  />
                  {level}
                </label>
              ))}
            </div>
            {formErrors.experienceLevel && <p className="text-red-500 text-xs mt-1">{formErrors.experienceLevel}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Education Level<span className="text-red-500">*</span>
            </label>
            <select
              value={profileData.education}
              onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
              className={`w-full p-2 border rounded mt-1 ${formErrors.education ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Education Level</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Ph.D.">Ph.D.</option>
            </select>
            {formErrors.education && <p className="text-red-500 text-xs mt-1">{formErrors.education}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Personal Interests<span className="text-red-500">*</span>
            </label>
            <select
              value={profileData.personalInterests}
              onChange={(e) => setProfileData({ ...profileData, personalInterests: e.target.value })}
              className={`w-full p-2 border rounded mt-1 ${formErrors.personalInterests ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Personal Interest</option>
              <option value="Technology">Technology</option>
              <option value="Data Science & Analytics">Data Science & Analytics</option>
              <option value="Artificial Intelligence & Machine Learning">AI & ML</option>
              <option value="Cloud Computing & DevOps">Cloud & DevOps</option>
              <option value="Gaming & Game Development">Gaming</option>
            </select>
            {formErrors.personalInterests && <p className="text-red-500 text-xs mt-1">{formErrors.personalInterests}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Market Demand Score (1-10)<span className="text-red-500">*</span>
            </label>
            <select
              value={profileData.job_market_demand_score}
              onChange={(e) => setProfileData({ ...profileData, job_market_demand_score: e.target.value })}
              className={`w-full p-2 border rounded mt-1 ${formErrors.job_market_demand_score ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Market Demand</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {formErrors.job_market_demand_score && (
              <p className="text-red-500 text-xs mt-1">{formErrors.job_market_demand_score}</p>
            )}
          </div>
        </div>
      )}

      {/* Career Goals Form */}
      {activeTab === "career" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Do you want to transform your career?<span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="careerTransform"
                  value="yes"
                  checked={profileData.careerTransform === "yes"}
                  onChange={() => setProfileData({ ...profileData, careerTransform: "yes" })}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="careerTransform"
                  value="no"
                  checked={profileData.careerTransform === "no"}
                  onChange={() => setProfileData({ ...profileData, careerTransform: "no" })}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {profileData.careerTransform === "yes" && (
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Previous Job Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Software Engineer"
                  value={profileData.previousJob}
                  onChange={(e) => setProfileData({ ...profileData, previousJob: e.target.value })}
                  className={`w-full p-2 border rounded mt-1 ${formErrors.previousJob ? "border-red-500" : "border-gray-300"}`}
                />
                {formErrors.previousJob && <p className="text-red-500 text-xs mt-1">{formErrors.previousJob}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Experience (Years)<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Enter years of experience"
                  value={profileData.totalExperience}
                  onChange={(e) => setProfileData({ ...profileData, totalExperience: e.target.value })}
                  className={`w-full p-2 border rounded mt-1 ${formErrors.totalExperience ? "border-red-500" : "border-gray-300"}`}
                />
                {formErrors.totalExperience && <p className="text-red-500 text-xs mt-1">{formErrors.totalExperience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Skill Level<span className="text-red-500">*</span>
                </label>
                <select
                  value={profileData.skillLevel}
                  onChange={(e) => setProfileData({ ...profileData, skillLevel: e.target.value })}
                  className={`w-full p-2 border rounded mt-1 ${formErrors.skillLevel ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select your skill level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                {formErrors.skillLevel && <p className="text-red-500 text-xs mt-1">{formErrors.skillLevel}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Career Field<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Data Science"
                  value={profileData.careerField}
                  onChange={(e) => setProfileData({ ...profileData, careerField: e.target.value })}
                  className={`w-full p-2 border rounded mt-1 ${formErrors.careerField ? "border-red-500" : "border-gray-300"}`}
                />
                {formErrors.careerField && <p className="text-red-500 text-xs mt-1">{formErrors.careerField}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Future Career Goal<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Become a Senior Developer"
                  value={profileData.futureGoal}
                  onChange={(e) => setProfileData({ ...profileData, futureGoal: e.target.value })}
                  className={`w-full p-2 border rounded mt-1 ${formErrors.futureGoal ? "border-red-500" : "border-gray-300"}`}
                />
                {formErrors.futureGoal && <p className="text-red-500 text-xs mt-1">{formErrors.futureGoal}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employment Type<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4 mt-2">
                  {["Full-time", "Part-time", "Freelance"].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="employmentType"
                        value={type}
                        checked={profileData.employmentType === type}
                        onChange={(e) => setProfileData({ ...profileData, employmentType: e.target.value })}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
                {formErrors.employmentType && <p className="text-red-500 text-xs mt-1">{formErrors.employmentType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Work Preference<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4 mt-2">
                  {["Remote", "On-site", "Hybrid"].map((pref) => (
                    <label key={pref} className="flex items-center">
                      <input
                        type="radio"
                        name="workPreference"
                        value={pref}
                        checked={profileData.workPreference === pref}
                        onChange={(e) => setProfileData({ ...profileData, workPreference: e.target.value })}
                        className="mr-2"
                      />
                      {pref}
                    </label>
                  ))}
                </div>
                {formErrors.workPreference && <p className="text-red-500 text-xs mt-1">{formErrors.workPreference}</p>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {activeTab !== "personal" && (
          <button
            onClick={handleBack}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        )}

        {activeTab !== "career" ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleProfileSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Profile"}
          </button>
        )}
      </div>
    </div>
  );
}