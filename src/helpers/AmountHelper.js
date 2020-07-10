export const amountToStr = amount => amount.toString().split('').reverse().join('').match(/(.{1,3})/g).join(',').split('').reverse().join('');
