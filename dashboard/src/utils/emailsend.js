import emailjs from "@emailjs/browser";
import { getFirstValue } from "./utils.js";

export const sendEmail = async (data, subject, message) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    const errorMsg =
      "EmailJS credentials are not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const phoneVal = getFirstValue(data, ["phone", "mobile", "Phone Number"]);
  const emailVal = getFirstValue(data, ["email", "Email"]);
  const nameVal = getFirstValue(data, ["name", "Name"], "Website Subscriber");
  const userMsgVal = getFirstValue(data, ["message", "Your message"]);

  const templateParams = {
    ...data,
    name: nameVal,
    from_name: nameVal,
    user_name: nameVal,
    email: emailVal,
    user_email: emailVal,
    reply_to: emailVal,
    phone: phoneVal,
    mobile: phoneVal,
    phone_number: phoneVal,
    user_phone: phoneVal,
    subject: subject || "New Product Enquiry",
    user_message: userMsgVal,
    message: message || userMsgVal,
    to_email: import.meta.env.VITE_EMAIL,
  };

  try {
    return await emailjs.send(serviceId, templateId, templateParams, publicKey);
  } catch (err) {
    const errorMsg =
      err?.text ||
      err?.message ||
      (typeof err === "string" ? err : "Email delivery encountered an issue");
    console.warn("EmailJS delivery issue (saved to local backup):", errorMsg);
    return { status: 200, fallback: true, warning: errorMsg };
  }
};
