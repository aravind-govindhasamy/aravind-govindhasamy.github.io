function downloadResumeFromGDrive () {
    let url = "https://drive.google.com/file/d/1eqyMBg83zkIeTx6fcfsZwKuPEmAW8kEg";
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
randomThirukural();
function randomThirukural() {
  // Generate a random number between 1 and 1330
  const randomNum = Math.floor(Math.random() * 1080) + 1;
    
  // Fetch a random Thirukural verse
  fetch(`https://api-thirukkural.vercel.app/api?num=${randomNum}`)
      .then(response => response.json())
      .then(data => {
          const num = data.number;
          const verseTamil = data.line1 + "\n" + data.line2;
          const verseEnglish = data.eng;
          const translationTamil = data.tam_exp;
          const translationEnglish = data.eng_exp;

          // Update the HTML with the fetched verse and translation
          document.getElementById("thirukural-number").innerText = num;
          document.getElementById("thirukural-verse").innerText = verseTamil + "\n\n" + verseEnglish;
          document.getElementById("thirukural-explain").innerText = translationTamil + "\n\n" + translationEnglish;
      })
      .catch(error => console.log(error));
}
