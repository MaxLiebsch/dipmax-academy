/*

🔄 Behavioral Pattern 9: Iterator
✅ Purpose:
Provide a standard way to access elements of a collection sequentially 
without exposing its underlying representation (e.g., arrays, trees, custom lists).

This pattern is so foundational that it’s basically built 
into JavaScript/TypeScript (for..of, .forEach()) — but it’s still important 
to understand how to design custom iterators.

🧩 Real-World Scenario: Custom Playlist Iterator
Imagine you’re building a music app with a Playlist class:

It has songs (Song objects)
You want to play songs in a custom order (e.g., normal, reversed, shuffled)

You don’t want the Playlist user to know how the playlist stores songs

✅ Your Task:
Create an Iterator<T> interface:

interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}
Create a Song class (just title for simplicity).

Create a Playlist class that stores Song objects in an array.

Implement:

A forward iterator: normal order

A reverse iterator: reversed order

✅ Example usage:
const playlist = new Playlist();
playlist.addSong(new Song("Song 1"));
playlist.addSong(new Song("Song 2"));
playlist.addSong(new Song("Song 3"));

const iterator = playlist.createIterator();
while (iterator.hasNext()) {
  console.log(iterator.next().title);
}
*/

interface Iterator<T> {
  hasNext(): boolean;
  reset(): void;
  next(): T;
}

class Song {
  constructor(public readonly title: string) {}
}

class Playlist {
  private songs: Song[] = [];
  addSong(song: Song) {
    this.songs.push(song);
  }
  createIterator(type?: "forward" | "reverse") {
    switch (type) {
      case "forward":
        return new ForwardIterator(this.songs);
      case "reverse":
        return new ReverseIterator(this.songs);
      default:
        return new ForwardIterator(this.songs);
    }
  }
}

class ForwardIterator implements Iterator<Song> {
  index: number = 0;
  constructor(private readonly songs: Song[]) {}
  reset(): void {
    this.index = 0;
  }
  hasNext(): boolean {
    if (this.index < this.songs.length) return true;
    else return false;
  }
  next(): Song {
    const nextSong = this.songs[this.index]
    this.index++
    return nextSong
  }
}

class ReverseIterator implements Iterator<Song> {
  private index: number = 0;
  constructor(private readonly songs: Song[]) {
      this.index = songs.length - 1
  }
  reset(): void {
     this.index  = this.songs.length -1;
  }
  hasNext(): boolean {
    if (this.index >= 0) return true;
    else return false;
  }
  next(): Song {
    const nextSong = this.songs[this.index]
    this.index--
    return nextSong
  }
}

const playlist = new Playlist();

playlist.addSong(new Song('Song 1'))
playlist.addSong(new Song('Song 2'))
playlist.addSong(new Song("Song 3"))
playlist.addSong(new Song('Song 4'))

const iterator = playlist.createIterator()

while(iterator.hasNext()){
  console.log(iterator.next().title)
}

const reverseIterator = playlist.createIterator('reverse');

while(reverseIterator.hasNext()){
  console.log(reverseIterator.next().title)
}