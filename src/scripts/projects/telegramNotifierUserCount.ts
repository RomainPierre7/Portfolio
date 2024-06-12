interface Asset {
    download_count: number
}

interface Release {
    assets: Asset[]
}

document.addEventListener('DOMContentLoaded', async () => {
    const releases: Release[] = await fetch(
        'https://api.github.com/repos/romainpierre7/jellyfin-plugin-telegramnotifier/releases'
    ).then((response) => response.json())

    const downloadCounts = releases
        .map((release) => release.assets.map((asset) => asset.download_count))
        .flat()

    const maxDownloadCount = Math.max(...downloadCounts)

    const projectCardInfoElements = document.querySelectorAll('.project-card_info')

    projectCardInfoElements.forEach((proj) => {
        const header = proj.querySelector('.project-card_header')
        if (header) {
            const title = header.querySelector('h2')
            if (title && title.textContent) {
                if (title.textContent.trim() === 'Telegram Notifier') {
                    title.textContent = title.textContent + ` (${maxDownloadCount} users)`
                }
            }
        }
    })
})