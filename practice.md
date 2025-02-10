### **Installing Git on Different OS**
#### **Amazon Linux / CentOS / RHEL**
```sh
sudo yum install git -y
```

#### **Ubuntu / Debian**
```sh
sudo apt update
sudo apt install git -y
```

#### **Windows**
1. Download Git from [Git for Windows](https://git-scm.com/downloads).
2. Run the installer and follow the setup instructions.
3. Verify installation:
   ```sh
   git --version
   ```

---

### **Basic Git Commands Revision**
#### **Configuration**
```sh
git config --global user.name "Atul Kamble"
git config --global user.email "your-email@example.com"
git config --list  # Check Git configuration
```

#### **Initializing and Cloning a Repository**
```sh
git init  # Initialize a new Git repository
git clone <repository_url>  # Clone an existing repository
```

#### **Staging and Committing**
```sh
git status  # Check the status of changes
git add .  # Stage all changes
git commit -m "Initial commit"  # Commit changes
```

#### **Branching and Merging**
```sh
git branch  # List branches
git branch feature-branch  # Create a new branch
git checkout feature-branch  # Switch to the branch
git merge feature-branch  # Merge changes into the main branch
```

#### **Pushing and Pulling**
```sh
git remote add origin <repository_url>  # Add a remote repository
git push origin main  # Push changes to remote
git pull origin main  # Pull changes from remote
```

#### **Undoing Changes**
```sh
git reset --soft HEAD~1  # Undo the last commit (keep changes)
git reset --hard HEAD~1  # Undo the last commit (discard changes)
git checkout -- <file>  # Discard local changes to a file
```

#### **Tagging**
```sh
git tag -a v1.0 -m "Version 1.0"  # Create an annotated tag
git push origin v1.0  # Push tag to remote
```

---

### **Basic Node.js Practice**
#### **Install Node.js on Amazon Linux / Ubuntu**
```sh
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs  # Ubuntu/Debian

sudo yum install -y nodejs  # Amazon Linux/RHEL
```
Verify installation:
```sh
node -v
npm -v
```

#### **Create a Simple Node.js App**
```sh
mkdir my-node-app && cd my-node-app
npm init -y  # Initialize a package.json file
```

#### **Create `index.js` File**
```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Node.js!');
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

#### **Run the App**
```sh
node index.js
```

Let me know if you need further details! 🚀
