# Teyvat Commission Board Backend API Server
This repository houses the backend API server for the Teyvat Commission Board project. The server facilitates communication with the NoSQL Firestore database. While the current configuration connects to a closed Firestore database, you can seamlessly switch to your own database by modifying the configurations in the designated file.

## Connecting to Your Own Firestore Database
To configure the server to connect to your own Firestore database, follow these steps:

1. Clone this repository to your local machine.

2. Navigate to the cloned repository using your terminal and install the required Node.js modules by executing npm i.

3. Open the lib/init-firebase.js file in your preferred code editor.

4. Replace the existing configuration in the firebaseConfig variable with your Firebase project's configuration. Copy and paste the firebaseConfig code provided by your Firebase database. The code structure should resemble the following:

`
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};
`
5. After updating the configuration, save the file.

6. Set up the server by running the command npm run dev in your terminal.

7. To ensure everything is functioning as expected, test the API using a tool like Postman.

Feel free to explore, modify, and utilize the backend API server for your own needs. If you encounter any issues or need further assistance, don't hesitate to reach out.

Please check out [Teyvat Commission Board](https://github.com/ChenElla/teyvat-commission-board) for its frontend application.


