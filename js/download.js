function downloadResumeFromGDrive () {
    let url = "";
    fetch(url).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", "AravindAPG.pdf");
            a.click();
        }
        );
    });
}

let repos = document.getElementById("repoCount");

function getGithubProfile(){
    const username = 'aravind-govindhasamy';
    fetch(`https://api.github.com/users/${username}`)
  .then(response =>response.json())
  .then(data => {
    repos.innerHTML = data.public_repos;
  });
}

getGithubProfile();