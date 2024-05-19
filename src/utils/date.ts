/**
 * @description 요일이 존재하는지 확인하기
 * @param days 요일
 */
export const getExistDay = (days: string) => {
  const sunday = days.includes("0");
  const monday = days.includes("1");
  const tuesday = days.includes("2");
  const wednesday = days.includes("3");
  const thursday = days.includes("4");
  const friday = days.includes("5");
  const saturday = days.includes("6");

  return {
    friday,
    monday,
    saturday,
    sunday,
    thursday,
    tuesday,
    wednesday,
  };
};
