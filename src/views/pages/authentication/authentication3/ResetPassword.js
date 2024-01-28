// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

const ResetPassword = () => {
//   const { resetToken } = useParams();
//   const [newPassword, setNewPassword] = useState('');

//   const handleResetPassword = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ resetToken, newPassword }),
//       });

//       if (response.ok) {
//         console.log('Password reset successful');
//         // Show a success message or redirect to the login page
//       } else {
//         console.error('Error resetting password');
//         // Handle error, show an error message, or redirect to an error page
//       }
//     } catch (error) {
//       console.error('Error during password reset:', error.message);
//     }
//   };

  return (
    <div>
      <h2>Reset Password</h2>
      <p>Enter your new password to reset your password.</p>
      {/* <form>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </form> */}
    </div>
  );
};

export default ResetPassword;
