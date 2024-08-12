// Function to increment the number after "/question" in the URL
function incrementQuestionNumber(url) {
  // Define a regular expression to match the number after "/question/"
  const regex = /(\/question\/)(\d+)(-\d+\.html)/;

  // Use the regex to find the number and split the URL
  const match = url.match(regex);
  if (match) {
    // Extract the number, increment it, and reconstruct the URL
    const prefix = match[1];
    const number = parseInt(match[2]);
    const suffix = match[3];
    const incrementedNumber = number + 1;

    // Construct the new URL
    const newUrl = url.replace(regex, `${prefix}${incrementedNumber}${suffix}`);

    return newUrl;
  } else {
    // If the URL doesn't match the expected pattern, return it unchanged
    return url;
  }
}

chrome.action.onClicked.addListener((tab) => {
  if (tab && tab.url) {
    console.log('Current URL:', tab.url);

    // Increment the question number in the current URL
    const newUrl = incrementQuestionNumber(tab.url);
    console.log('New URL:', newUrl);

    // Redirect to the new URL in the same tab
    chrome.tabs.update(tab.id, { url: newUrl });
  } else {
    console.error('Error: Unable to get the current URL.');
  }
});
