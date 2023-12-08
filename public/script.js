async function getRandomImage() {
    try {
        let finalUrl = ""
        await fetch('https://source.unsplash.com/random/?Cryptocurrency&1')
        .then(response => {
            if (response.redirected) finalUrl = response.url;
        })
        .catch(error => console.error('Error:', error));
        
        const imageUrl = finalUrl;
        document.getElementById('randomImage').src = imageUrl;
        document.getElementById('randomImage').style.display = 'inline';
        document.getElementById('randomImageUrl').value = imageUrl;
    } catch (error) {
        console.error('Error fetching random image:', error);
    }
}

function hideRandomImage() {
    document.getElementById('randomImage').style.display = 'none';
    document.getElementById('randomImageUrl').value = ''; //
}

function submitForm(event) {
    const randomImageUrl = document.getElementById('randomImageUrl').value;
    if (!randomImageUrl) {
        document.getElementById('randomImageUrl').value = '';
    }
    return true;
}