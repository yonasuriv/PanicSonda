document.addEventListener('DOMContentLoaded', function () {
    // Disable text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none'; // For Safari
    document.body.style.msUserSelect = 'none'; // For IE/Edge
    document.body.style.mozUserSelect = 'none'; // For Firefox

    // Prevent text selection via event listeners
    document.body.addEventListener('selectstart', function (event) {
        event.preventDefault();
    });

    // Disable right-click (context menu)
    document.body.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
});
