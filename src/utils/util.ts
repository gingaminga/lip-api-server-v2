/**
 * @description 무작위 텍스트 만들기
 * @param length 만들고자하는 길이
 * @returns 무작위 문자열
 */
export const getRandomText = (length = 15) => {
  const CHARACTER = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const test = CHARACTER.length;

  let randomstring = "";
  for (let i = 0; i < length; i++) {
    const rnum = Math.floor(Math.random() * test);
    randomstring += CHARACTER.substring(rnum, rnum + 1);
  }

  return randomstring;
};
