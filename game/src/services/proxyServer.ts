// This is a simple proxy server implementation that can be used in development
// to bypass CORS issues when fetching from external APIs

export const fetchWithProxy = async (url: string) => {
    // List of public CORS proxies to try
    const proxies = [
      "https://corsproxy.io/?",
      "https://api.allorigins.win/raw?url=",
      "https://cors-anywhere.herokuapp.com/",
    ]
  
    // Try each proxy in order
    for (const proxy of proxies) {
      try {
        const response = await fetch(`${proxy}${encodeURIComponent(url)}`)
        if (response.ok) {
          return response
        }
      } catch (error) {
        console.warn(`Proxy ${proxy} failed, trying next...`)
      }
    }
  
    // If all proxies fail, throw an error
    throw new Error("All proxies failed to fetch data")
  }
  