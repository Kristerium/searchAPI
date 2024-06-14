// Function to handle search when Enter key is pressed
document.getElementById('entry').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default action of form submission
      getData(); // Call getData function to perform search
    }
  });
  
  // Function to fetch data from Wikipedia API
  async function getData() {
    const entryValue = document.getElementById('entry').value.trim();
    const answer = document.getElementById('answer');
    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;
    answer.innerHTML = '';
  
    try {
      const response = await fetch(`https://${selectedLanguage}.wikipedia.org/api/rest_v1/page/summary/${entryValue}`);
      if (!response.ok) {
        throw new Error('Invalid input or poor internet connection -> Please try capitalizing the ALL letters if its a shortened/short word');
      }
      const data = await response.json();
      if (data.extract) {
        answer.innerHTML = data.extract;
        answer.style.display = 'block'; // Show the answer
      } else {
        answer.textContent = 'No information found.';
        answer.style.display = 'block'; // Show the answer even if no info found
      }
    } catch (error) {
      answer.textContent = 'ERROR! ' + error.message;
      answer.classList.add('error');
      answer.style.display = 'block'; // Show the error message
    }
  }
  