// Adjustments for sticky note toggling and hiding after login
function toggleStickyNote(isOpen) {
    const closed = document.getElementById('stickyNoteClosed');
    const open = document.getElementById('stickyNoteOpen');

    if (isOpen) {
        closed.style.display = 'none';
        open.style.display = 'block';
    } else {
        closed.style.display = 'block';
        open.style.display = 'none';
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'guest' && password === 'roblox2006') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
        
        // Hides sticky note permanently after login
        document.getElementById('stickyNoteClosed').style.display = 'none';
        document.getElementById('stickyNoteOpen').style.display = 'none';
    } else {
        alert('Incorrect credentials!');
    }
}

// Function to update the time bar
function updateTimeBar() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('currentTime').innerText = `5 August 2006 | ${formattedTime}`;
}
setInterval(updateTimeBar, 1000); // Update the time every second

document.querySelectorAll('.window').forEach((window) => {
    const header = window.querySelector('.window-header');
    header.onmousedown = function (e) {
        const rect = window.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        document.onmousemove = function (event) {
            window.style.left = event.clientX - offsetX + 'px';
            window.style.top = event.clientY - offsetY + 'px';
        };

        document.onmouseup = function () {
            document.onmousemove = null;
        };
    };
});

const emails = [
    { subject: 'Welcome!', body: 'Thank you for using Robloxia Mail!', icon: 'roblox.png' },
    { subject: 'Special Offer!', body: 'Get a free item in the catalog today!', icon: 'roblox.png' },
    { subject: 'Event Reminder', body: 'Don’t miss the Roblox 2006 Anniversary event.', icon: 'roblox.png' },
    { subject: 'Upgrade Now!', body: 'Upgrade your account for premium benefits.', icon: 'roblox.png' }
];

function openWindow(id) {
    document.getElementById(id).style.display = 'block';
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

function loadEmails() {
    const emailList = document.getElementById('emailList');
    emailList.innerHTML = emails.map((email, index) => `<li onclick="openEmail(${index})"><img src="${email.icon}" alt="Email Icon">${email.subject}</li>`).join('');
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

    resultsDiv.innerHTML = data.query.search.map(
        (result) => `<p><b>${result.title}</b>: ${result.snippet}</p>`
    ).join('');
}

// Load emails on page load
loadEmails();
