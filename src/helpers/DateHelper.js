import moment from 'moment';
const DAY_STRINGS = ['日', '月', '火', '水', '木', '金', '土'];

class DateHelper {
    constructor(dateString) {
        if(!dateString) {
            this.date = moment();

        } else {
            this.date = new Date(dateString.endsWith('Z') ? dateString : dateString + 'Z');
        }
    }

    getAfter(value, uom) {
        return moment().add(uom, value).format('HH:mm:ss');
    }

    getDay(withUnit) {
        return DAY_STRINGS[this.date.getDay()] + (withUnit ? '曜日' : '');
    }

    getDate() {
        return this.date.getDate();
    }

    getTime() {
        let hour = this.date.getHours();
        hour = hour.length < 2 ? '0' + hour : hour;
        let minutes = String(this.date.getMinutes());
        minutes = minutes.length < 2 ? '0' + minutes : minutes;
        let seconds = String(this.date.getSeconds());
        seconds = seconds.length < 2 ? '0' + seconds : seconds;
        return hour + ':' + minutes + ':' + seconds;
    }

    getHeader(withUnit) {
        const year = this.date.getFullYear();
        const month = this.date.getMonth() + 1;
        return withUnit ? year + '年' + month + '月': year + '/' + month;
    }

    getDateText() {
        const year = this.date.getFullYear();
        let month = String(this.date.getMonth() + 1);
        if(month.length < 2) month = '0'+ month;
        let date = String(this.date.getDate());
        if(date.length < 2) date = '0' + date;
        const day = DAY_STRINGS[this.date.getDay()];
        return `${year}.${month}.${date}(${day})`;
    }
}

export default DateHelper;
