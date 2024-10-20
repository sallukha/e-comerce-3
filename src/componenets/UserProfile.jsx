// import React, { useState } from 'react';

// const UserProfile = () => {
//   const [isFollowing, setIsFollowing] = useState(false); // To track follow/unfollow status
//   const [feedback, setFeedback] = useState(''); // To store user feedback
//   const [rating, setRating] = useState(0); // To store user rating
//   const [feedbackList, setFeedbackList] = useState([]); // To store all feedback submissions

//   // Toggle follow/unfollow
//   const handleFollowToggle = () => {
//     setIsFollowing(!isFollowing);
//   };

//   // Handle feedback submission
//   const handleFeedbackSubmit = (e) => {
//     e.preventDefault();
    
//     // Add the feedback to the feedback list
//     const newFeedback = {
//       comment: feedback,
//       rating: rating,
//     };
    
//     setFeedbackList([...feedbackList, newFeedback]);
//     setFeedback(''); // Clear feedback input
//     setRating(0); // Reset rating
//   };

//   return (
//     <div className="p-5">
//       <div className="mb-4">
//         <h1 className="text-2xl font-bold">User Profile</h1>
//         <p className="text-gray-600">This is a user profile page. You can follow the user or provide feedback.</p>
//       </div>

//       {/* Follow/Unfollow Button */}
//       <div className="mb-6">
//         <button 
//           onClick={handleFollowToggle} 
//           className={`px-4 py-2 rounded-md ${isFollowing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
//         >
//           {isFollowing ? 'Unfollow' : 'Follow'}
//         </button>
//       </div>

//       {/* Feedback Form */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Leave Feedback</h2>
//         <form onSubmit={handleFeedbackSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="feedback" className="block text-gray-700">Your Feedback:</label>
//             <textarea
//               id="feedback"
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//               rows="4"
//               className="w-full p-2 border rounded-md"
//               placeholder="Write your feedback here..."
//             ></textarea>
//           </div>
          
//           <div>
//             <label htmlFor="rating" className="block text-gray-700">Rating (1-5):</label>
//             <input
//               id="rating"
//               type="number"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               min="1"
//               max="5"
//               className="w-20 p-2 border rounded-md"
//             />
//           </div>

//           <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">Submit Feedback</button>
//         </form>
//       </div>

//       {/* Display Feedback */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">User Feedback</h2>
//         {feedbackList.length === 0 ? (
//           <p>No feedback yet. Be the first to leave feedback!</p>
//         ) : (
//           <ul className="space-y-4">
//             {feedbackList.map((fb, index) => (
//               <li key={index} className="p-4 border rounded-md bg-gray-50">
//                 <p className="font-semibold">Rating: {fb.rating}/5</p>
//                 <p>{fb.comment}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
