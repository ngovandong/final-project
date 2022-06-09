export function formatTop(s)
{
    switch (s)
    {
        case "top100_VN": return "Việt Nam";
        case "top100_AM": return "Âu Mỹ";
        case "top100_CA": return "Châu Á";
        case "top100_KL": return "Không Lời";
        default: return s;
    }
}

export function getSongDuration(duration)
{
    // Hàm chuyển miliseconds sang phút:giây
    let ms = duration;
    let min = ms / 1000 / 60;
    let r = min % 1;
    let sec = Math.floor(r * 60);

    if (sec < 10)
    {
        sec = '0' + sec;
    }
    min = Math.floor(min);
    // Nếu min và sec bị NAN thì ta return tạm về 0:00
    if (min !== NaN && sec !== NaN)
        return min + ':' + sec;
    else
        return "0:00";
}

export function getAudioTimeString(seconds)
{
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt(seconds % (60 * 60) / 60);
    const s = parseInt(seconds % 60);
    return ((m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
}