 const loginPage = document.getElementById('loginPage');
        const appContainer = document.getElementById('appContainer');
        const signupModal = document.getElementById('signupModal');
        const loginModal = document.getElementById('loginModal');
        const signupForm = document.getElementById('signupForm');
        const loginForm = document.getElementById('loginForm');
        const createAccountBtn = document.getElementById('createAccount');
        const signInBtn = document.getElementById('signIn');
        const closeSignup = document.getElementById('closeSignup');
        const closeLogin = document.getElementById('closeLogin');
        const errorMessage = document.getElementById('errorMessage');

        // Check if user is already logged in
        document.addEventListener('DOMContentLoaded', function () {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log("currentUser ==>", currentUser);

            if (currentUser) {
                location = "./Home.html"
            } else {
                showLogin();
            }
        });

        // Show login page
        function showLogin() {
            loginPage.style.display = 'flex';
            appContainer.style.display = 'none';
        }

        // Show app
        function showApp() {
            console.log("Me chala");

            loginPage.style.display = 'none';
            appContainer.style.display = 'block';
        }

        // Show signup modal
        createAccountBtn.addEventListener('click', function () {
            signupModal.style.display = 'block';
        });

        // Show login modal
        signInBtn.addEventListener('click', function () {
            loginModal.style.display = 'block';
        });

        // Close modals
        closeSignup.addEventListener('click', function () {
            signupModal.style.display = 'none';
            clearError();
        });

        closeLogin.addEventListener('click', function () {
            loginModal.style.display = 'none';
            clearError();
        });

        // Handle signup form submission
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const username = document.getElementById('signupUsername').value;

            // Check if user already exists
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = existingUsers.some(user =>
                user.email === email || user.username === username
            );

            if (userExists) {
                showError('User with this email or username already exists');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                username,
                joinedDate: new Date().toISOString()
            };

            // Save user to localStorage
            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // Log the user in
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            // Close modal and redirect to Home.html (YEH LINE ADD KARO)
            signupModal.style.display = 'none';
            window.location.href = './Home.html';  // <- SIGN UP KE LIYE BHI YEH LINE ADD KARO
            clearForm(signupForm);
        });

        // Handle login form submission
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const identifier = document.getElementById('loginIdentifier').value;
            const password = document.getElementById('loginPassword').value;

            // Find user
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = existingUsers.find(user =>
                (user.email === identifier || user.username === identifier) &&
                user.password === password
            );

            console.log("user ==>", user)
            console.log("identifier ==>", identifier);
            console.log("password ==>", password);


            if (user) {
                // Log the user in
                localStorage.setItem('currentUser', JSON.stringify(user));

                // Close modal and redirect to Home.html
                loginModal.style.display = 'none';
                window.location.href = './Home.html';
                clearForm(loginForm);
                clearError();
            } else {
                showError('Invalid email/username or password');
            }
        });

        // Logout function
        function logout() {
            localStorage.removeItem('currentUser');
            window.location.href = './signin.html';
        }

        // Helper functions
        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }

        function clearError() {
            errorMessage.style.display = 'none';
        }

        function clearForm(form) {
            form.reset();
        }

        // Profile dropdown functionality
        const profileDropdown = document.getElementById('profileDropdown');
        const logoutDropdown = document.getElementById('logoutDropdown');

        // Toggle dropdown on profile click
        profileDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
            logoutDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function () {
            logoutDropdown.classList.remove('show');
        });

        // Prevent dropdown from closing when clicking inside it
        logoutDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Logout function
        function logout() {
            // Clear user data from localStorage
            localStorage.removeItem('currentUser');
            localStorage.removeItem('users');

            // Redirect to signin page
            window.location.href = './signin.html';
        }

        // Update profile info with current user data
        document.addEventListener('DOMContentLoaded', function () {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                // Update profile information
                const profileName = document.querySelector('.userprofile .p2 div:first-child');
                const profileUsername = document.querySelector('.userprofile .p2 div:last-child');

                if (profileName && profileUsername) {
                    profileName.textContent = currentUser.name || 'Showzib tanveer';
                    profileUsername.textContent = `@${currentUser.username || 'showzib'}`;
                }

                // Update logout text with username
                const logoutOption = document.querySelector('.logout-option.logout');
                if (logoutOption) {
                    logoutOption.textContent = `Log out @${currentUser.username || 'showzib'}`;
                }
            }
        });