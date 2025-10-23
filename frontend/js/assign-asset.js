const token = localStorage.getItem('token');
if (!token || localStorage.getItem('role') !== 'Admin') window.location.href='index.html';

// ===================== ASSIGNMENTS =====================
async function loadAssignments() {
  // Fetch all users
  const userRes = await fetch('http://localhost:5000/api/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const users = await userRes.json();
  
  // Populate user dropdown
  const assignUserSelect = document.getElementById('assignUser');
  assignUserSelect.innerHTML = users.map(u => `<option value="${u.user_id}">${u.name}</option>`).join('');

  // Fetch all assets
  const assetRes = await fetch('http://localhost:5000/api/assets', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const assets = await assetRes.json();
  
  // Populate asset dropdown with only available assets
  const assignAssetSelect = document.getElementById('assignAsset');
  assignAssetSelect.innerHTML = assets
    .filter(a => a.status === 'Available')
    .map(a => `<option value="${a.asset_id}">${a.name}</option>`)
    .join('');

  // Fetch current assignments to display
  const assignRes = await fetch('http://localhost:5000/api/assignments', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const assignments = await assignRes.json();
  const container = document.getElementById('assignmentsList');
  container.innerHTML = `
    <h3>Assigned Assets</h3>
    <ul>
      ${assignments.map(a => `<li>${a.asset_name} - ${a.user_name} - ${a.assignment_status}</li>`).join('')}
    </ul>
  `;
}

// Assign Asset
document.getElementById('assignForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const user_id = document.getElementById('assignUser').value;
  const asset_id = document.getElementById('assignAsset').value;
  const res = await fetch('http://localhost:5000/api/assignments',{
    method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
    body:JSON.stringify({user_id,asset_id})
  });
  const data = await res.json();
  if(res.ok){ alert('Asset assigned!'); loadAssignments(); loadAssets(); }
  else alert(data.message);
});

// Load initially
loadAssignments();
