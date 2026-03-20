import { useState } from 'react';

function AddProgramForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({ name: '', notes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div style={{
      border: '2px solid #4CAF50',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 10px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Create New Program</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Program Name</label>
          <input
            type="text"
            placeholder="e.g., Push Day"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          ></input>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontWeight: 'bold' }}> Notes (Optional)</label>
          <textarea
            placeholder="Focus on progressive overload..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Save Program
          </button>

          <button
            type="button"
            onClick={onCancel}
            style={{ background: 'none', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddProgramForm;
