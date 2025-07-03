const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUsers() {
  userContainer.innerHTML = '<p>Loading users...</p>';
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Network response was not ok');
    const users = await response.json();

    userContainer.innerHTML = ''; // Clear loading
    users.forEach(user => {
      const { name, email, address } = user;
      const card = document.createElement('div');
      card.classList.add('userCard');
      card.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address.street}, ${address.city}</p>
      `;
      userContainer.appendChild(card);
    });
  } catch (error) {
    userContainer.innerHTML = `<p style="color:red;">Failed to fetch users. Check your connection.</p>`;
    console.error('Fetch error:', error);
  }
}

reloadBtn.addEventListener('click', fetchUsers);

window.addEventListener('load', fetchUsers);