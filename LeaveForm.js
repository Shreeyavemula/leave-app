import React, { useState } from 'react';
import '../index.css';

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    empName: '',
    empId: '',
    department: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const [formStatus, setFormStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send the form data to the backend
      const response = await fetch('http://localhost:3001/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('pending'); // Set the status to 'pending' upon successful form submission
      } else {
        console.error('Form submission failed');
        setFormStatus('rejected'); // Set the status to 'rejected' if submission fails
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('rejected'); // Set the status to 'rejected' in case of an error
    }
  };

  return (
    <div className="container">
      <h1>Leave Form</h1>
      {formStatus && (
        <div className={`status ${formStatus}`}>
          <p>Status: {formStatus === 'pending' ? 'Pending Approval' : 'Submission Failed'}</p>
          {formStatus === 'pending' && (
            <p>Your leave request is pending approval.</p>
          )}
          {formStatus === 'rejected' && (
            <p>We're sorry, but your leave request has been rejected.</p>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit} className="leave-form">
        <table className="leave-form-table">
          <tbody>
            <tr>
              <td>Employee Name:</td>
              <td>
                <input
                  type="text"
                  name="empName"
                  value={formData.empName}
                  onChange={handleInputChange}
                  className="leave-form-input"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Employee ID:</td>
              <td>
                <input
                  type="text"
                  name="empId"
                  value={formData.empId}
                  onChange={handleInputChange}
                  className="leave-form-input"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Department:</td>
              <td>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="leave-form-input"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Leave Type:</td>
              <td>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  className="leave-form-select"
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Sick">Sick</option>
                  {/* Add more options as needed */}
                </select>
              </td>
            </tr>
            <tr>
              <td>Start Date:</td>
              <td>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="leave-form-input"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>End Date:</td>
              <td>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="leave-form-input"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Reason:</td>
              <td>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="leave-form-textarea"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="leave-form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeaveForm;
