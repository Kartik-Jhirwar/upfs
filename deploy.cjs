const { exec } = require('child_process');
const path = require('path');

const deploy = () => {
  exec(
    `git add dist && git commit -m "Deploy to GitHub Pages" && git subtree push --prefix dist origin gh-pages`,
    { cwd: path.resolve(__dirname) },
    (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Error: ${stderr || err}`);
      } else {
        console.log(`✅ Deployment complete: ${stdout}`);
      }
    }
  );
};

deploy();
