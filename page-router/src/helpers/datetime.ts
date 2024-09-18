import dayjs, {Dayjs} from "dayjs";

export const disabledDate = (current: Dayjs) => {
    if(current && current < dayjs().startOf('day')) {
        return true;
    }

    return [6, 0].includes(current.day());
}

export const convertDateTime = (dateTime: string) => {
    return dayjs(dateTime).format('DD-MM-YYYY HH:mm:ss')
}

export interface Timezone {
    name: string;
    offset: string;
    cities: string[];
}

function formatGMT(gmt: string) {
    const parts = gmt.split(':');

    const hours = parts[0].padStart(2, '0');
    const minutes = parts[1].padStart(2, '0');

    return `${hours}:${minutes}`;
}