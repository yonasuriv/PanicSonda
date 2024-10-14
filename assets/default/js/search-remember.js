document.addEventListener('DOMContentLoaded', function () {
    // Define the search engine URLs with placeholders for the query
    const searchEngines = {
        default: 'https://www.startpage.com/do/search?query=${userinput}',
        brave: 'https://search.brave.com/search?q=${userinput}&source=web',
        duckduckgo: 'https://duckduckgo.com/?t=h_&q=${userinput}',
        google: 'https://www.google.com/search?q=${userinput}'
    };

    // Reference to the form, select, and input elements
    const form = document.getElementById('myForm');
    const urlSelect = document.getElementById('urlSelect');
    const searchInput = document.getElementById('search-input');

    // Update the form action before submission based on user input and selected engine
    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent the form from submitting immediately

        const selectedEngine = urlSelect.value;  // Get the selected search engine
        const userinput = encodeURIComponent(searchInput.value);  // Get user input and URL-encode it

        // Set the form action with the user input inserted into the URL
        const searchUrl = searchEngines[selectedEngine].replace('${userinput}', userinput);
        window.location.href = searchUrl;  // Redirect to the constructed URL
    });
});
