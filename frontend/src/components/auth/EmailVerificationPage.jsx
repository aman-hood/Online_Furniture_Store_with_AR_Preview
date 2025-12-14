// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function EmailVerificationPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-10">

//       <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
        
//         <h1 className="text-4xl font-serif text-[#111] text-center">
//           Verify Your Email
//         </h1>
//         <p className="text-center mt-2 text-gray-500">
//           Enter your email to receive a 6-digit verification code
//         </p>

//         <form className="space-y-6 mt-8">
//           <label className="block">
//             <span className="text-xs text-gray-600">Email Address</span>
//             <input
//               type="email"
//               placeholder="you@mail.com"
//               className="
//                 mt-2 w-full rounded-2xl px-4 py-3 bg-[#f5f5f5]
//                 border border-gray-300 focus:ring-2 focus:ring-black
//                 placeholder-gray-400
//               "
//             />
//           </label>

//           <button
//             type="button"
//             onClick={() => navigate("/otp")}
//             className="
//               w-full rounded-2xl py-3 font-semibold text-white
//               bg-black hover:bg-[#222] shadow-md hover:shadow-lg
//               transition
//             "
//           >
//             Send Code
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Back to login?
//           <button
//             className="ml-2 underline hover:text-black"
//             onClick={() => navigate("/login")}
//           >
//             Log in
//           </button>
//         </p>

//       </div>
//     </div>
//   );
// }
