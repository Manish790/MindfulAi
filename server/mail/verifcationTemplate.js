const otpTemplate = (otp) => {  
    return `
    <!DOCTYPE html>
    <html>
    <head>
        
        <meta charset="UTF-8">
        <title>Verification Email</title>
        <style>
            body {
                background-color: #f1f1f1;
            }
            .container {
                width: 60%;
                margin: auto;
                background-color: white;
                padding: 20px;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>  
        <div class="container">
            <h1>OTP for Verification</h1>
            <p>Use this OTP to verify your email address</p>
            <h2>${otp}</h2>
        </div>
    </body>
    </html>
    `;
};
export default otpTemplate;
