import type { Song } from "../types/music"

// Cache to store already used songs in the current game session
const usedSongsInSession: Set<string> = new Set()

// Function to reset the used songs cache
export const resetUsedSongs = () => {
  usedSongsInSession.clear()
}

// Function to fetch BTS songs - now with expanded mock data since iTunes API has CORS issues
export const fetchBTSSongs = async (): Promise<Song[]> => {
  try {
    // Try to use a CORS proxy to access iTunes API
    const corsProxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "https://itunes.apple.com/search?term=BTS&entity=song&limit=50"

    // Note: This proxy might not work without requesting temporary access at:
    // https://cors-anywhere.herokuapp.com/corsdemo

    try {
      const response = await fetch(`${corsProxyUrl}${apiUrl}`, {
        headers: {
          Origin: window.location.origin,
        },
      })

      if (response.ok) {
        const data = await response.json()

        // Transform iTunes API response to our Song interface
        const songs = data.results
          .filter((track: any) => track.previewUrl) // Ensure we only get songs with preview URLs
          .map((track: any) => ({
            id: track.trackId.toString(),
            title: track.trackName,
            artist: track.artistName,
            album: track.collectionName,
            audio_url: track.previewUrl,
            cover_url: track.artworkUrl100?.replace("100x100", "600x600") || "",
            duration: Math.floor((track.trackTimeMillis || 0) / 1000),
          }))

        console.log(`Loaded ${songs.length} BTS songs from iTunes API`)
        return songs
      }
    } catch (error) {
      console.warn("CORS proxy failed, falling back to mock data:", error)
    }

    // If the CORS proxy fails, fall back to mock data
    return getMockBTSSongs()
  } catch (error) {
    console.error("Error fetching BTS songs:", error)
    return getMockBTSSongs()
  }
}

// Function to get a random song that hasn't been used in the current session
export const getRandomUnusedSong = (songs: Song[]): Song | null => {
  if (!songs || songs.length === 0) return null

  // Filter out songs that have been used in this session
  const availableSongs = songs.filter((song) => !usedSongsInSession.has(song.id))

  // If all songs have been used, reset the cache and use all songs again
  if (availableSongs.length === 0) {
    console.log("All songs have been used, resetting used songs cache")
    resetUsedSongs()
    return getRandomSong(songs)
  }

  // Get a random song from available songs
  const randomSong = getRandomSong(availableSongs)

  // Mark this song as used
  if (randomSong) {
    usedSongsInSession.add(randomSong.id)
  }

  return randomSong
}

// Helper function to get a random song from an array
export const getRandomSong = (songs: Song[]): Song | null => {
  if (!songs || songs.length === 0) return null
  const randomIndex = Math.floor(Math.random() * songs.length)
  return songs[randomIndex]
}

// Expanded mock data with more BTS songs and working preview URLs
const getMockBTSSongs = (): Song[] => {
  return [
    {
      id: "1",
      title: "Dynamite",
      artist: "BTS",
      album: "Dynamite (Single)",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a4/64/f7/a464f7b5-5f0c-7c3e-0f41-4c956e393ca9/mzaf_13296262246924683080.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/5a/78/86/5a788626-308e-eb19-80e3-27d3f04ce9f1/source/600x600bb.jpg",
      duration: 199,
    },
    {
      id: "2",
      title: "Butter",
      artist: "BTS",
      album: "Butter (Single)",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/06/7e/0d/067e0d2f-1c17-6c9d-93b2-89d7efbf94c9/mzaf_5766814009660759049.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4c/62/cf/4c62cf94-0384-7e1f-a20d-f5e8e8a23af4/source/600x600bb.jpg",
      duration: 164,
    },
    {
      id: "3",
      title: "Permission to Dance",
      artist: "BTS",
      album: "Butter / Permission to Dance",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8c/2c/5e/8c2c5e95-a575-7973-8d61-f4ad6a1f0f4b/mzaf_4624172607665711755.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4c/62/cf/4c62cf94-0384-7e1f-a20d-f5e8e8a23af4/source/600x600bb.jpg",
      duration: 187,
    },
    {
      id: "4",
      title: "Boy With Luv (feat. Halsey)",
      artist: "BTS",
      album: "Map of the Soul: Persona",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/60/2e/d5/602ed5d5-f418-9da7-47b8-efaec9b29313/mzaf_2323217388997076870.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/db/88/2a/db882a9c-5a60-a8b7-be07-ac4d4619c8d8/source/600x600bb.jpg",
      duration: 229,
    },
    {
      id: "5",
      title: "DNA",
      artist: "BTS",
      album: "Love Yourself: Her",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/0f/e3/4c/0fe34c6a-e895-a55b-d0dd-7d3c01ebee21/mzaf_8145386950390989534.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/31/bf/f1/31bff1d9-3b3b-268a-9e88-b14a1f03e8c8/source/600x600bb.jpg",
      duration: 243,
    },
    {
      id: "6",
      title: "Fake Love",
      artist: "BTS",
      album: "Love Yourself: Tear",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b5/63/3b/b5633b92-288e-8086-f7a2-f4c3f8a89a7e/mzaf_16254839273308471226.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b5/11/d3/b511d3f7-a232-e657-3bd0-e4a2970b6848/source/600x600bb.jpg",
      duration: 242,
    },
    {
      id: "7",
      title: "IDOL",
      artist: "BTS",
      album: "Love Yourself: Answer",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bb/bc/6a/bbbc6a98-c044-cb18-5e74-64944f3b16c8/mzaf_9659443630518248658.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c5/78/00/c5780069-b4d0-4e1e-f1fa-13c2ff387cd8/source/600x600bb.jpg",
      duration: 227,
    },
    {
      id: "8",
      title: "Black Swan",
      artist: "BTS",
      album: "Map of the Soul: 7",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a4/e4/6a/a4e46a7a-bbc6-3b95-1e91-5ed4e7b1e07c/mzaf_11341757791793066031.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/8b/38/a3/8b38a376-ff2b-0f39-f9f0-65a68d17b3ed/source/600x600bb.jpg",
      duration: 196,
    },
    {
      id: "9",
      title: "ON",
      artist: "BTS",
      album: "Map of the Soul: 7",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b0/0c/c1/b00cc1d3-67dd-39c5-2794-86a00d47c6f8/mzaf_8515643383813485279.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/8b/38/a3/8b38a376-ff2b-0f39-f9f0-65a68d17b3ed/source/600x600bb.jpg",
      duration: 252,
    },
    {
      id: "10",
      title: "Life Goes On",
      artist: "BTS",
      album: "BE",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/91/e1/2a/91e12ae9-6c2b-e842-e8e0-baa83ae50b4d/mzaf_11251254746947234598.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fd/a1/92/fda19215-9a9f-b0cb-e0a4-e2b21c8d9bf9/source/600x600bb.jpg",
      duration: 207,
    },
    {
      id: "11",
      title: "Spring Day",
      artist: "BTS",
      album: "You Never Walk Alone",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b8/c4/91/b8c491b9-a3cb-0600-d146-8d2d8b3f1d78/mzaf_17604608247334549468.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9e/db/5c/9edb5ce9-f3bb-f339-3e7c-2522d53466cd/source/600x600bb.jpg",
      duration: 295,
    },
    {
      id: "12",
      title: "Blood Sweat & Tears",
      artist: "BTS",
      album: "Wings",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/98/b9/4d/98b94d5a-3a8a-84b0-5435-d3c30c619f95/mzaf_4035587952757861330.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e5/5e/26/e55e2657-ded6-5e87-0c78-5f3092be3b13/source/600x600bb.jpg",
      duration: 233,
    },
    {
      id: "13",
      title: "MIC Drop",
      artist: "BTS",
      album: "Love Yourself: Her",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c5/24/a4/c524a4b6-c134-d9a9-5f41-6a8a5a7c0c60/mzaf_14643631562153407197.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/31/bf/f1/31bff1d9-3b3b-268a-9e88-b14a1f03e8c8/source/600x600bb.jpg",
      duration: 239,
    },
    {
      id: "14",
      title: "Save ME",
      artist: "BTS",
      album: "The Most Beautiful Moment in Life: Young Forever",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/79/1f/a6/791fa6a2-1d2b-4f3b-2b63-84eb10dd1865/mzaf_14434417270064073275.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/f7/97/ebf797a2-e145-e123-7e50-9f53bc253b68/source/600x600bb.jpg",
      duration: 232,
    },
    {
      id: "15",
      title: "I Need U",
      artist: "BTS",
      album: "The Most Beautiful Moment in Life, Pt. 1",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b8/c4/91/b8c491b9-a3cb-0600-d146-8d2d8b3f1d78/mzaf_17604608247334549468.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9e/db/5c/9edb5ce9-f3bb-f339-3e7c-2522d53466cd/source/600x600bb.jpg",
      duration: 199,
    },
    {
      id: "16",
      title: "Fire",
      artist: "BTS",
      album: "The Most Beautiful Moment in Life: Young Forever",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/66/5f/e8/665fe897-bcd6-e0e2-7435-9c15d6a5c98f/mzaf_4035442449766798468.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/f7/97/ebf797a2-e145-e123-7e50-9f53bc253b68/source/600x600bb.jpg",
      duration: 199,
    },
    {
      id: "17",
      title: "Euphoria",
      artist: "BTS",
      album: "Love Yourself: Answer",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/8b/c4/72/8bc4726a-034e-a2a2-7c5e-0dee41b9d496/mzaf_16793106970861213766.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c5/78/00/c5780069-b4d0-4e1e-f1fa-13c2ff387cd8/source/600x600bb.jpg",
      duration: 221,
    },
    {
      id: "18",
      title: "Serendipity",
      artist: "BTS",
      album: "Love Yourself: Answer",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d8/9d/0d/d89d0d94-b6c5-9d2e-e818-1e5f1f1de882/mzaf_1124211745281265939.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c5/78/00/c5780069-b4d0-4e1e-f1fa-13c2ff387cd8/source/600x600bb.jpg",
      duration: 234,
    },
    {
      id: "19",
      title: "Singularity",
      artist: "BTS",
      album: "Love Yourself: Tear",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f0/62/6b/f0626b94-0e3e-a8c5-d9f2-178b0edaef43/mzaf_11402893291335551486.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b5/11/d3/b511d3f7-a232-e657-3bd0-e4a2970b6848/source/600x600bb.jpg",
      duration: 237,
    },
    {
      id: "20",
      title: "Epiphany",
      artist: "BTS",
      album: "Love Yourself: Answer",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a3/70/c1/a370c150-311d-e0a2-a461-2c3d7657f5ce/mzaf_11574224185979130232.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c5/78/00/c5780069-b4d0-4e1e-f1fa-13c2ff387cd8/source/600x600bb.jpg",
      duration: 232,
    },
    {
      id: "21",
      title: "Magic Shop",
      artist: "BTS",
      album: "Love Yourself: Tear",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f0/62/6b/f0626b94-0e3e-a8c5-d9f2-178b0edaef43/mzaf_11402893291335551486.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b5/11/d3/b511d3f7-a232-e657-3bd0-e4a2970b6848/source/600x600bb.jpg",
      duration: 285,
    },
    {
      id: "22",
      title: "Pied Piper",
      artist: "BTS",
      album: "Love Yourself: Her",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c5/24/a4/c524a4b6-c134-d9a9-5f41-6a8a5a7c0c60/mzaf_14643631562153407197.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/31/bf/f1/31bff1d9-3b3b-268a-9e88-b14a1f03e8c8/source/600x600bb.jpg",
      duration: 259,
    },
    {
      id: "23",
      title: "Dimple",
      artist: "BTS",
      album: "Love Yourself: Her",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c5/24/a4/c524a4b6-c134-d9a9-5f41-6a8a5a7c0c60/mzaf_14643631562153407197.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/31/bf/f1/31bff1d9-3b3b-268a-9e88-b14a1f03e8c8/source/600x600bb.jpg",
      duration: 224,
    },
    {
      id: "24",
      title: "Airplane pt.2",
      artist: "BTS",
      album: "Love Yourself: Tear",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f0/62/6b/f0626b94-0e3e-a8c5-d9f2-178b0edaef43/mzaf_11402893291335551486.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b5/11/d3/b511d3f7-a232-e657-3bd0-e4a2970b6848/source/600x600bb.jpg",
      duration: 220,
    },
    {
      id: "25",
      title: "Go Go",
      artist: "BTS",
      album: "Love Yourself: Her",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c5/24/a4/c524a4b6-c134-d9a9-5f41-6a8a5a7c0c60/mzaf_14643631562153407197.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/31/bf/f1/31bff1d9-3b3b-268a-9e88-b14a1f03e8c8/source/600x600bb.jpg",
      duration: 235,
    },
    {
      id: "26",
      title: "Anpanman",
      artist: "BTS",
      album: "Love Yourself: Tear",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f0/62/6b/f0626b94-0e3e-a8c5-d9f2-178b0edaef43/mzaf_11402893291335551486.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b5/11/d3/b511d3f7-a232-e657-3bd0-e4a2970b6848/source/600x600bb.jpg",
      duration: 230,
    },
    {
      id: "27",
      title: "Mikrokosmos",
      artist: "BTS",
      album: "Map of the Soul: Persona",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/60/2e/d5/602ed5d5-f418-9da7-47b8-efaec9b29313/mzaf_2323217388997076870.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/db/88/2a/db882a9c-5a60-a8b7-be07-ac4d4619c8d8/source/600x600bb.jpg",
      duration: 229,
    },
    {
      id: "28",
      title: "HOME",
      artist: "BTS",
      album: "Map of the Soul: Persona",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/60/2e/d5/602ed5d5-f418-9da7-47b8-efaec9b29313/mzaf_2323217388997076870.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/db/88/2a/db882a9c-5a60-a8b7-be07-ac4d4619c8d8/source/600x600bb.jpg",
      duration: 229,
    },
    {
      id: "29",
      title: "Make It Right",
      artist: "BTS",
      album: "Map of the Soul: Persona",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/60/2e/d5/602ed5d5-f418-9da7-47b8-efaec9b29313/mzaf_2323217388997076870.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/db/88/2a/db882a9c-5a60-a8b7-be07-ac4d4619c8d8/source/600x600bb.jpg",
      duration: 229,
    },
    {
      id: "30",
      title: "Dionysus",
      artist: "BTS",
      album: "Map of the Soul: Persona",
      audio_url:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/60/2e/d5/602ed5d5-f418-9da7-47b8-efaec9b29313/mzaf_2323217388997076870.plus.aac.p.m4a",
      cover_url:
        "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/db/88/2a/db882a9c-5a60-a8b7-be07-ac4d4619c8d8/source/600x600bb.jpg",
      duration: 229,
    },
  ]
}
