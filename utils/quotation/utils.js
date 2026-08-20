export function numberToWords(num) {
  if (num === 0) return "zero";

  const units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function getHundredWords(number) {
    let hundredWords = "";
    if (number > 99) {
      hundredWords += units[Math.floor(number / 100)] + " hundred ";
      number %= 100;
    }
    if (number > 10 && number < 20) {
      hundredWords += teens[number - 11] + " ";
    } else {
      if (number >= 10) {
        hundredWords += tens[Math.floor(number / 10)] + " ";
        number %= 10;
      }
      if (number > 0) {
        hundredWords += units[number] + " ";
      }
    }
    return hundredWords.trim();
  }

  let result = "";
  const parts = [
    { value: 10000000, suffix: "crore" },
    { value: 100000, suffix: "lakh" },
    { value: 1000, suffix: "thousand" },
    { value: 100, suffix: "hundred" },
  ];

  for (const part of parts) {
    const partValue = Math.floor(num / part.value);
    if (partValue > 0) {
      result += getHundredWords(partValue) + " " + part.suffix + " ";
      num %= part.value;
    }
  }

  if (num > 0) {
    result += getHundredWords(num);
  }

  return result.trim();
}
