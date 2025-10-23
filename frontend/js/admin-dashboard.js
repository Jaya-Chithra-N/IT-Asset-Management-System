const token = localStorage.getItem('token');
if (!token || localStorage.getItem('role') !== 'Admin') window.location.href = 'index.html';

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

// Load Assets (display only)
async function loadAssets() {
  const res = await fetch('http://localhost:5000/api/assets', { headers: { Authorization: `Bearer ${token}` } });
  const assets = await res.json();
  const container = document.getElementById('assetsList');
  container.innerHTML = `
    <h3>Existing Assets</h3>
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Category</th><th>Serial</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${assets.map(a => `
          <tr>
            <td>${a.asset_id}</td>
            <td>${a.name}</td>
            <td>${a.type || ''}</td>
            <td>${a.category || ''}</td>
            <td>${a.serial_number || ''}</td>
            <td>${a.status}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

// Load Users (display only)
async function loadUsers() {
  const res = await fetch('http://localhost:5000/api/users', { headers: { Authorization: `Bearer ${token}` } });
  const users = await res.json();
  const container = document.getElementById('usersList');
  container.innerHTML = `
    <h3>Existing Users</h3>
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Department</th></tr>
      </thead>
      <tbody>
        ${users.map(u => `
          <tr>
            <td>${u.user_id}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>${u.department || ''}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

// Load Assignments (display only)
async function loadAssignments() {
  const res = await fetch('http://localhost:5000/api/assignments', { headers: { Authorization: `Bearer ${token}` } });
  const assignments = await res.json();
  const container = document.getElementById('assignmentsList');
  container.innerHTML = `
    <h3>Assignments</h3>
    <table>
      <thead>
        <tr><th>ID</th><th>User</th><th>Asset</th><th>Assigned On</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${assignments.map(a => `
          <tr>
            <td>${a.assignment_id}</td>
            <td>${a.user_name}</td>
            <td>${a.asset_name}</td>
            <td>${a.assigned_date}</td>
            <td>${a.assignment_status}</td>
          </tr>`).join('')}
          
      </tbody>
    </table>`;
}

// Load all sections
loadUsers();
loadAssets();
loadAssignments();
