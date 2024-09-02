document.getElementById('toggleForm').addEventListener('click', function() {
    const loginForm = document.getElementById('loginForm');
    const signUpForm = document.getElementById('signUpForm');
    const toggleButton = document.getElementById('toggleForm');

    if (signUpForm.style.display === 'none') {
        loginForm.style.display = 'none';
        signUpForm.style.display = 'block';
        toggleButton.textContent = 'Already have an account? Login';
    } else {
        signUpForm.style.display = 'none';
        loginForm.style.display = 'block';
        toggleButton.textContent = "Don't have an account? Sign Up";
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Login failed');
        }

        const result = await response.json();
        document.getElementById('message').textContent = 'Login successful! Welcome, ' + result.username;

        localStorage.setItem('token', result.token);
        
    } catch (error) {
        document.getElementById('message').textContent = error.message;
    }
});

document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    try {
        const response = await fetch('http://localhost:5001/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Sign-up failed');
        }

        const result = await response.json();
        document.getElementById('message').textContent = 'Sign-up successful! Please log in, ' + result.username;
        document.getElementById('signUpForm').reset();
        document.getElementById('toggleForm').click(); // Switch to login form
    } catch (error) {
        document.getElementById('message').textContent = error.message;
    }
});
