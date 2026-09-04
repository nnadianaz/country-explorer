import { useState } from "react";

const INITIAL_FORM_VALUES = {
  destination: "",
  startDate: "",
  endDate: "",
  budget: "",
  notes: "",
};

const fieldStyles = `
  w-full
  rounded-xl
  border-2
  border-[#17152e]/15
  bg-white

  px-4 py-3.5

  text-sm
  text-[#17152e]

  outline-none
  transition-all
  duration-200

  placeholder:text-[#6f6b7a]/55

  hover:border-[#17152e]/30

  focus:border-[#ff7457]
  focus:ring-4
  focus:ring-[#ff7457]/15
`;

const validateTravelPlan = (values) => {

  // creates an empty object that will collect all validation errors
  const validationErrors = {};

  const destination = values.destination.trim();
  const budget = Number(values.budget);

  if (!destination) {
    validationErrors.destination =
      "Please enter a destination.";
  } else if (destination.length < 2) {
    validationErrors.destination =
      "Destination must contain at least 2 characters.";
  }

  if (!values.startDate) {
    validationErrors.startDate =
      "Please select a start date.";
  }

  if (!values.endDate) {
    validationErrors.endDate =
      "Please select an end date.";
  } else if (
    values.startDate &&
    values.endDate < values.startDate
  ) {
    validationErrors.endDate =
      "End date cannot be before the start date.";
  }

  if (!values.budget) {
    validationErrors.budget =
      "Please enter an estimated budget.";
  } else if (
    !Number.isFinite(budget) ||
    budget <= 0
  ) {
    validationErrors.budget =
      "Budget must be greater than zero.";
  }

  if (values.notes.trim().length > 500) {
    validationErrors.notes =
      "Notes cannot exceed 500 characters.";
  }

  return validationErrors;
};

const TravelPlanForm = () => {

    const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
    const [errors, setErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState("");

const handleChange = (event) => {
  const { name, value } = event.target;

  setFormValues((currentValues) => ({
    ...currentValues,
    [name]: value,
  }));

  setSubmitMessage("");

  setErrors((currentErrors) => {
    if (!currentErrors[name]) {
      return currentErrors;
    }

    const updatedErrors = {
      ...currentErrors,
    };

    delete updatedErrors[name];

    return updatedErrors;
  });
};

const handleSubmit = (event) => {
  event.preventDefault();

  const validationErrors =
    validateTravelPlan(formValues);

  if (
    Object.keys(validationErrors).length > 0
  ) {
    setErrors(validationErrors);
    setSubmitMessage("");

    return;
  }


  // creates a clean payload object from the form data before sending
  //  it to the backend
  const payload = {
    destination:
      formValues.destination.trim(),
    startDate: formValues.startDate,
    endDate: formValues.endDate,
    budget: Number(formValues.budget),
    notes: formValues.notes.trim(),
  };

  setErrors({});
  setSubmitMessage(
    "Your travel plan is valid and ready to submit.",
  );

  console.log(
    "Travel plan payload:",
    payload,
  );
};

  return (
    <section
      id="travel-planner"
      className="mx-auto max-w-[900px] px-5 py-16"
    >
      <h2 className="font-[Georgia,serif] text-4xl">
        Create a travel plan
      </h2>

      <p className="mt-2 text-sm text-[#6f6b7a]">
        Start planning your next destination.
      </p>

      <form
  noValidate
  onSubmit={handleSubmit}
  className="mt-8 grid gap-6"
>
  {/* Destination */}
  <div className="grid gap-2">
    <label
      htmlFor="destination"
      className="text-xs font-extrabold uppercase tracking-[0.1em]"
    >
      Destination
    </label>

    <input
      id="destination"
      name="destination"
      type="text"
      value={formValues.destination}
      onChange={handleChange}
      placeholder="For example, Austria"
        aria-invalid={Boolean(errors.destination)}
        aria-describedby={
        errors.destination
            ? "destination-error"
            : undefined
        }
      className={fieldStyles}
    />
    {errors.destination && (
        <p
            id="destination-error"
            role="alert"
            className="m-0 text-xs font-bold text-[#c44732]"
        >
            {errors.destination}
        </p>
        )}
  </div>

  {/* Travel dates */}
  <div className="grid gap-5 sm:grid-cols-2">
    <div className="grid gap-2">
      <label
        htmlFor="startDate"
        className="text-xs font-extrabold uppercase tracking-[0.1em]"
      >
        Start date
      </label>

      <input
        id="startDate"
        name="startDate"
        type="date"
        aria-invalid={Boolean(errors.startDate)}
            aria-describedby={
            errors.startDate
                ? "start-date-error"
                : undefined
            }
        value={formValues.startDate}
        onChange={handleChange}
        className={fieldStyles}
      />
      {errors.startDate && (
        <p
            id="start-date-error"
            role="alert"
            className="m-0 text-xs font-bold text-[#c44732]"
        >
            {errors.startDate}
        </p>
        )}
    </div>

    <div className="grid gap-2">
      <label
        htmlFor="endDate"
        className="text-xs font-extrabold uppercase tracking-[0.1em]"
      >
        End date
      </label>

      <input
        id="endDate"
        name="endDate"
        type="date"
        value={formValues.endDate}
        onChange={handleChange}
        min={formValues.startDate}
        className={fieldStyles}
      />
    </div>
  </div>

  {/* Budget */}
  <div className="grid gap-2">
    <label
      htmlFor="budget"
      className="text-xs font-extrabold uppercase tracking-[0.1em]"
    >
      Estimated budget
    </label>

    <div className="relative">
      <span
        aria-hidden="true"
        className="
          absolute left-4 top-1/2
          -translate-y-1/2
          text-sm font-bold
          text-[#6f6b7a]
        "
      >
        $
      </span>

      <input
        id="budget"
        name="budget"
        type="number"
        inputMode="decimal"
        min="0"
        step="1"
        aria-invalid={Boolean(errors.budget)}
            aria-describedby={
            errors.budget
                ? "budget-error"
                : undefined
            }
        value={formValues.budget}
        onChange={handleChange}
        placeholder="1500"
        className={`${fieldStyles} pl-9`}
      />
    </div>
    {errors.budget && (
        <p
            id="budget-error"
            role="alert"
            className="m-0 text-xs font-bold text-[#c44732]"
        >
            {errors.budget}
        </p>
        )}
        </div>

            {/* Notes */}
            <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                <label
                    htmlFor="notes"
                    className="text-xs font-extrabold uppercase tracking-[0.1em]"
                >
                    Travel notes
                </label>

                <span className="text-[10px] text-[#6f6b7a]">
                    {formValues.notes.length}/500
                </span>
                </div>

                <textarea
                id="notes"
                name="notes"
                rows={5}
                maxLength={500}
                value={formValues.notes}
                onChange={handleChange}
                placeholder="Add activities, study goals or places you want to visit..."
                className={`${fieldStyles} resize-y`}
                />
                {errors.notes && (
                <p
                    id="notes-error"
                    role="alert"
                    className="m-0 text-xs font-bold text-[#c44732]"
                >
                    {errors.notes}
                </p>
                )}
            </div>
            <button
            type="submit"
            className="
                inline-flex w-full
                items-center justify-between
                rounded-xl border-0
                bg-[#ff7457]
                px-5 py-4

                text-sm font-extrabold
                text-white

                shadow-[0_7px_0_rgba(23,21,46,0.12)]

                transition-all duration-200

                hover:-translate-y-0.5
                hover:bg-[#17152e]

                focus-visible:outline
                focus-visible:outline-[3px]
                focus-visible:outline-[#ff7457]/40
                focus-visible:outline-offset-[3px]

                motion-reduce:transition-none
            "
            >
            Create travel plan
            <span aria-hidden="true">Continue →</span>
            </button>

            {submitMessage && (
            <p
                role="status"
                className="
                m-0 rounded-xl
                border border-[#71d5b4]/40
                bg-[#71d5b4]/15
                px-4 py-3
                text-sm font-bold
                text-[#276b57]
                "
            >
                {submitMessage}
            </p>
            )}
</form>
    </section>
  );
};

export default TravelPlanForm;