document.addEventListener("DOMContentLoaded", function() {
    fetch('https://raw.githubusercontent.com/yonasuriv/PanicSonda/refs/heads/main/.github/logs/changes/tweaks.log')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            if (lines.length >= 6) {
                const versionLine = lines[5];  // The 6th line is at index 5
                const version = versionLine.split('Version: ')[1];  // Extract the part after 'Version: '
                if (version) {
                    document.getElementById('footer').innerText = version.trim();  // Display only the version
                }
            }
        })
        .catch(error => console.error('Error fetching the file:', error));
});