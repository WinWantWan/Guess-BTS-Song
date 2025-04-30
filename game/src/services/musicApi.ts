import type { Song } from "../types/music"

// This is a mock implementation since we don't have direct access to the Free Music Archive API
// In a real application, you would replace this with actual API calls

// Sample BTS songs data
// const mockBTSSongs: Song[] = [
//   {
//     id: "1",
//     title: "Dynamite",
//     artist: "BTS",
//     album: "Dynamite (Single)",
//     audio_url: "https://example.com/audio/dynamite.mp3",
//     cover_url: "https://example.com/covers/dynamite.jpg",
//     duration: 199,
//   },
//   {
//     id: "2",
//     title: "Butter",
//     artist: "BTS",
//     album: "Butter (Single)",
//     audio_url: "https://example.com/audio/butter.mp3",
//     cover_url: "https://example.com/covers/butter.jpg",
//     duration: 164,
//   },
//   {
//     id: "3",
//     title: "Permission to Dance",
//     artist: "BTS",
//     album: "Butter / Permission to Dance",
//     audio_url: "https://example.com/audio/permission-to-dance.mp3",
//     cover_url: "https://example.com/covers/permission-to-dance.jpg",
//     duration: 187,
//   },
//   {
//     id: "4",
//     title: "Boy With Luv (feat. Halsey)",
//     artist: "BTS",
//     album: "Map of the Soul: Persona",
//     audio_url: "https://example.com/audio/boy-with-luv.mp3",
//     cover_url: "https://example.com/covers/boy-with-luv.jpg",
//     duration: 229,
//   },
//   {
//     id: "5",
//     title: "DNA",
//     artist: "BTS",
//     album: "Love Yourself: Her",
//     audio_url: "https://example.com/audio/dna.mp3",
//     cover_url: "https://example.com/covers/dna.jpg",
//     duration: 243,
//   },
//   {
//     id: "6",
//     title: "Fake Love",
//     artist: "BTS",
//     album: "Love Yourself: Tear",
//     audio_url: "https://example.com/audio/fake-love.mp3",
//     cover_url: "https://example.com/covers/fake-love.jpg",
//     duration: 242,
//   },
//   {
//     id: "7",
//     title: "IDOL",
//     artist: "BTS",
//     album: "Love Yourself: Answer",
//     audio_url: "https://example.com/audio/idol.mp3",
//     cover_url: "https://example.com/covers/idol.jpg",
//     duration: 227,
//   },
//   {
//     id: "8",
//     title: "Black Swan",
//     artist: "BTS",
//     album: "Map of the Soul: 7",
//     audio_url: "https://example.com/audio/black-swan.mp3",
//     cover_url: "https://example.com/covers/black-swan.jpg",
//     duration: 196,
//   },
//   {
//     id: "9",
//     title: "ON",
//     artist: "BTS",
//     album: "Map of the Soul: 7",
//     audio_url: "https://example.com/audio/on.mp3",
//     cover_url: "https://example.com/covers/on.jpg",
//     duration: 252,
//   },
//   {
//     id: "10",
//     title: "Life Goes On",
//     artist: "BTS",
//     album: "BE",
//     audio_url: "https://example.com/audio/life-goes-on.mp3",
//     cover_url: "https://example.com/covers/life-goes-on.jpg",
//     duration: 207,
//   },
//   {
//     id: "11",
//     title: "Spring Day",
//     artist: "BTS",
//     album: "You Never Walk Alone",
//     audio_url: "https://example.com/audio/spring-day.mp3",
//     cover_url: "https://example.com/covers/spring-day.jpg",
//     duration: 295,
//   },
//   {
//     id: "12",
//     title: "Blood Sweat & Tears",
//     artist: "BTS",
//     album: "Wings",
//     audio_url: "https://example.com/audio/blood-sweat-tears.mp3",
//     cover_url: "https://example.com/covers/blood-sweat-tears.jpg",
//     duration: 233,
//   },
//   {
//     id: "13",
//     title: "MIC Drop",
//     artist: "BTS",
//     album: "Love Yourself: Her",
//     audio_url: "https://example.com/audio/mic-drop.mp3",
//     cover_url: "https://example.com/covers/mic-drop.jpg",
//     duration: 239,
//   },
//   {
//     id: "14",
//     title: "Save ME",
//     artist: "BTS",
//     album: "The Most Beautiful Moment in Life: Young Forever",
//     audio_url: "https://example.com/audio/save-me.mp3",
//     cover_url: "https://example.com/covers/save-me.jpg",
//     duration: 232,
//   },
//   {
//     id: "15",
//     title: "I Need U",
//     artist: "BTS",
//     album: "The Most Beautiful Moment in Life, Pt. 1",
//     audio_url: "https://example.com/audio/i-need-u.mp3",
//     cover_url: "https://example.com/covers/i-need-u.jpg",
//     duration: 199,
//   },
// ]

interface iTunesTrack {
  trackId: number
  trackName: string
  artistName: string
  collectionName: string
  previewUrl: string
  artworkUrl100: string
  trackTimeMillis: number
}

export const fetchBTSSongs = async (): Promise<Song[]> => {
  try {
    const response = await fetch('https://itunes.apple.com/search?term=BTS&entity=song&limit=15')
    if (!response.ok) {
      throw new Error('Failed to fetch BTS songs')
    }
    const data = await response.json()
    
    // Transform iTunes API response to our Song interface
    return data.results.map((track: iTunesTrack) => ({
      id: track.trackId.toString(),
      title: track.trackName,
      artist: track.artistName,
      album: track.collectionName,
      audio_url: track.previewUrl,
      cover_url: track.artworkUrl100.replace('100x100', '600x600'),
      duration: Math.floor(track.trackTimeMillis / 1000)
    }))
  } catch (error) {
    console.error('Error fetching BTS songs:', error)
    throw error
  }
}

// In a real application, you would implement actual API calls like:
/*
export const fetchBTSSongs = async (): Promise<Song[]> => {
  try {
    const response = await fetch('https://freemusicarchive.org/api/tracks?artist=BTS')
    if (!response.ok) {
      throw new Error('Failed to fetch BTS songs')
    }
    const data = await response.json()
    
    // Transform API response to our Song interface
    return data.tracks.map((track: any) => ({
      id: track.track_id,
      title: track.track_title,
      artist: track.artist_name,
      album: track.album_title,
      audio_url: track.track_url,
      cover_url: track.album_image_url,
      duration: track.track_duration
    }))
  } catch (error) {
    console.error('Error fetching BTS songs:', error)
    throw error
  }
}
*/
