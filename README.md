# Face recognition web app

This is a simple single-page web app written in React. It connects to the Clarifai API to detect faces in pictures submited as URLs by the user. Initially the user must register in order to submit the URLs, after that the user can log in. User sensitive data such as name, email and a hashed password are stored in a PostgreSQL DB; the password is hashed using **bcrypt**. The connection with the Clarifai API (which provides the models used to detect the faces) and the DB is handled through a REST API. Also, as this is a "toy project" there is no email verification and the user can register with anything that resembles an email.

### **Important:**
This app was written as part of a project for a web development course. I have introduced several modifications to the "original" code such as:

- Input validation of the login and input fields before sending the data to the REST API (this can be improved, need to account for every possible type of SQL injection attack).
- A loading spinning wheel that serves to indicate the user that the browser is waiting for the server response.
- Wiggling invalid input format error messages at register and log in.

Lastly, there are several modifications that can be undertaken to make this app more functional, to name a few:

- Finding a way to add a "drag and drop" functionality to the URL entry field, so that the user can submit his own photos from his or her computer.
- Adding a sort of detect photo history for every user.
