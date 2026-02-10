import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LabourDetails() {
  const navigate = useNavigate();

  const [input, setInput] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const labours = JSON.parse(localStorage.getItem("labours")) || [];
    setInput(labours);
  }, []);

  function Edit(id) {
    navigate(`/addlabour/${id}`);
  }

  function Delete(id) {
    setDeleteId(id);
    setShowConfirm(true);
  }

  // 🔹 Confirm delete
  function confirmDelete() {
    const labours = JSON.parse(localStorage.getItem("labours")) || [];
    const updatedLabours = labours.filter(l => l.id !== deleteId);

    localStorage.setItem("labours", JSON.stringify(updatedLabours));
    setInput(updatedLabours);

    setShowConfirm(false);
    setDeleteId(null);
  }

  function Save() {
    navigate("/addlabour");
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="p-3  text-black rounded">
          Labour Details
        </h4>
        <button className="btn btn-success" onClick={Save}>
          Add Labour
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Place</th>
              <th style={{ width: "150px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {input.length > 0 ? (
              input.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.position}</td>
                  <td>₹{user.salary}</td>
                  <td>{user.place}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => Edit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => Delete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showConfirm && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this labour?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirm && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default LabourDetails;
