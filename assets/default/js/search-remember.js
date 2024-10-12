document.addEventListener("DOMContentLoaded", function () {

    const urlSelect = document.getElementById('urlSelect');
    const form = document.getElementById('myForm');

    // Ensure that changing the select option only updates the action, without focusing elsewhere
    urlSelect.addEventListener('mousedown', function (e) {
        e.stopPropagation(); // Stop propagation to avoid any bubbling issues
    });

    // Update form action based on the selection when the user submits
    form.addEventListener('submit', function (e) {
        const selectedUrl = urlSelect.value;
        form.action = selectedUrl;
    });
});
