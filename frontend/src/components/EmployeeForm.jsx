function EmployeeForm({
  formData,
  onChange,
  onSubmit,
  saving,
  submitLabel,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="employeeId">
          Employee ID
        </label>

        <input
          id="employeeId"
          name="employeeId"
          type="text"
          value={formData.employeeId}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="firstName">
          First Name
        </label>

        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="lastName">
          Last Name
        </label>

        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="department">
          Department
        </label>

        <input
          id="department"
          name="department"
          type="text"
          value={formData.department}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="designation">
          Designation
        </label>

        <input
          id="designation"
          name="designation"
          type="text"
          value={formData.designation}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="country">
          Country
        </label>

        <input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="currency">
          Currency
        </label>

        <input
          id="currency"
          name="currency"
          type="text"
          value={formData.currency}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="annualSalary">
          Annual Salary
        </label>

        <input
          id="annualSalary"
          name="annualSalary"
          type="number"
          min="0"
          value={formData.annualSalary}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="joiningDate">
          Joining Date
        </label>

        <input
          id="joiningDate"
          name="joiningDate"
          type="date"
          value={formData.joiningDate}
          onChange={onChange}
          required
        />
      </div>

      <button
        type="submit"
        disabled={saving}
      >
        {saving
          ? "Saving..."
          : submitLabel}
      </button>
    </form>
  );
}

export default EmployeeForm;