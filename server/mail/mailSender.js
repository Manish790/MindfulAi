import nodemailer from 'nodemailer';   

 const mailSender = async (to,subject,text) => {
  console.log("service",process.env.SERVICE);
  console.log("pass",process.env.PASSWORD);
  console.log("user",process.env.EMAIL)
    try{
      console.log("in mail sender");
        const transporter = nodemailer.createTransport({
            host: process.env.SERVICE,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          const mailOptions = {
            from:'CodingWorld - by vineet',
            to: `${to}`,
            subject:`${subject}` ,
            html: `${text}`
          };
          const mailResponse=await transporter.sendMail(mailOptions);
          return mailResponse;
    }catch(err){
        console.log("error in sending email");
    }
}
export { mailSender};
