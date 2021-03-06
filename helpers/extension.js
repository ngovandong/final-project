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
    if (duration)
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
    return "0:00";
}