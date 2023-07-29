document.addEventListener('DOMContentLoaded', function() {
    const signupPage = document.querySelector('.sign-up-page');
    const profilePage = document.querySelector('.profile-page');
    const profileDetails = document.getElementById('profile-details');
    const signupButton = document.getElementById('signup-btn');
    const logoutButton = document.getElementById('logout-btn');
  
   
    signupButton.addEventListener('click', function() {
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const password1 = document.getElementById('password1').value;
      const accessToken = generateAccessToken();
   
      
      const userData = {
        username: username,
        email: email,
        password: password,
        accessToken: accessToken
      };
  
      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify(userData));
  
      // Show signup success message and redirect to profile page
      setTimeout(function() {
        signupPage.style.display = 'none';
        profilePage.style.display = 'block';
        document.querySelector('.line').style.backgroundColor = 'rgb(97,247, 219)';
        displayProfileDetails(userData);
      }, 100);
    });
  
    logoutButton.addEventListener('click', function() {
      // Clear local storage and redirect to signup page
      localStorage.removeItem('user');
      profilePage.style.display = 'none';
      signupPage.style.display = 'block';
      document.querySelector('.line').style.backgroundColor = 'rgb(253, 253, 253)';
      username.value='';
      email.value='';
      password.value='';
      password1.value='';
    });
  
    // Check if the user is logged in on page load
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      signupPage.style.display = 'none';
      profilePage.style.display = 'block';
    //   document.querySelector('.line').style.backgroundColor = 'rgb(97,247, 219)';
      displayProfileDetails(user);
    }
  
    // Function to generate a random 16-byte access token
    function generateAccessToken() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      for (let i = 0; i < 16; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return token;
    }
  
    // Function to display user details on the profile page
    function displayProfileDetails(user) {
      profileDetails.innerHTML = `
        <p><strong>Full Name :</strong> ${user.username}</p>
        <p><strong>Email :</strong> ${user.email}</p>
        <p><strong>Access Token:</strong> ${user.accessToken}</p>
       
      `;
        
    }
  });