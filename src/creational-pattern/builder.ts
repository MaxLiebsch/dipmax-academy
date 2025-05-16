/*

🏗️ Creational Pattern 3: Builder
✅ Purpose:
Separate the construction of a complex object from its representation, so that the same construction process can create different representations.

🧩 Task: User Profile Builder
✅ Scenario:
You’re creating user profiles in an app. A UserProfile may include:

Required: name, email

Optional: age, bio, profilePictureUrl, location, preferences

You want to allow users to chain configuration methods, like:

const user = new UserProfileBuilder("Max", "max@example.com")
  .setAge(34)
  .setBio("Software engineer.")
  .setLocation("Berlin")
  .build();
✅ Your Goals:
Create a class UserProfile that is only constructable via the builder.

Create a UserProfileBuilder class that:

Has chainable methods like .setBio(), .setAge(), etc.

Implements a .build() method that returns a UserProfile.

Ensure that the builder enforces required fields (name, email) and lets the rest be optional.

🧪 Bonus:
Make UserProfile immutable (readonly props).

Add input validation (e.g., no negative age).

Use private constructor to enforce builder-only creation.

*/

class UserProfile {
  name: string = "";
  email: string = "";
  age?: number;
  bio?: string;
  location?: string;
  profilePictureUrl?: string;
  preferences?: string[];
  private constructor() {}
}

class UserProfileBuilder {
  private userProfile: UserProfile;
  constructor(public readonly name: string, public readonly email: string) {
    this.userProfile = Object.create(UserProfile.prototype)
    this.userProfile.name = name;
    this.userProfile.email = email;
  }

  public setBio(bio: string) {
    this.userProfile.bio = bio;
    return this;
  }

  public setAge(age: number) {
    if (age < 0) throw new Error("Age must be positive");
    this.userProfile.age = age;
    return this;
  }

  public setLocation(location: string) {
    this.userProfile.location = location;
    return this;
  }

  public setProfilePictureUrl(url: string) {
    new URL(url); // throws if not url
    this.userProfile.profilePictureUrl = url;
    return this;
  }

  public setPreferences(preferences: string[]) {
    this.userProfile.preferences = preferences;
    return this;
  }

  public build() {
      return this.userProfile
  }
}


const user = new UserProfileBuilder("Max", "max@example.com")
  .setAge(34)
  .setBio("Software engineer.")
  .setLocation("Berlin")
  .build();

console.log(user);



