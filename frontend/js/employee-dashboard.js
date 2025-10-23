// Employee Dashboard Script

const token = localStorage.getItem('token');
if (!token) {
  alert('You are not logged in!');
  window.location.href = '../html/index.html';
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = '../html/index.html';
});

// Return asset
async function returnAsset(assignment_id) {
  if (!confirm('Are you sure you want to return this asset?')) return;
  try {
    const res = await fetch(`http://localhost:5000/api/assignments/return/${assignment_id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      loadMyAssets();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert('Error returning asset');
  }
}

// Load assets assigned to employee
async function loadMyAssets() {
  try {
    const res = await fetch('http://localhost:5000/api/assignments/my-assets', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const assets = await res.json();
    const tbody = document.querySelector('#myAssetsTable tbody');
    tbody.innerHTML = '';

    if (assets.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6">No assets assigned</td></tr>`;
      return;
    }

    assets.forEach(a => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${a.asset_id}</td>
        <td>${a.name}</td>
        <td>${a.type || ''}</td>
        <td>${a.category || ''}</td>
        <td>${a.assignment_status}</td>
        <td>
          <button onclick="returnAsset(${a.assignment_id})">Return</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    alert('Error loading assets');
  }
}

// Initialize
loadMyAssets();
