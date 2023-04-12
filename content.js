function getSelectedInput() {
  const inputElements = document.querySelectorAll('input, textarea');
  for (const input of inputElements) {
    if (input === document.activeElement) {
      return input;
    }
  }
  return null;
}

function translateText(text) {
  return new Promise((resolve, reject) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      resolve(data[0][0][0]);
    } else {
      reject(new Error('Translation failed'));
    }
  })
  .catch((error) => {
    reject(error);
  });});
}

function translateAndReplace() {
const input = getSelectedInput();
if (input) {
const originalText = input.value;
translateText(originalText)
.then((translatedText) => {
input.value = translatedText;
})
.catch((error) => {
console.error('Error during translation:', error);
});
}
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
if (request.action === 'translateAndReplace') {
translateAndReplace();
}
});
