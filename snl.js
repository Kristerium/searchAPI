document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-query').value;
    searchArticles(query);
});

function searchArticles(query) {
    const url = `https://snl.no/api/v1/search?query=${encodeURIComponent(query)}&limit=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.length === 0) {
        resultsDiv.innerHTML = '<p>Ingen resultater funnet.</p>';
        return;
    }

    data.slice(0, 3).forEach(article => { // Limit to first 3 results
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('result-item');

        const title = document.createElement('h3');
        title.textContent = article.title;
        articleDiv.appendChild(title);

        if (article.snippet) {
            const snippet = document.createElement('p');
            snippet.innerHTML = article.snippet.replace(/<mark>/g, '<strong>').replace(/<\/mark>/g, '</strong>'); // Replace <mark> with <strong>
            articleDiv.appendChild(snippet);
        }

        const link = document.createElement('a');
        link.href = article.article_url;
        link.textContent = 'Les mer';
        link.target = '_blank';
        articleDiv.appendChild(link);

        resultsDiv.appendChild(articleDiv);
    });
}
