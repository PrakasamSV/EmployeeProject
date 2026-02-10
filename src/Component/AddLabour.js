import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Add() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [place, setPlace] = useState("");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 Load data for Edit
  useEffect(() => {
    if (id) {
      const labours = JSON.parse(localStorage.getItem("labours")) || [];
      const labour = labours.find(l => l.id === id);

      if (labour) {
        setName(labour.name);
        setPosition(labour.position);
        setSalary(labour.salary);
        setPlace(labour.place);
      }
    }
  }, [id]);

  // 🔹 Validate single field (live)
  function validateField(field, value) {
    let message = "";

    if (!value.trim()) {
      message = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    if (field === "salary" && value && isNaN(value)) {
      message = "Salary must be a number";
    }

    setErrors(prev => ({ ...prev, [field]: message }));
  }

  // 🔹 Validate all on save
  function validateForm() {
    validateField("name", name);
    validateField("position", position);
    validateField("salary", salary);
    validateField("place", place);

    return (
      name.trim() &&
      position.trim() &&
      place.trim() &&
      salary.trim() &&
      !isNaN(salary)
    );
  }

  function Save(e) {
    e.preventDefault();

    setTouched({
      name: true,
      position: true,
      salary: true,
      place: true
    });

    if (!validateForm()) return;

    let labours = JSON.parse(localStorage.getItem("labours")) || [];

    if (id) {
      labours = labours.map(l =>
        l.id === id ? { ...l, name, position, salary, place } : l
      );
    } else {
      labours.push({
        id: crypto.randomUUID(),
        name,
        position,
        salary,
        place
      });
    }

    localStorage.setItem("labours", JSON.stringify(labours));
    navigate("/");
  }

  function Cancel() {
    navigate("/");
  }

  return (
  <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div className="row w-100 justify-content-center">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-lg border-0">

          {/* Header */}
          <div className="card-header bg-primary text-white text-center py-3">
            <h4 className="mb-0">
              {id ? "Edit Labour" : "Add Labour"}
            </h4>
          </div>

          {/* Body */}
          <div className="card-body p-4 p-md-5">
            <form onSubmit={Save} noValidate>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  className={`form-control ${
                    touched.name && errors.name ? "is-invalid" : ""
                  }`}
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    setTouched(prev => ({ ...prev, name: true }));
                    validateField("name", e.target.value);
                  }}
                />
                {touched.name && errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* Position */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Position</label>
                <input
                  className={`form-control ${
                    touched.position && errors.position ? "is-invalid" : ""
                  }`}
                  value={position}
                  onChange={e => {
                    setPosition(e.target.value);
                    setTouched(prev => ({ ...prev, position: true }));
                    validateField("position", e.target.value);
                  }}
                />
                {touched.position && errors.position && (
                  <div className="invalid-feedback">{errors.position}</div>
                )}
              </div>

              {/* Salary */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Salary</label>
                <input
                  className={`form-control ${
                    touched.salary && errors.salary ? "is-invalid" : ""
                  }`}
                  value={salary}
                  onChange={e => {
                    setSalary(e.target.value);
                    setTouched(prev => ({ ...prev, salary: true }));
                    validateField("salary", e.target.value);
                  }}
                />
                {touched.salary && errors.salary && (
                  <div className="invalid-feedback">{errors.salary}</div>
                )}
              </div>

              {/* Place */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Place</label>
                <input
                  className={`form-control ${
                    touched.place && errors.place ? "is-invalid" : ""
                  }`}
                  value={place}
                  onChange={e => {
                    setPlace(e.target.value);
                    setTouched(prev => ({ ...prev, place: true }));
                    validateField("place", e.target.value);
                  }}
                />
                {touched.place && errors.place && (
                  <div className="invalid-feedback">{errors.place}</div>
                )}
              </div>

              {/* Buttons */}
              <div className="d-grid d-sm-flex gap-2">
                <button className="btn btn-primary w-100" type="submit">
                  Save
                </button>
                <button
                  className="btn btn-outline-secondary w-100"
                  type="button"
                  onClick={Cancel}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default Add;
