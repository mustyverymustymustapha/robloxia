function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'guest' && password === 'roblox2006') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
    } else {
        alert('Incorrect credentials!');
    }
}

function showCredentials() {
    document.getElementById('credentials').style.display = 'block';
}

document.querySelectorAll('.window').forEach((window) => {
    const header = window.querySelector('.window-header');
    header.onmousedown = function (e) {
        const rect = window.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        document.onmousedown = function (event) {
            window.style.left = event.clientX - offsetX + 'px';
            window.style.top = event.clientY - offsetY + 'px';
        };

        document.onmouseup = function () {
            document.onmousemove = null;
        };
    };
});

// TODO: maybe add more emails and email icons or sum
let emails = [
    { subject: 'Welcome!', body: 'Thank you for using Robloxia Mail!' },
    { subject: 'Special Offer!', body: 'Get a free item in the catalog today!' },
];

function openWindow(id) {
    document.getElementById(id).style.display = 'block';
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

function loadEmails() {
    const emailList = document.getElementById('emailList');
    emailList.innerHTML = emails.map((email, index) => `<li onclick="openEmail(${index})">${email.subject}</li>`).join('');
}

function openEmail(index) {
    document.getElementById('emailContent').style.display = 'block';
    document.getElementById('emailBody').innerText = emails[index].body;
    document.getElementById('emailList').style.display = 'none';
}

function closeEmail() {
    document.getElementById('emailContent').style.display = 'none';
    document.getElementById('emailList').style.display = 'block';
}

async function searchWikipedia() {
    const query = document.getElementById('searchQuery').value;
    const resultsDiv = document.getElementById('wikiResults');
    resultsDiv.innerHTML = 'Loading...';

    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`);
    const data = await response.json();

    resultsDiv.innerHTML = data.query.search.map((result) => `<p><a href="https://en.wikipedia.org/wiki/${result.title}" target="_blank">${result.title}</a></p>`).join('');
}

// yay!!
loadEmails();