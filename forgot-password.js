const auth = firebase.auth();

document.getElementById('resetPasswordBtn').addEventListener('click', function () {
    const email = document.getElementById('forgotEmail').value;
    const userId = document.getElementById('forgotUserId').value;
    const securityAnswer = document.getElementById('securityQuestion').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMsg = document.getElementById('errorMsg');

    if (!email || !userId || !securityAnswer || !newPassword || !confirmPassword) {
        errorMsg.textContent = 'Please fill in all fields.';
        return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        errorMsg.textContent = 'Password must be at least 8 characters, include a letter, a number, and a special character.';
        return;
    }

    if (newPassword !== confirmPassword) {
        errorMsg.textContent = 'Passwords do not match.';
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(function () {
            errorMsg.textContent = 'Password reset email sent! Check your inbox.';
        })
        .catch(function (error) {
            console.error(error);
            errorMsg.textContent = error.message;
        });
});
