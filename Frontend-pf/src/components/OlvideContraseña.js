import axios from "axios";

export const passwordRecoveryMail = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:3500/auth/passwordRecoveryMail",
      { email }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const verifyVerificationCode = async (
  email,
  verificationCode,
  newPassword
) => {
  try {
    const response = await axios.post("http://localhost:3500/auth/verifyCode", {
      email,
      verificationCode,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
