const terminal = document.getElementById('terminal');
const progress = document.getElementById('progress');
const status = document.getElementById('status');

const messages = [
    "Connecting to server...",
    "Establishing secure connection...",
    "Authenticating user...",
    "Access granted.",
    "Initiating file download...",
    "Downloading files... Please wait.",
    "Processing data stream...",
    "Verifying file integrity..."
];

let progressWidth = 0;

function typeMessage(message, callback) {
    const p = document.createElement('p');
    terminal.appendChild(p);
    let i = 0;
    const interval = setInterval(() => {
        p.innerHTML += message[i];
        i++;
        if (i === message.length) {
            clearInterval(interval);
            callback();
        }
    }, 100);
}

function updateProgress() {
    if (progressWidth < 100) {
        progressWidth += 1;
        progress.style.width = progressWidth + '%';
        setTimeout(updateProgress, 150);
    } else {
        // Reset and loop subtly to keep it going
        setTimeout(() => {
            progressWidth = 0;
            progress.style.width = '0%';
            status.innerHTML = "Preparing next batch...";
            setTimeout(updateProgress, 1000);
        }, 2000);
    }
}

function displayMessages(index) {
    if (index < messages.length) {
        typeMessage(messages[index], () => {
            setTimeout(() => displayMessages(index + 1), 500);
        });
    } else {
        // Loop back to keep the illusion
        setTimeout(() => {
            terminal.innerHTML = '';
            displayMessages(0);
        }, 2000);
    }
}

displayMessages(0);
updateProgress();