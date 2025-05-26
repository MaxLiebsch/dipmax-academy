/* 
🛡️ Proxy Pattern
✅ Purpose
Provide a placeholder or surrogate for another object to:
Control access (security)
Add logging / caching

Delay expensive operations (lazy loading)

🧩 Real-World Scenario: API Caching Proxy
Imagine you have a WeatherAPI that fetches weather data. But it’s expensive (API calls), so you want to cache requests.

✅ Your Task
Create an interface WeatherService:

interface WeatherService {
  getWeather(city: string): Promise<string>;
}
Implement a real WeatherAPI class that simulates API call with delay:

class RealWeatherAPI implements WeatherService {
  async getWeather(city: string): Promise<string> {
    console.log("Fetching weather from real API...");
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Sunny in ${city}`), 1000);
    });
  }
}
Create a Proxy class that:

Wraps a WeatherService

Caches results in a Map

Logs when it serves from cache vs. real API

✅ Example usage:

const api = new WeatherAPIProxy(new RealWeatherAPI());

console.log(await api.getWeather("Berlin"));
console.log(await api.getWeather("Berlin")); // From cache!

*/

interface WeatherService {
  getWeather(city: string): Promise<string>;
}

class RealWeatherAPI implements WeatherService {
  getWeather(city: string): Promise<string> {
    console.log("Fetching weather from readl API...");
    return new Promise((res) =>
      setTimeout(() => res(`Sunny in ${city}`), 1000)
    );
  }
}

class WeatherApiProxy implements WeatherService {
  private requests = new Map<string, string>();
  constructor(private readonly weatherApi: WeatherService) {}
  async getWeather(city: string): Promise<string> {
    if (this.requests.has(city)) {
      return this.requests.get(city)!
    }else{
       const weather = await this.weatherApi.getWeather(city);
       this.requests.set(city, weather);
       return weather;

    }
  }
}

const api = new WeatherApiProxy(new RealWeatherAPI());

console.time('first')
console.log(await api.getWeather("Berlin"));
console.timeEnd('first')
console.time('second')
console.log(await api.getWeather("Berlin")); // From cache!
console.timeEnd('second')