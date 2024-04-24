export const translateDay = (day: string): string => {
  let result = '';
  switch (day) {
    case 'MONDAY':
      result = 'Понеділок';
      break;
    case 'TUESDAY':
      result = 'Вівторок';
      break;
    case 'WEDNESDAY':
      result = 'Середа';
      break;
    case 'THURSDAY':
      result = 'Четвер';
      break;
    case 'FRIDAY':
      result = 'П`ятниця';
      break;
    case 'SATURDAY':
      result = 'Субота';
      break;
    case 'SUNDAY':
      result = 'Неділя';
      break;
    default:
      result = 'НЕВІДОМИЙ ДЕНЬ';
      break;
  }
  return result;
};
