import React from 'react';
import { useNavigate } from 'react-router-dom';

const PolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-800 border rounded px-2 py-1 border-gray-400 hover:bg-gray-100"
      >
        ← Back
      </button>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
        <p className="text-gray-700">
          We value your privacy and are committed to protecting your personal information.
          Any data collected will be used solely to improve your experience and will not be shared without your consent.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Terms and Conditions</h2>
        <p className="text-gray-700">
          By using this website, you agree to our terms and conditions. We reserve the right to update these terms at any time.
          Continued use of the site implies acceptance of any changes.
        </p>
      </section>
    </div>
  );
};

export default PolicyPage;
