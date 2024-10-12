document.addEventListener("DOMContentLoaded", function () {
    fetch('https://raw.githubusercontent.com/yonasuriv/PanicSonda/refs/heads/main/.github/logs/changes/tweaks.log')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            if (lines.length >= 4) {
                const versionLine = lines[3];  // The 4th line is at index 3
                const regex = /Version:\s+(Major|Minor|Patch|Ninja)\s+(.*)/;  // Match after Version:
                const match = versionLine.match(regex);
                if (match && match[2]) {
                    const version = match[2];  // Everything after the keyword
                    document.getElementById('footer').innerText = version.trim();  // Display the version
                }
            }
        })
        .catch(error => console.error('Error fetching the file:', error));
});