export const generateUniqueString = () => {
  const generatedStrings = new Set();

  function generateRandomLetter() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }

  function generateRandomLetters() {
    return `${generateRandomLetter()}${generateRandomLetter()}${generateRandomLetter()}`;
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }

  function generateString() {
    const randomLetters = generateRandomLetters();
    const randomNumber = generateRandomNumber();
    return `${randomLetters}${randomNumber}`;
  }

  function generateUnique() {
    const uniqueString = generateString();
    if (!generatedStrings.has(uniqueString)) {
      generatedStrings.add(uniqueString);
      return uniqueString;
    } else {
      return generateUnique();
    }
  }

  return generateUnique();
};
