let users = [];

const showUsers = () => {
  let str = `<h4>Registered Users:</h4>`;

  if (users.length == 0) {
    return "<p>No Users Registered</p>";
  }

  users.forEach((user) => {
    str += ` <section>
          <h4>Name: ${user.name}</h4>
          <p>Email: ${user.email}</p>
          <p>Password: ${user.password}</p>
          <p>Balance: ${user.balance}</p>
      </section>
    `;
  });

  return str;
};

const loginForm = () => {
  const str = `
      <div class="flex-container">
        <section>
          <div class="form">
              <h3>Login Form</h3>
              <p class="error-msg" id="error-msg"></p>
              <input type="email" placeholder="Email" id="txtEmail" />
              <input type="password" placeholder="Password" id="txtPassword"/>
              <button type="submit" onclick="validateUser()">Submit</button>
          </div>
          <p>
              Don't have an account?
              <span onclick="registerForm()" class="link">Create Account</span>
          </p>
        </section>

        <div class="user-list">
          ${showUsers()}
        </div>
      </div>
        
    `;

  root.innerHTML = str;
};

const validateUser = () => {
  let email = document.getElementById("txtEmail").value;
  let password = document.getElementById("txtPassword").value;

  const userExists = users.find(
    (u) => u.email === email && u.password === password
  );

  if (userExists) {
    showHome();
  } else {
    document.getElementById("error-msg").innerText = "Invalid Credentials";
  }
};

const registerForm = () => {
  const str = `
        <div class="form" >
            <h3>Registration Form</h3>
            <input type="text" placeholder="Name" id="txtName" />
            <input type="email" placeholder="Email" id="txtEmail" />
            <input type="password" placeholder="Password" id="txtPassword" />
            <button type="submit" onclick="saveUser()">Submit</button>
        </div>
        
        <p>
            Already have an account?
            <span class="link" onclick="loginForm()">Login here</span>
        </p>
    `;

  root.innerHTML = str;
};

const saveUser = () => {
  let name = document.getElementById("txtName").value;
  let email = document.getElementById("txtEmail").value;
  let password = document.getElementById("txtPassword").value;

  users.push({ name, email, password, balance: 1000 });
  console.log(users);

  loginForm();
};

const showHome = () => {
  const str = `
    <h2>Welcome</h2>
    <p><button onclick='loginForm()'>Logout</button></p>
    `;

  root.innerHTML = str;
};
