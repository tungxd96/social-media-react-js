export const toDate = timestamp => {
    const comp = toDateComponent(timestamp);
    const date = new Date(comp.year, comp.month, comp.day, comp.hour, comp.minute, comp.second);
    date.setHours(date.getHours() - 7);
    return date;
}

export const toDateComponent = timestamp => {
    const dateTime = timestamp.split('T')
    const date = dateTime[0];
    const time = dateTime[1].split('Z')[0];
    const dateComponent = date.split('-');
    const timeComponent = time.split(':');
    return {
        year: parseInt(dateComponent[0]),
        month: parseInt(dateComponent[1]) - 1,
        day: parseInt(dateComponent[2]),
        hour: parseInt(timeComponent[0]),
        minute: parseInt(timeComponent[1]),
        second: parseInt(timeComponent[2]),
    }
}

export const toTimestamp = dateTime => {
    const localeDate = dateTime.toLocaleDateString().split('/');
    const localeTime = dateTime.toTimeString().split(' ');
    const time = localeTime[0].split(':');
    return {
        month: localeDate[0],
        day: localeDate[1],
        year: localeDate[2],
        hour: time[0],
        minute: time[1],
        second: time[2],
    }
}

export const toTimestampString = dateTime => {
    const timestamp = toTimestamp(dateTime);
    return `${timestamp.year}-${timestamp.month}-${timestamp.day} ${timestamp.hour}:${timestamp.minute}:${timestamp.second}`
}