const confessMailSingle = (data) => {  
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
            <h1>Confession from Ypur Crush</h1>
            <p>Find the Attached Details of Crush And Make a Mpe</p>
            <h2>${data.name}</h2>
        </div>
    </body>
    </html>
    `;
};
export default confessMailSingle ;
