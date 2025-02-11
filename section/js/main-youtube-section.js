const API_KEY = 'AIzaSyD_YEZsA8TnFHQTXJCEbkSxRQvoWqaH5Bg';
const CHANNEL_ID = 'UC17JmZCBw1AEfom5aMBbAsA';
const MAX_RESULTS = 50;

async function getChannelVideos(pageToken = '') {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}`
            + `&channelId=${CHANNEL_ID}`
            + `&part=snippet,id`
            + `&order=date`
            + `&maxResults=${MAX_RESULTS}`
            + (pageToken ? `&pageToken=${pageToken}` : '')
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return null;
    }
}

function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('ko-KR');
}

function createVideoElement(video) {
    const videoDiv = document.createElement('div');
    videoDiv.className = 'video-item';
    
    const title = video.snippet.title;
    const publishDate = formatDate(video.snippet.publishTime);
    const videoId = video.id.videoId;
    
    videoDiv.innerHTML = `
        <iframe 
            class="video-frame"
            src="https://www.youtube.com/embed/${videoId}"
            title="${title}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
        <div class="video-title">${title}</div>
        <div class="video-date">${publishDate}</div>
    `;
    
    return videoDiv;
}
async function loadVideos() {
    const videosContainer = document.getElementById('videos');
    let pageToken = '';
    
    while (true) {
        const data = await getChannelVideos(pageToken);
        if (!data || !data.items) break;
        
        data.items.forEach(video => {
            if (video.id.videoId) {
                videosContainer.appendChild(createVideoElement(video));
            }
        });
        
        if (!data.nextPageToken) break;
        pageToken = data.nextPageToken;
    }
}

loadVideos();