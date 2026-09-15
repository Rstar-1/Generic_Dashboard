import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../common/Icon";
import Dropdown from "../common/Dropdown";
import Modal from "../common/Modal";
import FormBuilder from "../forms/FormBuilder";
import Steps from "../common/Steps";
import Button from "../common/Button";

/* ==========================================================================
   STATIC CONFIGURATIONS & ROUTE TITLES
   ========================================================================== */
const ROUTE_TITLES = {
  // Routes from routes/index.jsx
  "/dashboard": "Dashboard",
  "/components/fields": "Fields",
  "/components/sections": "Sections",
  "/components/templates": "Templates",
  "/management/customers": "Customers",
  "/customers": "Customers",
  "/management/tasks": "Tasks",
  "/tasks": "Tasks",
  "/management/transactions": "Transactions",
  "/transactions": "Transactions",
  "/settings/users": "System Users",
  "/users": "System Users",
  "/settings/roles": "Roles",
  "/roles": "Roles",

  // Analytics & Profile
  "/analytics": "Web Analytics",
  "/profile": "Administrator Profile",

  // Other Management & Builder Routes
  "/management/product": "Products",
  "/management/categories": "Categories",
  "/management/blogs": "Blog Posts",
  "/management/blog": "Blog Posts",
  "/blog": "Blog Posts",
  "/management/blog-categories": "Blog Categories",
  "/management/blog-category": "Blog Categories",
  "/blog-category": "Blog Categories",
  "/management/cms": "Content Management",
  "/management/orders": "Orders",
  "/management/payments": "Payments",
  "/management/leads": "Leads",
  "/builder/meta": "SEO Metadata",
  "/builder/json": "JSON Config",
  "/management/ai": "AI Integrations",
};

const LOGIN_FIELDS = [
  {
    name: "mobile",
    type: "tel",
    label: "Mobile Number",
    placeholder: "Enter mobile number",
    validation: { required: true, mobile: true }
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter password",
    validation: { required: true }
  }
];

const FORGOT_STEP1_FIELDS = [
  {
    name: "mobile",
    type: "tel",
    label: "Mobile Number",
    placeholder: "Enter mobile number",
    validation: { required: true, mobile: true }
  }
];

const FORGOT_STEP2_FIELDS = [
  {
    name: "otp",
    type: "text",
    label: "OTP Code",
    placeholder: "Enter verification OTP",
    validation: { required: true }
  }
];

const FORGOT_STEP3_FIELDS = [
  {
    name: "password",
    type: "password",
    label: "New Password",
    placeholder: "Enter new password",
    validation: { required: true }
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    placeholder: "Confirm new password",
    validation: { required: true }
  }
];

const getRegisterStep1Fields = (defaultRole, defaultName) => [
  {
    name: "role",
    type: "select",
    label: "Register As",
    defaultValue: defaultRole || "vendor",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Vendor", value: "vendor" },
      { label: "User", value: "user" }
    ],
    validation: { required: true }
  },
  {
    name: "fullname",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    defaultValue: defaultName || "",
    validation: { required: true }
  }
];

const getRegisterStep2Fields = (defaultEmail, defaultMobile) => [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    defaultValue: defaultEmail || "",
    validation: { required: true, email: true }
  },
  {
    name: "mobile",
    type: "tel",
    label: "Mobile Number",
    placeholder: "Enter mobile number",
    defaultValue: defaultMobile || "",
    validation: { required: true, mobile: true }
  }
];

const REGISTER_STEP3_FIELDS = [
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Create password",
    validation: { required: true }
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    placeholder: "Confirm password",
    validation: { required: true }
  }
];

const REGISTER_OTP_FIELDS = [
  {
    name: "otp",
    type: "text",
    label: "OTP Code",
    placeholder: "Enter the OTP sent to your phone",
    validation: { required: true }
  }
];

const REGISTER_STEPS = ["Personal", "Contact", "Security", "Complete"];

/* ==========================================================================
   CUSTOM REUSABLE HOOKS & SUBCOMPONENTS (MEMOIZED)
   ========================================================================== */
const useMockMutation = (actionFn, delay = 350) => {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    (data, { onSuccess, onError } = {}) => {
      setIsPending(true);
      setTimeout(() => {
        setIsPending(false);
        try {
          actionFn?.(data);
          onSuccess?.();
        } catch (err) {
          onError?.(err);
        }
      }, delay);
    },
    [actionFn, delay]
  );

  return { isPending, mutate };
};

const ModalHeader = memo(({ icon, title, subtitle }) => (
  <div className="text-center mt-16">
    <div
      className="rounded-full bg-light-primary text-primary mx-auto flex items-center justify-center"
      style={{ height: "54px", width: "54px" }}
    >
      <Icon name={icon} width="23" height="23" stroke="currentColor" />
    </div>
    <h3 className="font-500 text-dark mid-text pt-8">{title}</h3>
    {subtitle && <p className="text-gray mini-text">{subtitle}</p>}
  </div>
));
ModalHeader.displayName = "ModalHeader";

const PasswordRequirements = memo(() => (
  <div className="mt-12 mb-20 text-gray mini-text flex flex-column gap-6" style={{ paddingLeft: "4px" }}>
    <div className="flex items-center gap-6">
      <Icon name="Check" width="14" height="14" stroke="#10b981" strokeWidth="2.5" />
      <span>At least 8 characters</span>
    </div>
    <div className="flex items-center gap-6">
      <Icon name="Check" width="14" height="14" stroke="#10b981" strokeWidth="2.5" />
      <span>Include a number or symbol</span>
    </div>
    <div className="flex items-center gap-6">
      <Icon name="Check" width="14" height="14" stroke="#10b981" strokeWidth="2.5" />
      <span>Mix of uppercase and lowercase</span>
    </div>
  </div>
));
PasswordRequirements.displayName = "PasswordRequirements";

const Spinner = memo(() => (
  <svg
    className="animate-spin"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    style={{ animation: "spin 1s linear infinite" }}
  >
    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" />
  </svg>
));
Spinner.displayName = "Spinner";

/* ==========================================================================
   LOGIN MODAL (MEMOIZED)
   ========================================================================== */
const LoginModal = memo(({ isOpen, onClose, onOpenForgot, onOpenRegister, loginMutation }) => {
  const [error, setError] = useState("");

  const handleClose = useCallback(() => {
    setError("");
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    (formData) => {
      setError("");
      loginMutation.mutate(formData, {
        onSuccess: handleClose,
        onError: (err) => setError(err?.message || "Invalid mobile or password.")
      });
    },
    [loginMutation, handleClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Welcome Back" size="sm" footer={null}>
      <div className="py-10">
        {error && (
          <div className="p-12 mb-16 rounded-5 bg-light-danger">
            <p className="mini-text font-500 text-danger">{error}</p>
          </div>
        )}

        <FormBuilder
          key={isOpen ? "open" : "closed"}
          fields={LOGIN_FIELDS}
          submitType="json"
          onSubmit={handleSubmit}
          buttonClassName="hidden"
        >
          <div className="flex justify-end mt-10">
            <p className="mini-text text-primary cursor-pointer font-500" onClick={onOpenForgot}>
              Forgot Password?
            </p>
          </div>

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            bg="primary"
            color="white"
            version="v3"
            className="mt-16"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center mt-15">
            <p className="mini-text text-gray">
              Don't have an account?{" "}
              <span className="text-primary font-600 cursor-pointer ml-4" onClick={onOpenRegister}>
                Register here
              </span>
            </p>
          </div>
        </FormBuilder>
      </div>
    </Modal>
  );
});
LoginModal.displayName = "LoginModal";

/* ==========================================================================
   FORGOT PASSWORD MODAL (MEMOIZED)
   ========================================================================== */
const ForgotPasswordModal = memo(({ isOpen, onClose, onBackToLogin, mutations }) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const { forgotMutation, verifyOtpMutation, resetPasswordMutation } = mutations;

  const handleClose = useCallback(() => {
    setError("");
    setStep(1);
    setFormData({});
    onClose();
  }, [onClose]);

  const handleStep1 = useCallback(
    (data) => {
      setError("");
      forgotMutation.mutate(
        { mobile: data.mobile },
        {
          onSuccess: () => {
            setFormData({ mobile: data.mobile });
            setStep(2);
          },
          onError: (err) => setError(err?.message || "Failed to send OTP. Try again.")
        }
      );
    },
    [forgotMutation]
  );

  const handleStep2 = useCallback(
    (data) => {
      setError("");
      verifyOtpMutation.mutate(
        { mobile: formData.mobile, otp: data.otp },
        {
          onSuccess: () => {
            setFormData((prev) => ({ ...prev, otp: data.otp }));
            setStep(3);
          },
          onError: (err) => setError(err?.message || "Invalid OTP code.")
        }
      );
    },
    [verifyOtpMutation, formData.mobile]
  );

  const handleStep3 = useCallback(
    (data) => {
      setError("");
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      resetPasswordMutation.mutate(
        { mobile: formData.mobile, password: data.password },
        {
          onSuccess: () => {
            alert("Password reset successfully! Please login with your new password.");
            handleClose();
            onBackToLogin();
          },
          onError: (err) => setError(err?.message || "Failed to reset password.")
        }
      );
    },
    [resetPasswordMutation, formData.mobile, handleClose, onBackToLogin]
  );

  const title = step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} size="sm" footer={null}>
      <div className="py-10">
        {error && (
          <div className="p-12 mb-16 rounded-5 bg-light-danger">
            <p className="mini-text font-500 text-danger">{error}</p>
          </div>
        )}

        {step === 1 && (
          <FormBuilder key="forgot-1" fields={FORGOT_STEP1_FIELDS} submitType="json" onSubmit={handleStep1} buttonClassName="hidden">
            <ModalHeader icon="Lock" title="Reset Password" subtitle="Enter your mobile number to request an OTP code" />
            <Button type="submit" disabled={forgotMutation.isPending} bg="primary" color="white" version="v2" className="mt-20 w-full">
              {forgotMutation.isPending ? "Sending OTP..." : "Send OTP"}
            </Button>
            <div className="text-center mt-20">
              <span className="text-primary font-600 cursor-pointer ml-4 mini-text" onClick={onBackToLogin}>
                &larr; Back to Login
              </span>
            </div>
          </FormBuilder>
        )}

        {step === 2 && (
          <FormBuilder key="forgot-2" fields={FORGOT_STEP2_FIELDS} submitType="json" onSubmit={handleStep2} buttonClassName="hidden">
            <ModalHeader icon="Mail" title="Verify OTP" subtitle={`Enter the OTP sent to ${formData.mobile}`} />
            <Button type="submit" disabled={verifyOtpMutation.isPending} bg="primary" color="white" version="v2" className="mt-20 w-full">
              {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
            </Button>
            <div className="text-center mt-20">
              <span className="text-gray cursor-pointer mini-text" onClick={() => setStep(1)}>
                &larr; Change Mobile Number
              </span>
            </div>
          </FormBuilder>
        )}

        {step === 3 && (
          <FormBuilder key="forgot-3" fields={FORGOT_STEP3_FIELDS} submitType="json" onSubmit={handleStep3} buttonClassName="hidden">
            <ModalHeader icon="Lock" title="Create New Password" subtitle="Ensure your new password is secure" />
            <Button type="submit" disabled={resetPasswordMutation.isPending} bg="primary" color="white" version="v2" className="mt-20 w-full">
              {resetPasswordMutation.isPending ? "Resetting Password..." : "Reset Password"}
            </Button>
          </FormBuilder>
        )}
      </div>
    </Modal>
  );
});
ForgotPasswordModal.displayName = "ForgotPasswordModal";

/* ==========================================================================
   REGISTER MODAL (MEMOIZED)
   ========================================================================== */
const RegisterModal = memo(({ isOpen, onClose, registerMutation, verifyOtpMutation, loginMutation }) => {
  const [registerStep, setRegisterStep] = useState("form");
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [tempData, setTempData] = useState(null);
  const [error, setError] = useState("");

  const handleClose = useCallback(() => {
    setError("");
    setRegisterStep("form");
    setFormStep(1);
    setFormData({});
    setTempData(null);
    onClose();
  }, [onClose]);

  const handleStep1 = useCallback((data) => {
    setError("");
    setFormData(data);
    setFormStep(2);
  }, []);

  const handleStep2 = useCallback((data) => {
    setError("");
    setFormData((prev) => ({ ...prev, email: data.email, mobile: data.mobile }));
    setFormStep(3);
  }, []);

  const handleStep3 = useCallback((data) => {
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setFormData((prev) => ({ ...prev, password: data.password }));
    setFormStep(4);
  }, []);

  const handleStep4 = useCallback(() => {
    setError("");
    registerMutation.mutate(formData, {
      onSuccess: () => {
        setTempData(formData);
        setRegisterStep("otp");
      },
      onError: (err) => setError(err?.message || "Registration failed. Try again.")
    });
  }, [registerMutation, formData]);

  const handleVerifyOtp = useCallback(
    (otpData) => {
      setError("");
      verifyOtpMutation.mutate(
        { mobile: tempData?.mobile, otp: otpData.otp },
        {
          onSuccess: () => {
            loginMutation.mutate(
              { mobile: tempData?.mobile, password: tempData?.password },
              {
                onSuccess: handleClose,
                onError: () => setError("OTP verified, but automatic login failed. Please login manually.")
              }
            );
          },
          onError: () => setError("Invalid OTP code.")
        }
      );
    },
    [verifyOtpMutation, loginMutation, tempData, handleClose]
  );

  const step1Fields = useMemo(
    () => getRegisterStep1Fields(formData.role, formData.fullname),
    [formData.role, formData.fullname]
  );
  const step2Fields = useMemo(
    () => getRegisterStep2Fields(formData.email, formData.mobile),
    [formData.email, formData.mobile]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={registerStep === "otp" ? "Verify OTP" : "Create an Account"}
      size="sm"
      footer={null}
    >
      <div className="py-10">
        {registerStep !== "otp" && <Steps currentStep={formStep} steps={REGISTER_STEPS} />}

        {error && (
          <div className="p-12 mb-16 rounded-5 bg-light-danger">
            <p className="mini-text font-500 text-danger">{error}</p>
          </div>
        )}

        {registerStep === "form" ? (
          formStep === 1 ? (
            <FormBuilder key="reg-1" fields={step1Fields} submitType="json" onSubmit={handleStep1} buttonClassName="hidden">
              <ModalHeader icon="Users" title="Let's start with your name" subtitle="Enter your full name to continue" />
              <div className="flex justify-end mt-20">
                <Button type="submit" bg="primary" color="white" version="v2">
                  Next &rarr;
                </Button>
              </div>
            </FormBuilder>
          ) : formStep === 2 ? (
            <FormBuilder key="reg-2" fields={step2Fields} submitType="json" onSubmit={handleStep2} buttonClassName="hidden">
              <div className="flex items-center justify-between mt-20">
                <Button type="button" onClick={() => setFormStep(1)} bg="forth" color="dark" version="v2">
                  &larr; Back
                </Button>
                <Button type="submit" bg="primary" color="white" version="v2">
                  Next &rarr;
                </Button>
              </div>
            </FormBuilder>
          ) : formStep === 3 ? (
            <FormBuilder key="reg-3" fields={REGISTER_STEP3_FIELDS} submitType="json" onSubmit={handleStep3} buttonClassName="hidden">
              <PasswordRequirements />
              <div className="flex items-center justify-between mt-20">
                <Button type="button" onClick={() => setFormStep(2)} bg="forth" color="dark" version="v2">
                  &larr; Back
                </Button>
                <Button type="submit" bg="primary" color="white" version="v2">
                  Next &rarr;
                </Button>
              </div>
            </FormBuilder>
          ) : (
            <FormBuilder key="reg-4" fields={[]} submitType="json" onSubmit={handleStep4} buttonClassName="hidden">
              <div className="flex flex-column items-center mb-24 text-center">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{ width: "56px", height: "56px", backgroundColor: "#ffedd5", color: "#ea580c" }}
                >
                  <Icon name="Check" width="24" height="24" stroke="currentColor" />
                </div>
                <h3 className="font-600 text-dark mid-text pt-4">Review & Confirm</h3>
                <p className="text-gray mini-text">Please review your details before creating your account</p>
              </div>

              <div className="grid-cols-1 gap-5">
                <div className="flex items-center justify-between pb-8 border-b" style={{ borderColor: "#ececec" }}>
                  <p className="text-gray mini-text">Full Name</p>
                  <p className="text-dark font-600 headmini-text capitalize">{formData.fullname}</p>
                </div>
                <div className="flex items-center justify-between pb-8 border-b" style={{ borderColor: "#ececec" }}>
                  <p className="text-gray mini-text">Email Address</p>
                  <p className="text-dark font-600 headmini-text">{formData.email}</p>
                </div>
                <div className="flex items-center justify-between pb-8 border-b" style={{ borderColor: "#ececec" }}>
                  <p className="text-gray mini-text">Mobile Number</p>
                  <p className="text-dark font-600 headmini-text">{formData.mobile}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-10">
                <Button type="button" onClick={() => setFormStep(3)} bg="forth" color="dark" version="v2">
                  &larr; Back
                </Button>
                <Button type="submit" disabled={registerMutation.isPending} bg="primary" color="white" version="v2">
                  {registerMutation.isPending ? "Registering..." : "Register"}
                </Button>
              </div>
            </FormBuilder>
          )
        ) : (
          <FormBuilder key="reg-otp" fields={REGISTER_OTP_FIELDS} submitType="json" onSubmit={handleVerifyOtp} buttonClassName="hidden">
            <Button
              type="submit"
              disabled={verifyOtpMutation.isPending || loginMutation.isPending}
              bg="primary"
              color="white"
              version="v3"
              className="mt-12 w-full flex items-center justify-center gap-6"
            >
              {verifyOtpMutation.isPending ? (
                <span className="flex items-center gap-4 justify-center">
                  <Spinner />
                  Verifying...
                </span>
              ) : loginMutation.isPending ? (
                "Logging in..."
              ) : (
                "Verify OTP"
              )}
            </Button>
          </FormBuilder>
        )}
      </div>
    </Modal>
  );
});
RegisterModal.displayName = "RegisterModal";

/* ==========================================================================
   MAIN HEADER COMPONENT (MEMOIZED)
   ========================================================================== */
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Static user state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({
    fullname: "Alex Morgan",
    role: "Administrator",
    email: "alex.morgan@example.com",
    mobile: "9876543210"
  });

  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains("dark-mode"));
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      document.body.classList.toggle("dark-mode", next);
      return next;
    });
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setIsUserDropdownOpen(false);
    navigate("/dashboard");
  }, [navigate]);

  // Modal open/close callbacks
  const handleOpenLogin = useCallback(() => {
    setIsUserDropdownOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  }, []);

  const handleCloseLogin = useCallback(() => setIsLoginModalOpen(false), []);

  const handleOpenRegister = useCallback(() => {
    setIsUserDropdownOpen(false);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  }, []);

  const handleCloseRegister = useCallback(() => setIsRegisterModalOpen(false), []);

  const handleOpenForgot = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(true);
  }, []);

  const handleCloseForgot = useCallback(() => setIsForgotPasswordModalOpen(false), []);

  // Mock mutation actions
  const onLoginSuccessAction = useCallback((formData) => {
    setUser((prev) => ({
      ...prev,
      fullname: prev?.fullname || "Admin User",
      mobile: formData?.mobile || prev?.mobile || "9876543210"
    }));
    setIsLoggedIn(true);
  }, []);

  const onVerifyOtpSuccessAction = useCallback((tempData) => {
    setUser({
      fullname: tempData?.fullname || "New User",
      role: tempData?.role || "Vendor",
      email: tempData?.email || "user@example.com",
      mobile: tempData?.mobile || "9876543210"
    });
    setIsLoggedIn(true);
  }, []);

  const loginMutation = useMockMutation(onLoginSuccessAction);
  const registerMutation = useMockMutation();
  const verifyOtpMutation = useMockMutation(onVerifyOtpSuccessAction);
  const forgotMutation = useMockMutation();
  const verifyForgotOtpMutation = useMockMutation();
  const resetPasswordMutation = useMockMutation();

  const forgotMutations = useMemo(
    () => ({ forgotMutation, verifyOtpMutation: verifyForgotOtpMutation, resetPasswordMutation }),
    [forgotMutation, verifyForgotOtpMutation, resetPasswordMutation]
  );

  const userMenuItems = useMemo(
    () => [
      { label: "My Profile", icon: "Users", path: "/profile", show: true },
      { label: "Logout", icon: "Logout", action: handleLogout, show: true, className: "text-danger" }
    ],
    [handleLogout]
  );

  const pageTitle = useMemo(() => {
    if (ROUTE_TITLES[location.pathname]) {
      return ROUTE_TITLES[location.pathname];
    }
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      const last = segments[segments.length - 1];
      return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, " ");
    }
    return "Dashboard";
  }, [location.pathname]);
  const userInitial = useMemo(() => (user?.fullname ? user.fullname.charAt(0).toUpperCase() : "U"), [user?.fullname]);

  return (
    <>
      <header
        className="w-full bg-white bordb sticky top-0 z-30"
      >
        <div className="flex items-center justify-between p-12">
          {/* Left: Back button & Page Title */}
          <div className="flex items-center gap-12">
            {location.pathname !== "/dashboard" && (
              <Button
                version="icon"
                icon="ChevronLeft"
                onClick={() => navigate(-1)}
                variant="outline"
                bg="primary"
              />
            )}
            <h2 className="mid-text text-secondary font-500">{pageTitle}</h2>
          </div>

          {/* Right: Score, Help, Dark Mode & User Account */}
          <div className="flex items-center gap-6">
            {location.pathname === "/profile" && (
              <div className="border-tertiary rounded-5 bg-forth px-12 py-3 flex items-center gap-8">
                <p className="mini-text text-gray uppercase font-600 tracking-wider">Profile Score</p>
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--success)", display: "flex", flexShrink: 0 }} />
                <p className="small-text text-success font-700">98.6%</p>
              </div>
            )}

            {/* Help Button */}
            <div className="border-tertiary rounded-5 bg-white p-8 flex items-center justify-center cursor-pointer text-gray hover-text-dark">
              <Icon name="Help" width="14" height="14" strokeWidth="2.5" />
            </div>

            {/* Dark Mode Button */}
            <div
              className={`border-tertiary rounded-5 p-8 flex items-center justify-center cursor-pointer ${isDarkMode ? "bg-dark text-white" : "bg-white text-gray hover-text-dark"
                }`}
              onClick={toggleDarkMode}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <Icon name={isDarkMode ? "Sun" : "Moon"} width="14" height="14" strokeWidth="2.5" />
            </div>

            <div style={{ width: 1, height: 14, backgroundColor: "#e2e8f0", margin: "0 6px" }} />

            {/* User Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              onMouseLeave={() => setIsUserDropdownOpen(false)}
            >
              <div className="border-tertiary rounded-5 bg-white p-8 flex items-center justify-center cursor-pointer text-gray hover-text-dark">
                <Icon name="Users" width="14" height="14" stroke={isLoggedIn ? "#f25c2b" : "currentColor"} strokeWidth="2.5" />
              </div>

              {isUserDropdownOpen && (
                <Dropdown isOpen={isUserDropdownOpen} align="right" minWidth="200px" className="b-shadow rounded-5">
                  <div className="p-12 bordb flex items-center gap-12">
                    {isLoggedIn ? (
                      <>
                        <div
                          className="rounded-full bg-light-primary text-primary flex items-center justify-center font-600"
                          style={{ width: 32, height: 32, backgroundColor: "#eff6ff" }}
                        >
                          {userInitial}
                        </div>
                        <div>
                          <h4 className="font-600 text-dark headmini-text capitalize">{user?.fullname || "User"}</h4>
                          <p className="text-gray mini-text">{user?.role || "Customer"}</p>
                        </div>
                      </>
                    ) : (
                      <div>
                        <h4 className="font-600 text-dark headmini-text capitalize">Welcome Guest</h4>
                        <p className="text-gray mini-text">Manage your account</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    {isLoggedIn ? (
                      userMenuItems.map((item, idx) => (
                        <p
                          key={idx}
                          className={`drop-item rounded-5 mini-text cursor-pointer p-10 flex items-center gap-8 ${item.className || ""}`}
                          style={{ margin: 0, padding: "8px 10px", fontSize: "12px" }}
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            item.action ? item.action() : navigate(item.path);
                          }}
                        >
                          {item.icon && <Icon name={item.icon} width="14" height="14" stroke="currentColor" />}
                          <span>{item.label}</span>
                        </p>
                      ))
                    ) : (
                      <>
                        <p
                          className="drop-item rounded-5 mini-text cursor-pointer p-10 flex items-center gap-8"
                          style={{ margin: 0, padding: "8px 10px", fontSize: "12px" }}
                          onClick={handleOpenLogin}
                        >
                          <Icon name="Users" width="14" height="14" stroke="currentColor" />
                          <span>Login</span>
                        </p>
                        <p
                          className="drop-item rounded-5 mini-text cursor-pointer p-10 flex items-center gap-8"
                          style={{ margin: 0, padding: "8px 10px", fontSize: "12px" }}
                          onClick={handleOpenRegister}
                        >
                          <Icon name="Users" width="14" height="14" stroke="currentColor" />
                          <span>Register</span>
                        </p>
                      </>
                    )}
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MODALS (MEMOIZED) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLogin}
        onOpenForgot={handleOpenForgot}
        onOpenRegister={handleOpenRegister}
        loginMutation={loginMutation}
      />

      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={handleCloseForgot}
        onBackToLogin={handleOpenLogin}
        mutations={forgotMutations}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegister}
        registerMutation={registerMutation}
        verifyOtpMutation={verifyOtpMutation}
        loginMutation={loginMutation}
      />
    </>
  );
};

export default memo(Header);