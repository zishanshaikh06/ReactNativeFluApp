export const questions = () =>
  fetch(
    "http://ec2-18-217-238-241.us-east-2.compute.amazonaws.com:3000/questions"
  )
    .then(res => res.json)
    .then(responseJSON => {
      return responseJSON;
    });

export default questions;
