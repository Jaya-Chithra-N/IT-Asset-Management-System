const token = localStorage.getItem('token');
if (!token || localStorage.getItem('role') !== 'Admin') window.location.href='index.html';

// ===================== ASSETS =====================
async function loadAssets(){
  const res = await fetch('http://localhost:5000/api/assets',{headers:{Authorization:`Bearer ${token}`}});
  const assets = await res.json();
  const container = document.getElementById('assetsList');
  container.innerHTML = `
    <h3>Existing Assets</h3>
    <table>
      <tr><th>ID</th><th>Name</th><th>Type</th><th>Category</th><th>Serial</th><th>Status</th><th>Actions</th></tr>
    </table>`;
  const table = container.querySelector('table');
  assets.forEach(a=>{
    const row = table.insertRow();
    row.insertCell(0).innerText = a.asset_id;
    row.insertCell(1).innerHTML = `<input type="text" value="${a.name}" id="assetName-${a.asset_id}">`;
    row.insertCell(2).innerHTML = `<input type="text" value="${a.type||''}" id="assetType-${a.asset_id}">`;
    row.insertCell(3).innerHTML = `<input type="text" value="${a.category||''}" id="assetCat-${a.asset_id}">`;
    row.insertCell(4).innerHTML = `<input type="text" value="${a.serial_number||''}" id="assetSerial-${a.asset_id}">`;
    row.insertCell(5).innerHTML = `
      <select id="assetStatus-${a.asset_id}">
        <option value="Available" ${a.status==='Available'?'selected':''}>Available</option>
        <option value="Assigned" ${a.status==='Assigned'?'selected':''}>Assigned</option>
        <option value="Maintenance" ${a.status==='Maintenance'?'selected':''}>Maintenance</option>
      </select>`;
    row.insertCell(6).innerHTML = `<button onclick="updateAsset(${a.asset_id})">Update</button>`;
  });
}

// Create Asset
document.getElementById('createAssetForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const name = document.getElementById('assetName').value;
  const type = document.getElementById('assetType').value;
  const category = document.getElementById('assetCategory').value;
  const serial_number = document.getElementById('assetSerial').value;
  const purchase_date = document.getElementById('assetPurchase').value;
  const warranty_end = document.getElementById('assetWarranty').value;
  const status = document.getElementById('assetStatus').value;

  const res = await fetch('http://localhost:5000/api/assets',{
    method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
    body:JSON.stringify({name,type,category,serial_number,purchase_date,warranty_end,status})
  });
  const data = await res.json();
  if(res.ok){ alert('Asset added!'); document.getElementById('createAssetForm').reset(); loadAssets(); }
  else alert(data.message);
});

// Update Asset
async function updateAsset(asset_id){
  const name = document.getElementById(`assetName-${asset_id}`).value;
  const type = document.getElementById(`assetType-${asset_id}`).value;
  const category = document.getElementById(`assetCat-${asset_id}`).value;
  const serial_number = document.getElementById(`assetSerial-${asset_id}`).value;
  const status = document.getElementById(`assetStatus-${asset_id}`).value;

  const res = await fetch(`http://localhost:5000/api/assets/${asset_id}`,{
    method:'PUT', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
    body:JSON.stringify({name,type,category,serial_number,status})
  });
  const data = await res.json();
  if(res.ok) alert('Asset updated!'); else alert(data.message);
  loadAssets();
}

// Load initially
loadAssets();
