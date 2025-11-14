const axios = require('axios');

const API_URL = 'https://arcalight-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/';

async function getBooksUsingAxios() {
    try{
        const response = await axios.get(API_URL);
        console.log('Data fetched successfully:', response.data);
    } catch(error) {
        console.error('Error fetching data:', error);
    }
};

async function getBooksByISBN(isbn) {
    try{
        const endpoint = `${API_URL}/isbn/${isbn}`;
        const response = await axios.get(endpoint);
        
        console.log(`Book with ISBN ${isbn} has been fetched successfully`);
        console.log(`Status:`, response.status);
        console.log(`Data:`, response.data);

    } catch (error){
        console.error(`Error fetching book with ISBN: ${isbn}`, error.message);
    }
};

async function getBooksByAuthor(author) {
    const encodedAuthor = encodeURIComponent(author);
    try{
        const endpoint = `${API_URL}/author/${encodedAuthor}`;
        const response = await axios.get(endpoint);

        console.log(`Book with by ${author} has been fetched succesfully`);
        console.log(`Status:`, response.status);
        console.log(`Data:`, response.data);

    } catch (error) {
        console.error(`Error fetching book by ${author}`, error.message);
    }
};

async function getBooksByTitle(title) {
    const encodedTitle = encodeURIComponent(title);
    try{
        const endpoint = `${API_URL}/title/${encodedTitle}`;
        const response = await axios.get(endpoint);

        console.log(`Book with the title ${title} has been fetched succesfully`);
        console.log(`Status:`, response.status);
        console.log(`Data:`, response.data);
    
    } catch (error) {
        console.error(`Error fetching by with title ${title}`, error.message);
    }
};
