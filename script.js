  // Check if user is already logged in
        document.addEventListener('DOMContentLoaded', function() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            const userName = localStorage.getItem('userName');
            const userHandle = localStorage.getItem('userHandle');
            
            if (isLoggedIn === 'true' && userName && userHandle) {
                showHomePage(userName, userHandle);
            } else {
                showAuthPage();
            }
            
            // Add event listeners for Enter key
            document.getElementById('signup-name')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') signUp();
            });
            document.getElementById('signup-email')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') signUp();
            });
            document.getElementById('signup-password')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') signUp();
            });
            document.getElementById('signup-confirm-password')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') signUp();
            });
            
            document.getElementById('signin-email')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') signIn();
            });
            document.getElementById('signin-password')?.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') signIn();
            });
        });

        // Show authentication page
        function showAuthPage() {
            document.getElementById('authPage').style.display = 'flex';
            document.getElementById('homePage').style.display = 'none';
        }

        // Show home page
        function showHomePage(name, handle) {
            document.getElementById('authPage').style.display = 'none';
            document.getElementById('homePage').style.display = 'block';
            document.getElementById('userName').textContent = name;
            document.getElementById('userHandle').textContent = handle;
        }

        // Tab switching functionality
        function switchTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById(tabName + '-tab').classList.add('active');
            
            // Add active class to selected tab
            document.querySelectorAll('.tab').forEach(tab => {
                if (tab.textContent.toLowerCase().includes(tabName)) {
                    tab.classList.add('active');
                }
            });
            
            // Clear any error/success messages
            clearMessages();
        }

        // Clear all error and success messages
        function clearMessages() {
            document.querySelectorAll('.error-message').forEach(msg => {
                msg.style.display = 'none';
            });
            document.querySelectorAll('.success-message').forEach(msg => {
                msg.style.display = 'none';
            });
        }

        // Toggle password visibility
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const toggle = input.nextElementSibling.nextElementSibling;
            
            if (input.type === 'password') {
                input.type = 'text';
                toggle.textContent = 'Hide';
            } else {
                input.type = 'password';
                toggle.textContent = 'Show';
            }
        }

        // Sign up functionality
        function signUp() {
            clearMessages();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const errorElement = document.getElementById('signup-error');
            const successElement = document.getElementById('signup-success');
            
            // Basic validation
            if (!name || !email || !password || !confirmPassword) {
                errorElement.textContent = 'Please fill in all fields.';
                errorElement.style.display = 'block';
                return;
            }
            
            if (password !== confirmPassword) {
                errorElement.textContent = 'Passwords do not match.';
                errorElement.style.display = 'block';
                return;
            }
            
            if (password.length < 8) {
                errorElement.textContent = 'Password must be at least 8 characters long.';
                errorElement.style.display = 'block';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorElement.textContent = 'Please enter a valid email address.';
                errorElement.style.display = 'block';
                return;
            }
            
            // Store user data and show home page
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', name);
            localStorage.setItem('userHandle', '@' + email.split('@')[0]);
            
            successElement.textContent = 'Account created successfully! Redirecting...';
            successElement.style.display = 'block';
            location.href = './Home.html'
            
            // Redirect to home page after successful signup
            setTimeout(() => {
                showHomePage(name, '@' + email.split('@')[0]);
            }, 1500);
        }

        // Sign in functionality
        function signIn() {
            clearMessages();
            
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;
            const errorElement = document.getElementById('signin-error');
            const successElement = document.getElementById('signin-success');
            
            // Basic validation
            if (!email || !password) {
                errorElement.textContent = 'Please fill in all fields.';
                errorElement.style.display = 'block';
                return;
            }
            
            // For demo purposes, accept any email/password
            // In a real app, you would verify with a server
            const name = email.split('@')[0];
            
            // Store user data and show home page
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', name.charAt(0).toUpperCase() + name.slice(1));
            localStorage.setItem('userHandle', '@' + name);
            
            successElement.textContent = 'Signed in successfully! Redirecting...';
            successElement.style.display = 'block';
            
            // Redirect to home page after successful signin
            setTimeout(() => {
                showHomePage(name.charAt(0).toUpperCase() + name.slice(1), '@' + name);
            }, 1500);
        }

        // Social sign in functions
        function signInWithGoogle() {
            // Simulate successful social sign in
            const name = "Google User";
            const handle = "@googleuser";
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', name);
            localStorage.setItem('userHandle', handle);
            
            const successElement = document.getElementById('signin-success') || document.getElementById('signup-success');
            successElement.textContent = 'Signing in with Google... Redirecting...';
            successElement.style.display = 'block';
            
            setTimeout(() => {
                showHomePage(name, handle);
            }, 1500);
        }

        function signInWithApple() {
            // Simulate successful social sign in
            const name = "Apple User";
            const handle = "@appleuser";
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', name);
            localStorage.setItem('userHandle', handle);
            
            const successElement = document.getElementById('signin-success') || document.getElementById('signup-success');
            successElement.textContent = 'Signing in with Apple... Redirecting...';
            successElement.style.display = 'block';
            
            setTimeout(() => {
                showHomePage(name, handle);
            }, 1500);
        }

        // Forgot password functionality
        function forgotPassword() {
            const email = prompt('Please enter your email address to reset your password:');
            if (email) {
                alert(`In a real application, a password reset link would be sent to ${email}`);
            }
        }

        // Logout functionality
        function logout() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userHandle');
            showAuthPage();
        }