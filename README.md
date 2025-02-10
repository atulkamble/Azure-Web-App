# Azure-Web-App

To deploy a scalable web application on **Azure** (using **Node.js**, **Azure App Service**, **Azure SQL Database**, and **Azure DevOps CI/CD Pipelines**) with **App Insights** for monitoring, follow these steps:

---

### **1. Deploying a Node.js Application on Azure App Service with Azure SQL Database**

#### Prerequisites:
- An **Azure account** (if you don't have one, you can create one on [Azure](https://azure.microsoft.com/en-us/free/)).
- **Node.js** installed locally.
- **Azure CLI** installed.
- **Git** installed (for version control).
- **Azure SQL Database** provisioned.
- **Visual Studio Code** or another text editor.

#### Steps:

##### **Step 1: Create Azure Resources**
1. **Create an Azure App Service:**
   - Go to the **Azure Portal** and search for **App Service**.
   - Click **+ Create**.
   - Choose a **Subscription**, **Resource Group**, and **Region**.
   - Enter a **name** for the app (e.g., `your-app-name`).
   - Choose the **Runtime stack** as **Node.js** and the **Operating System** (Linux or Windows).
   - Set the **App Service Plan** based on the size you want.
   - Click **Review + Create** and then **Create**.

2. **Create Azure SQL Database:**
   - Go to the **Azure Portal** and search for **SQL databases**.
   - Click **+ Create**.
   - Choose the **Subscription**, **Resource Group**, and **Region**.
   - Create a **SQL server** (or use an existing one) with a unique server name, admin username, and password.
   - Create a new **SQL database** with a name (e.g., `your-db-name`).
   - Click **Review + Create** and then **Create**.

##### **Step 2: Prepare Your Node.js Application**

1. **Initialize a Node.js Project**:
   - In your terminal, create a new directory and initialize your Node.js project.
     ```bash
     mkdir your-app
     cd your-app
     npm init -y
     ```
2. **Install Dependencies** (Express, SQL client, etc.):
   ```bash
   npm install express mssql dotenv
   ```
3. **Create your `app.js` file**:
   ```javascript
   const express = require('express');
   const sql = require('mssql');
   const app = express();
   const port = process.env.PORT || 3000;

   // Connect to Azure SQL Database
   const config = {
     user: 'mywebapp-server-admin',
     password: 'N7lZDxc$wht9O$jk',
     server: 'mywebapp-server.database.windows.net',
     database: 'mywebapp-database',
     options: {
       encrypt: true, // Use encryption
       trustServerCertificate: false, // Use SSL certificate
     },
   };

   sql.connect(config)
     .then(() => console.log('Connected to Azure SQL Database'))
     .catch(err => console.error('SQL Connection Error:', err));

   app.get('/', (req, res) => {
     res.send('Hello, Azure!');
   });

   app.listen(port, () => {
     console.log(`App running on port ${port}`);
   });
   ```

4. **Create a `.env` file** to store sensitive information like database credentials.
   ```
   DB_USER=your-db-username
   DB_PASSWORD=your-db-password
   DB_SERVER=your-db-server.database.windows.net
   DB_NAME=your-db-name
   ```

##### **Step 3: Deploy to Azure App Service**

1. **Login to Azure CLI**:
   ```bash
   az login
   ```

2. **Deploy the Node.js app using Git**:
   - In the **Azure Portal**, go to your App Service, and under **Deployment Center**, configure **GitHub** or **Local Git** deployment.
   - If you choose **Local Git**, you'll be given a Git URL (e.g., `your-app-name.scm.azurewebsites.net`).
   - Add this URL as a remote to your local repository and push your changes:
     ```bash
     git remote add azure your-app-name.scm.azurewebsites.net
     git push azure master
     ```

3. **Verify Deployment**:
   - Go to the **App Service** in the **Azure Portal** and check the **URL** (e.g., `https://your-app-name.azurewebsites.net`).
   - Open the URL to check if your app is running successfully.

---

### **2. Automate Deployment via Azure DevOps CI/CD Pipelines**

#### Steps:

##### **Step 1: Create an Azure DevOps Project**

1. Go to **[Azure DevOps](https://dev.azure.com/)** and sign in.
2. Click **New Project**.
3. Give your project a name and select **Visibility** (private or public), then click **Create**.

##### **Step 2: Configure GitHub for Azure DevOps Pipelines**

1. In your **Azure DevOps** project, go to **Pipelines** > **Create Pipeline**.
2. Choose **GitHub** as the source, sign in, and select the repository where your Node.js app is hosted.
3. Select **Node.js** from the available templates (Azure DevOps will auto-generate the YAML file).

##### **Step 3: Configure Pipeline YAML File**:

Here is a sample `azure-pipelines.yml` file:

```yaml
trigger:
  branches:
    include:
      - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: UseNode@2
    inputs:
      versionSpec: '14.x'
      addToPath: true

  - task: Npm@1
    inputs:
      command: 'install'

  - task: Npm@1
    inputs:
      command: 'run build'  # If you have a build script

  - task: AzureWebApp@1
    inputs:
      azureSubscription: 'Your-Azure-Subscription'
      appName: 'your-app-name'
      package: '$(System.DefaultWorkingDirectory)/**/*.zip'
```

##### **Step 4: Commit YAML File and Run the Pipeline**

1. Commit the `azure-pipelines.yml` file to your repository.
2. Azure DevOps will automatically trigger the pipeline and deploy your Node.js app to **Azure App Service**.

---

### **3. Configure App Insights for Monitoring**

#### Steps:

1. In **Azure Portal**, go to your **App Service**.
2. Under the **Monitoring** section, click on **Application Insights**.
3. Click **Enable** to create a new Application Insights resource.
4. Choose a region and click **Create**.
5. **Configure Application Insights** in your Node.js app:
   ```bash
   npm install applicationinsights
   ```

   Add the following code to your `app.js`:
   ```javascript
   const appInsights = require('applicationinsights');
   appInsights.setup('your-instrumentation-key').start();
   ```

   - Replace `'your-instrumentation-key'` with the key from your App Insights resource.
6. Deploy the updated code to **Azure App Service** via Git or DevOps pipeline.
7. Visit the **Application Insights** section in the **Azure Portal** to monitor performance, errors, and other telemetry.

---

### **Summary:**
1. Deploy a scalable Node.js app on **Azure App Service** with **Azure SQL Database** for data storage.
2. Set up **Azure DevOps CI/CD pipelines** to automate deployments.
3. Integrate **App Insights** for monitoring and troubleshooting.

This approach ensures your application is scalable, monitored, and automatically updated when changes are made to the codebase. Would you like any additional clarifications on these steps?
