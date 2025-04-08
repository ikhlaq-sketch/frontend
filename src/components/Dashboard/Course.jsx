import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Course() {
  const location = useLocation();
  const selectedCareer = location.state?.selectedCareer || "Software Development"; // Default value
  const [courses, setCourses] = useState([]);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  // Securely load API key from .env

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectedCareer}+course&type=video&maxResults=5&key=${API_KEY}`
        );
        const data = await response.json();
        setCourses(data.items || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [selectedCareer]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Recommended Courses for {selectedCareer}
        </h2>

        <p className="text-gray-700 text-lg text-center mb-4">
          Based on your selection, here are some highly recommended courses to enhance your skills in {selectedCareer}.
        </p>

        {courses.length > 0 ? (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li
                key={course.id.videoId}
                className="bg-gray-50 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${course.id.videoId}`, "_blank")}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={course.snippet.thumbnails.default.url}
                    alt={course.snippet.title}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{course.snippet.title}</h3>
                    <p className="text-sm text-gray-600">{course.snippet.channelTitle}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No courses found. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function CareerRoadmap() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { selectedCareer } = location.state || {};
//   const [roadmap, setRoadmap] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!selectedCareer) return;

//     const fetchRoadmap = async () => {
//       const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
//       if (!MISTRAL_API_KEY) {
//         console.error("API key is missing! Add VITE_MISTRAL_API_KEY to .env.");
//         return;
//       }

//       try {
//         await new Promise((resolve) => setTimeout(resolve, 3000)); // Avoid rate limits

//         const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${MISTRAL_API_KEY}`,
//           },
//           body: JSON.stringify({
//             model: "mistral-small",
//             messages: [
//                 { 
//                   role: "system", 
//                   content: "You are an AI that provides career roadmaps. Your response must include only the essential skills required for the given career in a structured, numbered format. Each skill must have: 1) a short explanation, and 2) a correctly formatted, working learning resource link.  Formatting Rules: - The learning resource must be in valid Markdown format: `[Descriptive Text](https://valid-url.com)`.  - Ensure the URL is a real, properly structured, and accessible link. - Do not include placeholder links or malformed URLs.  - Avoid prefixes like 'Learning Resource:' before the link. Only provide a clean, clickable Markdown link."  
//                 },
//                 { 
//                   role: "user", 
//                   content: `Provide only the essential skills required to become a ${selectedCareer}, listed in numbered order. Each skill must have a brief explanation and a correctly formatted, working learning resource link using Markdown: [Descriptive Text](https://valid-url.com). Ensure all links are valid and accessible.`  
//                 },
//               ],
              
//             temperature: 0.7,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`API Error: ${response.status} - ${response.statusText}`);
//         }

//         const data = await response.json();
//         if (data.choices && data.choices.length > 0) {
//           setRoadmap(data.choices[0].message.content.split("\n")); // Convert text to list
//         } else {
//           setRoadmap(["No roadmap data available."]);
//         }
//       } catch (error) {
//         console.error("Error fetching roadmap:", error);
//         setRoadmap(["Error fetching roadmap. Please try again later."]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoadmap();
//   }, [selectedCareer]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-8">
//       <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-3xl">
//         <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-4 text-center">
//           {selectedCareer} Roadmap
//         </h2>
  
//         {loading ? (
//           <p className="text-gray-600 text-center">Loading roadmap...</p>
//         ) : roadmap ? (
//             <ol className="space-y-4 text-lg text-gray-800">
//             {roadmap.map((step, index) => {
//               const parts = step.split("- ");
//               const title = parts[0] ? parts[0].trim() : "";
//               let resource = parts[1] ? parts[1].trim() : "";
          
//               // ✅ Remove unnecessary "Learning Resource:" or any unwanted text
//               resource = resource.replace(/Learning Resource:\s*/, "").trim();
          
//               // ✅ Detect Markdown links: [Title](URL)
//               const markdownMatch = resource.match(/\[(.*?)\]\((.*?)\)/);
          
//               let displayText = resource; // Default text
//               let linkUrl = resource; // Default URL
          
//               if (markdownMatch) {
//                 displayText = markdownMatch[1]; // Extract link text
//                 linkUrl = markdownMatch[2]; // Extract link URL
//               }
          
//               // ✅ Ensure URLs are correctly formatted
//               if (!linkUrl.startsWith("http")) {
//                 linkUrl = `https://${linkUrl}`;
//               }
          
//               return (
//                 <li key={index} className="p-4 bg-white border-l-4 border-teal-500 shadow-md rounded-lg break-words">
//                   <p className="font-bold">{title}</p>
//                   {markdownMatch ? (
//                     <p className="text-teal-600 break-all">
//                       <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
//                         {displayText}
//                       </a>
//                     </p>
//                   ) : (
//                     resource && (
//                       <p className="text-teal-600 break-all">
//                         <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
//                           {resource}
//                         </a>
//                       </p>
//                     )
//                   )}
//                 </li>
//               );
//             })}
//           </ol>
          
          

          
//         ) : (
//           <p className="text-gray-600 text-center">No roadmap available.</p>
//         )}
  
//         <button
//           onClick={() => navigate("/recommendation")}
//           className="mt-6 px-6 py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition w-full sm:w-auto"
//         >
//           Back to Recommendations
//         </button>
//       </div>
//     </div>
//   );
// }
