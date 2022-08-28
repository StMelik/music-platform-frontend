function formatView(time: number): string {
    return time < 10 ? '0' + time : String(time)
}

export function formatTime(time: number): string {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${formatView(minutes)}:${formatView(seconds)}`
}