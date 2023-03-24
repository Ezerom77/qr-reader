const wrapper = document.querySelector('.wrapper');
const form = document.querySelector('form');
const fileInp = document.querySelector('input')
const infoText = document.querySelector('p')
const closeBtn = document.querySelector('.close');
const copyBtn = document.querySelector('.copy');

//fetch data from API

function fetchRequest(file, formData) {
  infoText.innerText = "Scanning QR Code"
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: 'POST',
    body: formData
  }
  ).then(res => res.json()).then(result => {
    console.log(result[0].symbol[0].data)
    result = result[0].symbol[0].data
    infoText.innerText = result ? "Upload QR Code to scan" : "Couldn't scan QR Code";
    if (!result) return;
    document.querySelector('textarea').innerText = result;
    form.querySelector("img").src = URL.createObjectURL(file)
    wrapper.classList.add("active");
  }).catch(() => {
    infoText.innerText("Couldn't scan QR Code...")
  });
}
// send Qr to API server
fileInp.addEventListener("change", async (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file)
  fetchRequest(file, formData)
})

// Copy text to clipboard
copyBtn.addEventListener("click", () => {
  let text = document.querySelector('textarea').textContent;
  navigator.clipboard.writeText(text);
});

// when user clicks on form do fileIno Event listener function
form.addEventListener('click', () => { fileInp.click(); });

closeBtn.addEventListener("click", () => { wrapper.classList.remove("active"); });
