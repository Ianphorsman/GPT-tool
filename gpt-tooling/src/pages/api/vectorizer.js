request.post({
  url: 'https://vectorizer.ai/api/v1/vectorize',
  formData: {
    image: fs.createReadStream('example.jpeg'), // TODO: Replace with your image
    // TODO: Add more upload options here
  },
  auth: { user: process.env.VECTORIZER_AI_USER, pass: process.env.VECTORIZER_AI_PASS },
  followAllRedirects: true,
  encoding: null
}, function(error, response, body) {
  if (error) {
    console.error('Request failed:', error);
  } else if (!response || response.statusCode != 200) {
    console.error('Error:', response && response.statusCode, body.toString('utf8'));
  } else {
    // Save result
    fs.writeFileSync("result.svg", body);
  }
});