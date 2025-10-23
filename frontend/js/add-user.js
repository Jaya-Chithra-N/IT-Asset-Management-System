const token = localStorage.getItem('token');
if (!token || localStorage.getItem('role') !== 'Admin') window.location.href='index.html';

// ===================== USERS =====================
async function loadUsers() {
  const res = await fetch('http://localhost:5000/api/users', {headers:{Authorization:`Bearer ${token}`}});
  const users = await res.json();
  const container = document.getElementById('usersList');
  container.innerHTML = `
    <h3>Existing Users</h3>
    <table>
      <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Actions</th></tr>
    </table>`;
  const table = container.querySelector('table');
  users.forEach(u=>{
    const row = table.insertRow();
    row.insertCell(0).innerText = u.user_id;
    row.insertCell(1).innerHTML = `<input type="text" value="${u.name}" id="name-${u.user_id}">`;
    row.insertCell(2).innerHTML = `<input type="email" value="${u.email}" id="email-${u.user_id}">`;
    row.insertCell(3).innerHTML = `
      <select id="role-${u.user_id}">
        <option value="Admin" ${u.role==='Admin'?'selected':''}>Admin</option>
        <option value="Employee" ${u.role==='Employee'?'selected':''}>Employee</option>
      </select>`;
    row.insertCell(4).innerHTML = `<input type="text" value="${u.department||''}" id="dept-${u.user_id}">`;
    row.insertCell(5).innerHTML = `
      <button onclick="updateUser(${u.user_id})">Update</button>
      <button onclick="deleteUser(${u.user_id})">Delete</button>`;
  });
}

// Create User
document.getElementById('createUserForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const name = document.getElementById('newName').value;
  const email = document.getElementById('newEmail').value;
  const password = document.getElementById('newPassword').value;
  const role = document.getElementById('newRole').value;
  const department = document.getElementById('newDept').value;
  const res = await fetch('http://localhost:5000/api/auth/signup',{
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name,email,password,role,department})
  });
  const data = await res.json();
  if(res.ok){ alert('User created!'); document.getElementById('createUserForm').reset(); loadUsers(); }
  else alert(data.message);
});

// Update User
async function updateUser(user_id){
  const name = document.getElementById(`name-${user_id}`).value;
  const email = document.getElementById(`email-${user_id}`).value;
  const role = document.getElementById(`role-${user_id}`).value;
  const department = document.getElementById(`dept-${user_id}`).value;
  const res = await fetch(`http://localhost:5000/api/users/${user_id}`,{
    method:'PUT', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
    body:JSON.stringify({name,email,role,department})
  });
  const data = await res.json();
  if(res.ok) alert('User updated!'); else alert(data.message);
  loadUsers();
}

// Delete User
async function deleteUser(user_id){
  if(!confirm('Delete this user?')) return;
  const res = await fetch(`http://localhost:5000/api/users/${user_id}`,{
    method:'DELETE', headers:{Authorization:`Bearer ${token}`}
  });
  const data = await res.json();
  if(res.ok) alert(data.message); else alert(data.message);
  loadUsers();
}

// Load initially
loadUsers();
