import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Modal } from "react-bootstrap";
import { logo, bg1, strip, strip2, thank } from "./assets";
import { saveDataToJson } from "./storage";

const OTPForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setShowOtpField(true);
      alert("OTP sent to " + phone);
    } else {
      alert("Please enter a valid 10-digit phone number");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length > 0) {
      setOtpVerified(true);
    } else {
      alert("Please enter a valid OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify OTP before submitting");
      return;
    }

    const formData = {
      name,
      phone,
    };
    saveDataToJson(formData);
    setShowSuccessPopup(true);
  };

  return (
    <div className="position-relative">
      <div className="background-images">
        <div className="position-relative vh-100 w-100">
          <img src={bg1} alt="bg1" className="w-100 mh-100" />
        </div>
      </div>
      <div className="max-w-md mx-auto p-6 h-100 rounded-xl shadow-md position-absolute top-0 mh-100 w-100 d-flex justify-content-start pt-120 align-items-center flex-column px-4">
        <img src={logo} alt="logo" className="w-60 h-auto object-contain" />
        <h2 className="text-center blinker-semibold color-gold heading mt-4 mb-3">
          Barkat-e-Behrouz
        </h2>
        <img
          src={strip}
          alt="strip"
          className="w-60 h-auto object-contain my-1"
        />
        <h1 className="blinker-semibold color-beige heading2 text-center">
          Welcome, Huzoor
        </h1>
        <p className="color-beige text-center blinker-regular text">
          This Ramadan, your Behrouz dawat is more than just a feast - it’s a
          chance to make someone’s Iftar special. If you wish to spread the
          barkat, share your contact details, and we will donate a biryani on
          your behalf at no cost to you.
        </p>
        <form onSubmit={handleSubmit} className="w-100 position-relative">
          <div className="mb-4 position-relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-100 px-3 py-2 input-text blinker-bold border rounded-lg bg-beige br-20 border-0"
              required
              placeholder="Name"
            />
          </div>

          <div className="mb-4 position-relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-100 px-3 py-2 input-text blinker-bold border rounded-lg bg-beige br-20 border-0"
              maxLength="10"
              required
              placeholder="Phone Number"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              className="position-absolute end-0 top-50 btn2 translate-middle-y me-2 bg-transparent blinker-bold btn-text border-0 text-black py-1 px-3"
            >
              Send OTP
            </button>
          </div>

          {showOtpField && (
            <div className="mb-4 position-relative">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-100 px-3 py-2 input-text blinker-bold border rounded-lg bg-beige br-20"
                required
                placeholder="OTP"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="position-absolute end-0 top-50 translate-middle-y btn2  me-2 bg-transparent blinker-bold btn-text border-0 text-black py-1 px-3"
              >
                {otpVerified ? "OTP Verified" : "Verify OTP"}
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-100 bg-gold blinker-semibold btn-text text-black py-2 br-20 border-0"
          >
            Click to donate a biryani
          </button>
        </form>
      </div>

      <Modal
        show={showSuccessPopup}
        onHide={() => setShowSuccessPopup(false)}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="bg-beige br-20 text-center">
          <div className="mt-neg60 text-center">
            <img
              src={thank}
              alt="thank You"
              className="w-80  h-auto object-contain my-1"
            />
          </div>
          <h1 className="heading3 blinker-bold color-brown">
            Shukran, huzoor!
          </h1>
          <img
            src={strip2}
            alt="strip"
            className="w-60 h-auto object-contain my-1 mt-3"
          />
          <p className="text blinker-bold mt-3">
            If you wish to extend your support to those in need, you can
            directly contribute your donations to our partnered NGOs.
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OTPForm;
