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
    var ms = duration;
    var min = ms / 1000 / 60;
    var r = min % 1;
    var sec = Math.floor(r * 60);

    if (sec < 10)
    {
        sec = '0' + sec;
    }
    min = Math.floor(min);
    return min + ':' + sec;
}

export function getAudioTimeString(seconds)
{
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt(seconds % (60 * 60) / 60);
    const s = parseInt(seconds % 60);
    return ((m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
}